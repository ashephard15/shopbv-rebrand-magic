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
    const body = await req.json();
    
    // Input validation
    if (!body.items || !Array.isArray(body.items)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input: items must be an array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid input: items array cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.items.length > 50) {
      return new Response(
        JSON.stringify({ error: 'Invalid input: maximum 50 items allowed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate each item
    for (const item of body.items) {
      if (!item.productId || typeof item.productId !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Invalid input: productId must be a string' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 1000) {
        return new Response(
          JSON.stringify({ error: 'Invalid input: quantity must be a number between 1 and 1000' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (item.options && typeof item.options !== 'object') {
        return new Response(
          JSON.stringify({ error: 'Invalid input: options must be an object' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const { items } = body;
    console.log('Creating Wix checkout for items:', items);

    // Get the origin URL from the request header - use the custom domain
    const origin = req.headers.get('origin') || 'https://goshopbv.com';
    const returnUrl = `${origin}/products`;
    
    console.log('Setting return URL to:', returnUrl);

    // Step 1: Create checkout with line items
    const checkoutResponse = await fetch(
      `https://www.wixapis.com/ecom/v1/checkouts`,
      {
        method: 'POST',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
        },
        body: JSON.stringify({
          lineItems: items.map((item: any) => ({
            catalogReference: {
              catalogItemId: item.productId,
              appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
              options: item.options || {}
            },
            quantity: item.quantity
          })),
          channelType: 'WEB',
          ecomSettings: {
            returnUrl: returnUrl
          }
        })
      }
    );

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error('Wix checkout API error:', checkoutResponse.status, errorText);
      throw new Error(`Wix checkout API error: ${checkoutResponse.status} - ${errorText}`);
    }

    const checkoutData = await checkoutResponse.json();
    const checkoutId = checkoutData.checkout.id;
    console.log('Checkout created with ID:', checkoutId);

    // Step 2: Get the checkout URL from Wix API
    const checkoutUrlResponse = await fetch(
      `https://www.wixapis.com/ecom/v1/checkouts/${checkoutId}/checkout-url`,
      {
        method: 'GET',
        headers: {
          'Authorization': WIX_API_KEY!,
          'Content-Type': 'application/json',
          'wix-site-id': WIX_SITE_ID!,
        }
      }
    );

    if (!checkoutUrlResponse.ok) {
      const errorText = await checkoutUrlResponse.text();
      console.error('Wix get checkout URL error:', checkoutUrlResponse.status, errorText);
      throw new Error(`Failed to get checkout URL: ${checkoutUrlResponse.status} - ${errorText}`);
    }

    const urlData = await checkoutUrlResponse.json();
    let checkoutUrl = urlData.checkoutUrl;
    
    if (!checkoutUrl) {
      console.error('No checkout URL in response:', urlData);
      throw new Error('Wix did not return a checkout URL');
    }
    
    console.log('Final checkout URL from Wix:', checkoutUrl);

    return new Response(JSON.stringify({ 
      checkout: {
        checkoutId,
        checkoutUrl
      }
    }), {
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
