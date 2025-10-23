-- Add INSERT policy for products table to allow anyone to insert products
CREATE POLICY "Anyone can insert products"
  ON public.products
  FOR INSERT
  WITH CHECK (true);

-- Add UPDATE policy for products table to allow anyone to update products  
CREATE POLICY "Anyone can update products"
  ON public.products
  FOR UPDATE
  USING (true);

-- Add DELETE policy for products table to allow anyone to delete products
CREATE POLICY "Anyone can delete products"
  ON public.products
  FOR DELETE
  USING (true);