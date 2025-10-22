import { useState, useEffect } from 'react';
import { Product } from '@/data/productsData';
import { parseShopifyCSV } from '@/utils/csvParser';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Import the CSV file
        const response = await fetch('/src/data/products.csv');
        const csvText = await response.text();
        
        // Parse the CSV
        const parsedProducts = parseShopifyCSV(csvText);
        
        setProducts(parsedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => 
    p.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach(p => {
    if (p.category) categories.add(p.category);
  });
  return ['all', ...Array.from(categories).sort()];
}
