import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWixCheckout, WixProduct } from '@/lib/wix';
import { toast } from 'sonner';

export interface CartItem {
  product: WixProduct;
  productId: string;
  wixId?: string;
  variantTitle?: string;
  price: {
    amount: string;
    currency: string;
  };
  quantity: number;
  selectedOptions?: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        // Validate that item has wixId before adding
        if (!item.wixId) {
          console.error('Attempted to add item without wixId:', item);
          throw new Error('Product is not available for checkout');
        }
        
        const { items } = get();
        const existingItem = items.find(i => i.productId === item.productId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const item = items.find(i => i.productId === productId);
        
        // Check stock quantity if available
        if (item?.product.stock?.quantity) {
          if (quantity > item.product.stock.quantity) {
            return; // Don't allow quantity greater than stock
          }
        }
        
        set({
          items: items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl, clearCart } = get();
        if (items.length === 0) return;

        // Check if all items have wix_id and clean up old items
        const itemsWithoutWixId = items.filter(item => !item.wixId);
        if (itemsWithoutWixId.length > 0) {
          console.error('Found items without wix_id (likely old cart data):', itemsWithoutWixId);
          // Clear old cart data
          clearCart();
          throw new Error('Your cart contained outdated items. Please add products again.');
        }

        console.log('Creating checkout with items:', items);
        setLoading(true);
        try {
          const wixItems = items.map(item => ({
            productId: item.wixId!,
            quantity: item.quantity,
            options: item.selectedOptions
          }));
          
          console.log('Calling createWixCheckout with:', wixItems);
          const checkoutUrl = await createWixCheckout(wixItems);
          console.log('Received checkout URL:', checkoutUrl);
          setCheckoutUrl(checkoutUrl);
          
          // Clear cart after successful checkout creation
          clearCart();
          
          toast.success('Redirecting to checkout...', {
            description: 'Your cart has been cleared'
          });
        } catch (error) {
          console.error('Failed to create Wix checkout:', error);
          toast.error('Checkout failed', {
            description: error instanceof Error ? error.message : 'Please try again'
          });
          throw error;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'wix-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Clean up any cart items without wixId after loading from storage
        if (state && state.items) {
          const validItems = state.items.filter(item => item.wixId);
          const removedCount = state.items.length - validItems.length;
          
          if (removedCount > 0) {
            console.log(`Cleaned up ${removedCount} invalid cart items without wixId`);
            state.items = validItems;
            
            // Show toast notification to user
            setTimeout(() => {
              toast.warning('Cart Updated', {
                description: `${removedCount} outdated item(s) were removed from your cart. Please re-add your products.`,
                duration: 6000,
              });
            }, 500);
          }
        }
      }
    }
  )
);
