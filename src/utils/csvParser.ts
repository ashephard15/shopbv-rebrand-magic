// CSV Parser utility for Shopify product exports
import { Product, ProductVariant } from "@/data/productsData";

export function parseShopifyCSV(csvText: string): Product[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  const productsMap = new Map<string, Product>();
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    const handle = row['Handle'];
    if (!handle) continue;
    
    const title = row['Title'];
    const price = parseFloat(row['Variant Price']) || 0;
    const compareAtPrice = row['Variant Compare At Price'] ? parseFloat(row['Variant Compare At Price']) : undefined;
    const image = row['Image Src'];
    
    // If this is a main product row (has title and description)
    if (title && title.trim()) {
      const description = stripHTML(row['Body (HTML)']);
      const category = extractCategory(row['Product Category']);
      const tags = row['Tags'] ? row['Tags'].split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      
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
        published: row['Published'] === 'true',
        variants: []
      });
    } else if (productsMap.has(handle)) {
      // This is a variant row
      const product = productsMap.get(handle)!;
      const variantTitle = row['Option1 Value'];
      
      if (variantTitle && variantTitle.trim()) {
        product.variants = product.variants || [];
        product.variants.push({
          title: variantTitle,
          price,
          compareAtPrice,
          image: row['Variant Image'] || image
        });
      }
    }
  }
  
  return Array.from(productsMap.values());
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
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
  // e.g., "Health & Beauty > Personal Care > Cosmetics > Makeup > Lip Makeup > Lipsticks" -> "Lip Makeup"
  const parts = fullCategory.split('>').map(p => p.trim());
  
  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1];
    const secondLastPart = parts[parts.length - 2];
    
    // If last part is too specific, use second to last
    if (lastPart.length > 20 || lastPart.includes('&')) {
      return secondLastPart;
    }
    return lastPart;
  }
  
  return parts[0] || 'Other';
}
