# Beauty Vault - Integration Details & Export

## Product Data Exports

All 136 products can be exported dynamically:

**Export Page**: Navigate to `/export-products` in your app to download:
- **JSON Format** - All products in structured JSON
- **CSV Format** - All products in spreadsheet format

Both exports include all product details, images, pricing, stock status, and Wix IDs.

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  discounted_price NUMERIC,
  currency TEXT DEFAULT 'USD',
  brand TEXT,
  category TEXT,
  image_url TEXT,
  image_alt TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER,
  wix_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Environment Variables (Required)

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id

# For Edge Functions
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Wix Integration
WIX_API_KEY=your_wix_api_key
WIX_SITE_ID=your_wix_site_id
WIX_ACCOUNT_ID=your_wix_account_id
```

## Edge Functions (Supabase)

### 1. sync-wix-products
**Location**: `/supabase/functions/sync-wix-products/index.ts`
**Purpose**: Syncs products from Supabase to Wix store
**Endpoint**: POST to `https://[project-ref].supabase.co/functions/v1/sync-wix-products`
**API Used**: Wix Stores v1 API

### 2. wix-checkout  
**Location**: `/supabase/functions/wix-checkout/index.ts`
**Purpose**: Creates checkout sessions in Wix
**Endpoint**: POST to `https://[project-ref].supabase.co/functions/v1/wix-checkout`

### 3. wix-products
**Location**: `/supabase/functions/wix-products/index.ts`
**Purpose**: Fetches products from Wix store
**Endpoint**: POST to `https://[project-ref].supabase.co/functions/v1/wix-products`

## Key Files & Components

### Frontend Components
- `/src/pages/Products.tsx` - Product listing page
- `/src/pages/ProductDetail.tsx` - Individual product detail page
- `/src/pages/SyncProducts.tsx` - Admin sync interface
- `/src/pages/ImportCSV.tsx` - CSV import tool
- `/src/components/CartDrawer.tsx` - Shopping cart
- `/src/stores/cartStore.ts` - Cart state management (Zustand)

### Hooks & Utils
- `/src/hooks/useProducts.ts` - Product data fetching hook
- `/src/lib/wix.ts` - Wix API client
- `/src/utils/csvParser.ts` - CSV parsing utilities

## Product Image URLs (All on Shopify CDN)

All product images are hosted on:
```
https://cdn.shopify.com/s/files/1/0766/5254/4213/files/
```

## Wix API Integration

### Current Configuration
- **API Version**: v1 (Stores API)
- **Base URL**: `https://www.wixapis.com/stores/v1`
- **Authentication**: Bearer token via WIX_API_KEY
- **Required Headers**: 
  - `Authorization: Bearer [WIX_API_KEY]`
  - `wix-site-id: [WIX_SITE_ID]`
  - `wix-account-id: [WIX_ACCOUNT_ID]`
  - `Content-Type: application/json`

### Product Creation Payload Structure
```json
{
  "product": {
    "name": "Product Name",
    "description": "Product description",
    "productType": "physical",
    "priceData": {
      "price": "29.99",
      "currency": "USD"
    },
    "stock": {
      "trackInventory": true,
      "inStock": true,
      "quantity": 100
    },
    "visible": true,
    "brand": "Brand Name"
  }
}
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Deploy Edge Functions (if using Supabase)
npx supabase functions deploy sync-wix-products
npx supabase functions deploy wix-checkout
npx supabase functions deploy wix-products
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router v6
- **Backend**: Supabase (Database + Edge Functions)
- **E-commerce**: Wix Stores API

## Categories

- Makeup
- Fragrance
- Skincare (if expanded)
- Haircare (if expanded)
- Body Care (if expanded)

## Brand

All products currently under: **The Beauty Vault**

## Notes

- All 136 products are in the database but none have been synced to Wix yet (wix_id is null)
- Price format: Regular price + discounted price available
- Stock tracking: Boolean in_stock flag, optional stock_quantity
- Image CDN: All images hosted on Shopify CDN with versioned URLs
- Export all products via the `/export-products` page in JSON or CSV format
