-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wix_id TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  discounted_price DECIMAL(10, 2),
  image_url TEXT,
  image_alt TEXT,
  stock_quantity INTEGER,
  in_stock BOOLEAN DEFAULT true,
  category TEXT,
  brand TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products (public catalog)
CREATE POLICY "Products are publicly readable"
  ON public.products
  FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_slug ON public.products(slug);

-- Insert sample products
INSERT INTO public.products (name, description, slug, price, discounted_price, image_url, category, brand, in_stock, stock_quantity) VALUES
('Hydrating Face Serum', 'Intensive hydration serum with hyaluronic acid', 'hydrating-face-serum', 45.00, 39.99, '/placeholder.svg', 'Skincare', 'BeautyVault', true, 50),
('Matte Lipstick - Ruby Red', 'Long-lasting matte finish lipstick', 'matte-lipstick-ruby-red', 24.00, NULL, '/placeholder.svg', 'Makeup', 'BeautyVault', true, 100),
('Volumizing Shampoo', 'Adds volume and shine to hair', 'volumizing-shampoo', 28.00, 24.99, '/placeholder.svg', 'Haircare', 'BeautyVault', true, 75),
('Rose Gold Perfume', 'Floral fragrance with warm notes', 'rose-gold-perfume', 65.00, NULL, '/placeholder.svg', 'Fragrance', 'BeautyVault', true, 30),
('Body Butter - Coconut', 'Rich moisturizing body butter', 'body-butter-coconut', 32.00, 28.00, '/placeholder.svg', 'Bodycare', 'BeautyVault', true, 60),
('Makeup Brush Set', 'Professional 12-piece brush set', 'makeup-brush-set', 55.00, 49.99, '/placeholder.svg', 'Tools & Brushes', 'BeautyVault', true, 40),
('Vitamin C Serum', 'Brightening serum with vitamin C', 'vitamin-c-serum', 52.00, NULL, '/placeholder.svg', 'Skincare', 'BeautyVault', true, 45),
('Gel Nail Polish Set', '5-piece gel polish collection', 'gel-nail-polish-set', 38.00, 34.99, '/placeholder.svg', 'Makeup & Nails', 'BeautyVault', true, 55);
