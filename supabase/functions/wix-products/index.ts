import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const WIX_API_KEY = Deno.env.get('WIX_API_KEY');
const WIX_SITE_ID = Deno.env.get('WIX_SITE_ID');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching products from Wix...');
    
    // Wix Stores V3 API endpoint for products
    const response = await fetch(
      `https://www.wixapis.com/stores/v3/products/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
        },
        body: JSON.stringify({
          query: {
            filter: {},
            paging: {
              limit: 100
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Wix API error:', response.status, errorText);
      throw new Error(`Wix API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched products:', data.products?.length || 0);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in wix-products function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to fetch products from Wix'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
