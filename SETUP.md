# Beauty Vault - Setup Guide

A modern beauty e-commerce site built with React, TypeScript, Supabase, and Wix integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
The `.env` file is already configured with:
```env
VITE_SUPABASE_URL=https://vfktebhuvmsavyczlvze.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma3RlYmh1dm1zYXZ5Y3psdnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNjM4OTQsImV4cCI6MjA3NjczOTg5NH0.pX5EFKsETVxvwpHfVcZQena2l4ZfAAoiBftZgqSlkM0
VITE_SUPABASE_PROJECT_ID=vfktebhuvmsavyczlvze
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **E-commerce**: Wix integration
- **State Management**: Zustand (cart) + React Query (data fetching)
- **Routing**: React Router DOM

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation
│   ├── Hero.tsx        # Hero sections
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   ├── Products.tsx    # Product catalog
│   ├── SyncProducts.tsx # Wix sync interface
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useProducts.ts  # Product data fetching
│   └── ...
├── stores/             # Zustand stores
│   └── cartStore.ts    # Shopping cart state
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client & types
└── utils/              # Utility functions
```

## 🗄️ Database Schema

### Products Table
The Supabase database includes a `products` table with:
- `id` (UUID, Primary Key)
- `wix_id` (Text, nullable) - Links to Wix product
- `name` (Text, required)
- `description` (Text, nullable)
- `slug` (Text, required)
- `price` (Numeric, required)
- `currency` (Text, nullable)
- `discounted_price` (Numeric, nullable)
- `image_url` (Text, nullable)
- `image_alt` (Text, nullable)
- `stock_quantity` (Integer, nullable)
- `in_stock` (Boolean, nullable)
- `category` (Text, nullable)
- `brand` (Text, nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Row Level Security (RLS)
- Public read access for all products
- Insert, update, delete policies configured for product management

## 🔄 Wix Integration

### Supabase Edge Functions
The project includes a Supabase Edge Function for syncing products to Wix:

**Location**: `supabase/functions/sync-wix-products/index.ts`

**Functionality**:
- Finds products in database without Wix IDs
- Creates those products in Wix store
- Links database products to Wix products
- Preserves all product details and pricing

### Required Wix Environment Variables
For the sync function to work, configure these secrets in Supabase:

```bash
# Wix API Configuration
WIX_API_KEY=your_wix_api_key
WIX_SITE_ID=9b424666-ec32-41d3-84d6-c831a2637239
WIX_ACCOUNT_ID=your_wix_account_id

# Supabase Configuration (auto-configured)
SUPABASE_URL=https://vfktebhuvmsavyczlvze.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Deploying Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Deploy the sync function
npx supabase functions deploy sync-wix-products
```

## 🛍️ Features

### Core Features
- **Product Catalog**: Browse products with filtering and search
- **Product Details**: Individual product pages with full information
- **Shopping Cart**: Add/remove items, view cart summary
- **Responsive Design**: Mobile-first responsive layout
- **Admin Tools**: CSV import and Wix sync functionality

### Pages & Routes
- `/` - Homepage with hero sections and featured products
- `/products` - Product catalog with filters
- `/products/:handle` - Individual product pages
- `/fragrance-quiz` - Interactive fragrance recommendation quiz
- `/rewards` - Customer rewards program
- `/sync-products` - Admin: Sync products to Wix
- `/import-csv` - Admin: Import products from CSV

### Components
- **Navigation**: Responsive navigation with cart indicator
- **Hero**: Multiple hero sections for different products
- **Collections**: Product category showcase
- **ProductFilters**: Category and search filtering
- **CartDrawer**: Slide-out shopping cart

## 🎨 Styling

### Design System
- **Colors**: Custom beauty-focused color palette
- **Typography**: Modern, clean typography hierarchy
- **Components**: Consistent component library with shadcn/ui
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Key Design Elements
- Elegant product cards with hover effects
- Smooth animations and transitions
- Professional beauty industry aesthetic
- Accessible color contrasts and interactions

## 📱 Mobile Optimization

- Responsive navigation with mobile menu
- Touch-friendly interface elements
- Optimized images and loading states
- Mobile-specific cart and product interactions

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Deployment Options
1. **Vercel/Netlify**: Connect GitHub repository for automatic deployments
2. **Supabase Hosting**: Deploy directly through Supabase
3. **Custom Server**: Deploy the `dist/` folder to any static hosting

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- ESLint configuration for code quality
- TypeScript for type safety
- Prettier formatting (recommended)

## 📊 Data Management

### Product Data Sources
1. **CSV Import**: Upload product data via CSV files
2. **Manual Entry**: Add products through admin interface
3. **Wix Sync**: Sync products to/from Wix store

### Data Flow
1. Products stored in Supabase database
2. Frontend fetches via `useProducts` hook
3. Cart state managed with Zustand
4. Wix integration via Edge Functions

## 🛠️ Troubleshooting

### Common Issues

**Build Warnings**: Large chunk size warnings are normal due to image assets. Consider:
- Using dynamic imports for code splitting
- Optimizing image assets
- Implementing lazy loading

**Supabase Connection**: Ensure environment variables are correctly set and Supabase project is active.

**Wix Sync Issues**: Verify Wix API credentials and site permissions in Supabase Edge Function secrets.

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review console errors in browser dev tools
3. Verify environment configuration
4. Check Supabase dashboard for database issues

---

**Last Updated**: October 2024
**Version**: 1.0.0