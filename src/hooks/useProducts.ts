import { useState, useEffect } from 'react';
import { fetchWixProducts, WixProduct } from '@/lib/wix';

export function useProducts() {
  const [products, setProducts] = useState<WixProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const wixProducts = await fetchWixProducts();
        setProducts(wixProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products from Wix');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
}

export function getProductsByCategory(products: WixProduct[], category: string): WixProduct[] {
  if (category === 'all') return products;
  return products;
}

export function getUniqueCategories(products: WixProduct[]): string[] {
  const categories = new Set<string>();
  return ['all', ...Array.from(categories).sort()];
}
