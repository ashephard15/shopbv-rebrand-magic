import { supabase } from "@/integrations/supabase/client";

export interface WixProduct {
  id: string;
  name: string;
  description?: string;
  slug: string;
  price: {
    price: string;
    currency: string;
    discountedPrice?: string;
  };
  media?: {
    items?: Array<{
      image?: {
        url: string;
        altText?: string;
      };
    }>;
  };
  productOptions?: Array<{
    name: string;
    choices: Array<{
      value: string;
      description?: string;
    }>;
  }>;
  stock?: {
    inStock: boolean;
    quantity?: number;
  };
}

export interface WixCartItem {
  productId: string;
  quantity: number;
  options?: Record<string, string>;
}

export async function fetchWixProducts(): Promise<WixProduct[]> {
  try {
    const { data, error } = await supabase.functions.invoke('wix-products', {
      method: 'POST'
    });

    if (error) throw error;

    return data.products || [];
  } catch (error) {
    console.error('Error fetching Wix products:', error);
    throw error;
  }
}

export async function createWixCheckout(items: WixCartItem[]): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('wix-checkout', {
      body: { items }
    });

    if (error) throw error;

    return data.checkout?.checkoutUrl;
  } catch (error) {
    console.error('Error creating Wix checkout:', error);
    throw error;
  }
}
