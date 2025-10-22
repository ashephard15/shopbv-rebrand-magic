// CSV Parser utility for Shopify product exports
import Papa from 'papaparse';
import { Product } from "@/data/productsData";

export function parseShopifyCSV(csvText: string): Product[] {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const productsMap = new Map<string, Product>();

  parsed.data.forEach((row: any) => {
    const handle = row['Handle']?.trim();
    if (!handle) return;

    const title = row['Title']?.trim();
    const price = parseFloat(row['Variant Price']) || 0;
    const compareAtPrice = row['Variant Compare At Price'] 
      ? parseFloat(row['Variant Compare At Price']) 
      : undefined;
    
    // Clean up image URL - remove leading quotes and other artifacts
    let image = row['Image Src']?.trim() || '';
    image = image.replace(/^['"]|['"]$/g, ''); // Remove leading/trailing quotes
    image = image.split(',')[0]; // Take first part if comma-separated

    // If this is a main product row (has title and description)
    if (title) {
      const description = stripHTML(row['Body (HTML)']);
      const category = extractCategory(row['Product Category']);
      const tags = row['Tags'] 
        ? row['Tags'].split(',').map((t: string) => t.trim()).filter(Boolean) 
        : [];

      productsMap.set(handle, {
        handle,
        title,
        description,
        vendor: row['Vendor'] || '',
        category,
        type: row['Type'] || '',
        price,
        compareAtPrice,
        image,
        tags,
        published: row['Published'] === 'true' || row['Status'] === 'active',
        variants: []
      });
    } else if (productsMap.has(handle)) {
      // This is a variant row
      const product = productsMap.get(handle)!;
      const variantTitle = row['Option1 Value']?.trim();

      if (variantTitle) {
        product.variants = product.variants || [];
        
        let variantImage = row['Variant Image']?.trim() || '';
        variantImage = variantImage.replace(/^['"]|['"]$/g, '');
        variantImage = variantImage.split(',')[0];
        
        product.variants.push({
          title: variantTitle,
          price,
          compareAtPrice,
          image: variantImage || image
        });
      }
    }
  });

  return Array.from(productsMap.values()).filter(p => p.published);
}

function stripHTML(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, ' ');
  
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

function extractCategory(fullCategory: string): string {
  if (!fullCategory) return 'Other';

  // Extract the last meaningful part
  const parts = fullCategory.split('>').map(p => p.trim());

  // Check for specific category keywords
  const categoryStr = fullCategory.toLowerCase();
  
  if (categoryStr.includes('skin care') || categoryStr.includes('lotions') || categoryStr.includes('moisturizers')) {
    return 'Skin Care';
  }
  if (categoryStr.includes('bath & body') || categoryStr.includes('body wash')) {
    return 'Body Care';
  }
  if (categoryStr.includes('hair care') || categoryStr.includes('hair styling')) {
    return 'Hair Care';
  }
  if (categoryStr.includes('fragrance') || categoryStr.includes('perfumes') || categoryStr.includes('body mist')) {
    return 'Fragrance';
  }
  if (categoryStr.includes('lip makeup') || categoryStr.includes('lipstick') || categoryStr.includes('lip gloss')) {
    return 'Lip Makeup';
  }
  if (categoryStr.includes('face makeup') || categoryStr.includes('blush') || categoryStr.includes('bronzer')) {
    return 'Face Makeup';
  }
  if (categoryStr.includes('eye makeup') || categoryStr.includes('eyeshadow') || categoryStr.includes('mascara')) {
    return 'Eye Makeup';
  }
  if (categoryStr.includes('tools') || categoryStr.includes('brushes') || categoryStr.includes('sponge')) {
    return 'Tools & Brushes';
  }

  // Fallback to extracting from path
  if (parts.length >= 5) {
    return parts[parts.length - 2] || parts[parts.length - 1];
  }
  
  if (parts.length >= 2) {
    return parts[parts.length - 1];
  }

  return parts[0] || 'Other';
}
