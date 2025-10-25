-- Add show_reviews_videos column to products table
ALTER TABLE public.products 
ADD COLUMN show_reviews_videos BOOLEAN DEFAULT false;

-- Update existing products to show reviews if they have a rating
UPDATE public.products 
SET show_reviews_videos = true 
WHERE rating IS NOT NULL;