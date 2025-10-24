import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    console.log('Admin user verified, fetching products...');

    // Fetch all products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    console.log(`Successfully fetched ${products?.length || 0} products`);

    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'json';

    // Validate format parameter
    if (!['json', 'csv'].includes(format)) {
      return new Response(
        JSON.stringify({ error: 'Invalid format. Use "json" or "csv"' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (format === 'csv') {
      // Generate CSV formatted for Wix import template
      const headers = [
        'handleId', 'fieldType', 'name', 'description', 'productImageUrl', 'collection', 'sku', 'ribbon',
        'price', 'surcharge', 'visible', 'discountMode', 'discountValue', 'inventory', 'weight', 'cost',
        'productOptionName1', 'productOptionType1', 'productOptionDescription1',
        'productOptionName2', 'productOptionType2', 'productOptionDescription2',
        'productOptionName3', 'productOptionType3', 'productOptionDescription3',
        'productOptionName4', 'productOptionType4', 'productOptionDescription4',
        'productOptionName5', 'productOptionType5', 'productOptionDescription5',
        'productOptionName6', 'productOptionType6', 'productOptionDescription6',
        'additionalInfoTitle1', 'additionalInfoDescription1',
        'additionalInfoTitle2', 'additionalInfoDescription2',
        'additionalInfoTitle3', 'additionalInfoDescription3',
        'additionalInfoTitle4', 'additionalInfoDescription4',
        'additionalInfoTitle5', 'additionalInfoDescription5',
        'additionalInfoTitle6', 'additionalInfoDescription6',
        'customTextField1', 'customTextCharLimit1', 'customTextMandatory1', 'brand'
      ];

      const csvRows = [headers.join(',')];

      for (const product of products || []) {
        const handleId = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const hasDiscount = product.discounted_price && product.discounted_price < product.price;
        const discountValue = hasDiscount ? (Number(product.price) - Number(product.discounted_price)).toFixed(2) : '';
        
        const rowData = {
          handleId,
          fieldType: 'Product',
          name: product.name,
          description: product.description || '',
          productImageUrl: product.image_url || '',
          collection: product.category || '',
          sku: '',
          ribbon: '',
          price: product.price,
          surcharge: '',
          visible: 'TRUE',
          discountMode: hasDiscount ? 'AMOUNT' : '',
          discountValue: discountValue,
          inventory: product.in_stock ? 'InStock' : 'OutOfStock',
          weight: '',
          cost: '',
          productOptionName1: '', productOptionType1: '', productOptionDescription1: '',
          productOptionName2: '', productOptionType2: '', productOptionDescription2: '',
          productOptionName3: '', productOptionType3: '', productOptionDescription3: '',
          productOptionName4: '', productOptionType4: '', productOptionDescription4: '',
          productOptionName5: '', productOptionType5: '', productOptionDescription5: '',
          productOptionName6: '', productOptionType6: '', productOptionDescription6: '',
          additionalInfoTitle1: '', additionalInfoDescription1: '',
          additionalInfoTitle2: '', additionalInfoDescription2: '',
          additionalInfoTitle3: '', additionalInfoDescription3: '',
          additionalInfoTitle4: '', additionalInfoDescription4: '',
          additionalInfoTitle5: '', additionalInfoDescription5: '',
          additionalInfoTitle6: '', additionalInfoDescription6: '',
          customTextField1: '', customTextCharLimit1: '', customTextMandatory1: '',
          brand: product.brand || ''
        };

        const row = headers.map(header => {
          const value = rowData[header as keyof typeof rowData];
          if (value === null || value === undefined) return '';
          const strValue = String(value);
          if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
            return `"${strValue.replace(/"/g, '""')}"`;
          }
          return strValue;
        });
        csvRows.push(row.join(','));
      }

      const csv = csvRows.join('\n');

      return new Response(csv, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="wix-products-import.csv"',
        },
      });
    }

    // Return JSON by default
    return new Response(JSON.stringify(products, null, 2), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
