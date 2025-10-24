-- Update all products with null stock_quantity to default value of 1
UPDATE products 
SET stock_quantity = 1 
WHERE stock_quantity IS NULL;