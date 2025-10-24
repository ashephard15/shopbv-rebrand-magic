import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  wix_id?: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  currency: string;
  compare_at_price?: number;
  image_url?: string;
  image_alt?: string;
  stock_quantity?: number;
  in_stock: boolean;
  category?: string;
  brand?: string;
  rating?: number;
  rating_source?: string;
  total_reviews?: number;
  created_at?: string;
  updated_at?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setProducts(data || []);
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
  return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
}

export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach(p => {
    if (p.category) categories.add(p.category);
  });
  return ['all', ...Array.from(categories).sort()];
}
