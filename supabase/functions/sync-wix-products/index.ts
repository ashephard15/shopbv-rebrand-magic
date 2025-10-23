import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const WIX_API_KEY = Deno.env.get('WIX_API_KEY');
const WIX_ACCOUNT_ID = Deno.env.get('WIX_ACCOUNT_ID');
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
    console.log('Starting database to Wix product sync...');
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch products from database that don't have a wix_id yet
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('*')
      .is('wix_id', null);

    if (dbError) throw dbError;

    if (!dbProducts || dbProducts.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'No products to sync. All products already have Wix IDs.',
          synced: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${dbProducts.length} products to sync to Wix`);

    const syncedProducts = [];
    const errors = [];

    // Create each product in Wix
    for (const product of dbProducts) {
      try {
        const wixProduct = {
          name: product.name,
          description: product.description || undefined,
          productType: 'physical', // Wix requires: physical or digital
          priceData: {
            price: product.price.toString(),
            currency: product.currency,
            discountedPrice: product.discounted_price?.toString() || undefined
          },
          stock: {
            trackInventory: true,
            inStock: product.in_stock,
            quantity: product.stock_quantity || 0
          },
          visible: true,
          // Store our category in additionalInfoSections or customTextFields
          brand: product.brand || undefined
        };

        console.log(`Creating product in Wix: ${product.name}`);

        const wixResponse = await fetch(
          `https://www.wixapis.com/stores/v1/products`,
          {
            method: 'POST',
            headers: {
              'Authorization': WIX_API_KEY!,
              'Content-Type': 'application/json',
              'wix-account-id': WIX_ACCOUNT_ID!,
            },
            body: JSON.stringify({ product: wixProduct })
          }
        );

        if (!wixResponse.ok) {
          const errorText = await wixResponse.text();
          console.error(`Failed to create product ${product.name}:`, errorText);
          errors.push({ product: product.name, error: errorText });
          continue;
        }

        const createdProduct = await wixResponse.json();
        const wixId = createdProduct.product?.id;

        if (wixId) {
          // Update database with Wix ID
          const { error: updateError } = await supabase
            .from('products')
            .update({ wix_id: wixId })
            .eq('id', product.id);

          if (updateError) {
            console.error(`Failed to update product ${product.name} with Wix ID:`, updateError);
            errors.push({ product: product.name, error: 'Failed to save Wix ID' });
          } else {
            console.log(`Successfully created and linked product: ${product.name}`);
            syncedProducts.push({ name: product.name, wix_id: wixId });
          }
        }

      } catch (error) {
        console.error(`Error syncing product ${product.name}:`, error);
        errors.push({ 
          product: product.name, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Synced ${syncedProducts.length} products to Wix`,
        synced: syncedProducts.length,
        products: syncedProducts,
        errors: errors.length > 0 ? errors : undefined
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
        details: 'Failed to sync products to Wix'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
