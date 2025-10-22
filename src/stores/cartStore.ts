import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWixCheckout, WixProduct } from '@/lib/wix';

export interface CartItem {
  product: WixProduct;
  productId: string;
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
        
        set({
          items: get().items.map(item =>
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
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const wixItems = items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            options: item.selectedOptions
          }));
          
          const checkoutUrl = await createWixCheckout(wixItems);
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          console.error('Failed to create Wix checkout:', error);
          throw error;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'wix-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
