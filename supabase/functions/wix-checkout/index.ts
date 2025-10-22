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
    const { items } = await req.json();
    console.log('Creating Wix checkout for items:', items);

    // Create checkout in Wix
    const response = await fetch(
      `https://www.wixapis.com/stores/v2/checkouts`,
      {
        method: 'POST',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
        },
        body: JSON.stringify({
          lineItems: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            options: item.options || {}
          })),
          channelType: 'WEB'
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Wix checkout API error:', response.status, errorText);
      throw new Error(`Wix checkout API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Checkout created successfully:', data.checkout?.id);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in wix-checkout function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to create Wix checkout'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
