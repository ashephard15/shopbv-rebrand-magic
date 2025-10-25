import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select('product_id')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error loading wishlist:', error);
      setLoading(false);
      return;
    }

    setWishlistItems(data.map(item => item.product_id));
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadWishlist();
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToWishlist = async (productId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.error('Please sign in to add items to your wishlist');
      return false;
    }

    const { error } = await supabase
      .from('wishlist')
      .insert({ user_id: session.user.id, product_id: productId });

    if (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
      return false;
    }

    setWishlistItems([...wishlistItems, productId]);
    toast.success('Added to wishlist');
    return true;
  };

  const removeFromWishlist = async (productId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return false;

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', session.user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
      return false;
    }

    setWishlistItems(wishlistItems.filter(id => id !== productId));
    toast.success('Removed from wishlist');
    return true;
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
}
