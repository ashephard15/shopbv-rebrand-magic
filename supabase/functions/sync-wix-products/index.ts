import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const WIX_API_KEY = Deno.env.get('WIX_API_KEY');
const WIX_SITE_ID = Deno.env.get('WIX_SITE_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Wix product sync...');
    
    // Fetch products from Wix
    const wixResponse = await fetch(
      `https://www.wixapis.com/stores/v1/products/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
        },
        body: JSON.stringify({
          query: {
            paging: {
              limit: 100
            }
          }
        })
      }
    );

    if (!wixResponse.ok) {
      const errorText = await wixResponse.text();
      console.error('Wix API error:', wixResponse.status, errorText);
      throw new Error(`Failed to fetch products from Wix: ${wixResponse.status}`);
    }

    const wixData = await wixResponse.json();
    const wixProducts = wixData.products || [];
    console.log(`Fetched ${wixProducts.length} products from Wix`);

    if (wixProducts.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'No products found in Wix store',
          synced: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Transform and upsert products
    const productsToSync = wixProducts.map((wixProduct: any) => {
      const price = parseFloat(wixProduct.price?.price || wixProduct.priceData?.price || '0');
      const discountedPrice = wixProduct.price?.discountedPrice 
        ? parseFloat(wixProduct.price.discountedPrice)
        : null;
      
      const imageUrl = wixProduct.media?.items?.[0]?.image?.url 
        || wixProduct.media?.mainMedia?.image?.url
        || null;
      
      const imageAlt = wixProduct.media?.items?.[0]?.image?.altText 
        || wixProduct.name
        || null;

      return {
        wix_id: wixProduct.id,
        name: wixProduct.name || 'Unnamed Product',
        description: wixProduct.description || null,
        slug: wixProduct.slug || wixProduct.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: price,
        currency: wixProduct.price?.currency || 'USD',
        discounted_price: discountedPrice,
        image_url: imageUrl,
        image_alt: imageAlt,
        stock_quantity: wixProduct.stock?.quantity || null,
        in_stock: wixProduct.stock?.inStock !== false,
        category: wixProduct.productType || null,
        brand: wixProduct.brand || null,
      };
    });

    // Upsert products (insert or update based on wix_id)
    const { data, error } = await supabase
      .from('products')
      .upsert(productsToSync, { 
        onConflict: 'wix_id',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log(`Successfully synced ${data?.length || 0} products`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Successfully synced ${data?.length || 0} products from Wix`,
        synced: data?.length || 0,
        products: data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-wix-products function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: 'Failed to sync products from Wix'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
