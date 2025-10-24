import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const WIX_API_KEY = Deno.env.get('WIX_API_KEY');
const WIX_SITE_ID = Deno.env.get('WIX_SITE_ID');
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
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Starting Wix to database product sync...');
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Verify user is authenticated and has admin role
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user has admin role
    const { data: roles, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (roleError || !roles) {
      console.error('Not an admin:', user.id);
      return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Admin user verified, fetching products from Wix...');

    // Fetch all products from Wix
    const wixResponse = await fetch(
      'https://www.wixapis.com/stores/v1/products/query',
      {
        method: 'POST',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
          'wix-account-id': WIX_ACCOUNT_ID!,
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
      console.error('Failed to fetch products from Wix:', errorText);
      throw new Error(`Wix API error: ${errorText}`);
    }

    const wixData = await wixResponse.json();
    const wixProducts = wixData.products || [];

    console.log(`Found ${wixProducts.length} products in Wix`);

    if (wixProducts.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'No products found in Wix to sync',
          updated: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const updatedProducts = [];
    const errors = [];

    // Update each product in our database with Wix data
    for (const wixProduct of wixProducts) {
      try {
        const productName = wixProduct.name;
        const wixId = wixProduct.id;
        
        // Get the main product image from Wix
        const imageUrl = wixProduct.media?.mainMedia?.image?.url || 
                        wixProduct.media?.items?.[0]?.image?.url;

        console.log(`Processing: ${productName} (ID: ${wixId})`);

        // Try to match by name first (case-insensitive)
        const { data: existingProducts, error: searchError } = await supabase
          .from('products')
          .select('*')
          .ilike('name', productName)
          .limit(1);

        if (searchError) {
          console.error(`Error searching for product ${productName}:`, searchError);
          errors.push({ product: productName, error: 'Database search failed' });
          continue;
        }

        if (!existingProducts || existingProducts.length === 0) {
          console.log(`Product not found in database: ${productName}, skipping`);
          continue;
        }

        const dbProduct = existingProducts[0];

        // Prepare update data
        const updateData: any = {
          wix_id: wixId,
        };

        // Only update image_url if Wix has an image
        if (imageUrl) {
          updateData.image_url = imageUrl;
          console.log(`Updating image URL for ${productName}: ${imageUrl}`);
        }

        // Update the product
        const { error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', dbProduct.id);

        if (updateError) {
          console.error(`Failed to update product ${productName}:`, updateError);
          errors.push({ product: productName, error: 'Database update failed' });
        } else {
          console.log(`Successfully updated: ${productName}`);
          updatedProducts.push({ 
            name: productName, 
            wix_id: wixId,
            image_updated: !!imageUrl 
          });
        }

      } catch (error) {
        console.error(`Error processing product ${wixProduct.name}:`, error);
        errors.push({ 
          product: wixProduct.name, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Updated ${updatedProducts.length} products from Wix`,
        updated: updatedProducts.length,
        products: updatedProducts,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-from-wix function:', error);
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
