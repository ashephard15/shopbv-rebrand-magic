-- Add unique constraint to wix_id if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'products_wix_id_key'
    ) THEN
        ALTER TABLE public.products ADD CONSTRAINT products_wix_id_key UNIQUE (wix_id);
    END IF;
END $$;