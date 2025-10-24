-- Rename discounted_price to compare_at_price to reflect actual meaning
ALTER TABLE products 
RENAME COLUMN discounted_price TO compare_at_price;

-- Add comment to clarify the column purpose
COMMENT ON COLUMN products.compare_at_price IS 'Original/regular price before discount. If set and higher than price, price is the sale price.';