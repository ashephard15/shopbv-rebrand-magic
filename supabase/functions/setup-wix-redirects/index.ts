import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const WIX_API_KEY = Deno.env.get('WIX_API_KEY');
const WIX_SITE_ID = Deno.env.get('WIX_SITE_ID');
const WIX_ACCOUNT_ID = Deno.env.get('WIX_ACCOUNT_ID');
const FRONTEND_URL = Deno.env.get('VITE_PUBLIC_URL') || 'https://your-lovable-site.lovable.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  slug: string;
  wix_id: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Setting up Wix product page redirects to Lovable frontend...');

    if (!WIX_API_KEY || !WIX_SITE_ID || !WIX_ACCOUNT_ID) {
      throw new Error('Missing required Wix credentials in environment variables');
    }

    const { products } = await req.json() as { products: Product[] };

    if (!products || products.length === 0) {
      throw new Error('No products provided');
    }

    // Create redirects for each product
    const redirectResults = [];
    
    for (const product of products) {
      // Wix product page URL format: /product-page/{product-slug}
      const wixProductPath = `/product-page/${product.slug}`;
      const lovableProductUrl = `${FRONTEND_URL}/product/${product.slug}`;

      // Create redirect using Wix Redirects API
      const redirectPayload = {
        fromUrl: wixProductPath,
        toUrl: lovableProductUrl,
        permanent: true, // 301 redirect
        forwardQueryParams: false
      };

      console.log(`Creating redirect: ${wixProductPath} -> ${lovableProductUrl}`);

      // Note: This uses Wix's redirect API endpoint
      const response = await fetch(
        `https://www.wixapis.com/v1/sites/${WIX_SITE_ID}/redirects`,
        {
          method: 'POST',
          headers: {
            'Authorization': WIX_API_KEY,
            'Content-Type': 'application/json',
            'wix-site-id': WIX_SITE_ID,
            'wix-account-id': WIX_ACCOUNT_ID,
          },
          body: JSON.stringify(redirectPayload),
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        console.error(`Failed to create redirect for ${product.slug}:`, result);
        redirectResults.push({
          product: product.slug,
          success: false,
          error: result.message || 'Unknown error'
        });
      } else {
        console.log(`Successfully created redirect for ${product.slug}`);
        redirectResults.push({
          product: product.slug,
          success: true,
          redirectId: result.id
        });
      }
    }

    const successCount = redirectResults.filter(r => r.success).length;
    const failureCount = redirectResults.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Created ${successCount} redirects, ${failureCount} failed`,
        results: redirectResults,
        instructions: {
          manualSetup: 'If API setup fails, you can manually set up redirects in Wix:',
          steps: [
            '1. Go to your Wix Dashboard',
            '2. Navigate to Settings > SEO Tools > URL Redirect Manager',
            '3. Click "+ New Redirect"',
            '4. Set Old URL: /product-page/* (wildcard for all products)',
            `5. Set New URL: ${FRONTEND_URL}/product/$1`,
            '6. Choose "301 Permanent" redirect type',
            '7. Click Save'
          ]
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error setting up Wix redirects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        instructions: {
          manualSetup: 'Please set up redirects manually in Wix:',
          steps: [
            '1. Go to your Wix Dashboard: https://manage.wix.com',
            '2. Select your site',
            '3. Go to Settings > SEO Tools > URL Redirect Manager',
            '4. Click "+ New Redirect"',
            '5. For each product, set:',
            '   - Old URL: /product-page/{product-slug}',
            `   - New URL: ${FRONTEND_URL}/product/{product-slug}`,
            '   - Type: 301 Permanent',
            '6. OR use a wildcard redirect:',
            '   - Old URL: /product-page/*',
            `   - New URL: ${FRONTEND_URL}/product/*`,
            '   - Type: 301 Permanent'
          ]
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
