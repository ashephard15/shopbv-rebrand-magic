import { useState, useEffect } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

export function useProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchProducts(50);
        setProducts(shopifyProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products from Shopify');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
}

export function getProductsByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
  if (category === 'all') return products;
  // For Shopify products, you might need to add product type or tags to filter
  return products;
}

export function getUniqueCategories(products: ShopifyProduct[]): string[] {
  // Extract unique categories from Shopify product types
  const categories = new Set<string>();
  return ['all', ...Array.from(categories).sort()];
}
