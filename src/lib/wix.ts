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
    console.log('Invoking wix-checkout edge function with items:', items);
    const { data, error } = await supabase.functions.invoke('wix-checkout', {
      body: { items }
    });

    console.log('Edge function response:', { data, error });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to create checkout');
    }

    if (!data || !data.checkout || !data.checkout.checkoutUrl) {
      console.error('Invalid response from edge function:', data);
      throw new Error('Invalid checkout response. Please ensure Wix integration is configured properly.');
    }

    return data.checkout.checkoutUrl;
  } catch (error) {
    console.error('Error creating Wix checkout:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create checkout. Please try again or contact support.');
  }
}
