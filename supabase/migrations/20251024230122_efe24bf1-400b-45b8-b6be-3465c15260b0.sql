-- Add rating fields to products table
ALTER TABLE public.products
ADD COLUMN rating numeric(2,1) CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN rating_source text,
ADD COLUMN total_reviews integer DEFAULT 0;