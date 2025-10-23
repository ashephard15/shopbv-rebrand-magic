import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import Papa from 'papaparse';

const ImportCSV = () => {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState<number | null>(null);

  const handleImport = async () => {
    setImporting(true);
    try {
      // Fetch the CSV file
      const response = await fetch('/products.csv');
      const csvText = await response.text();

      // Parse CSV
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
      });

      const rows = parsed.data as any[];
      
      // Group rows by Handle (products can have multiple variant rows)
      const productMap = new Map();
      
      rows.forEach(row => {
        if (!row.Handle) return;
        
        const handle = row.Handle;
        
        if (!productMap.has(handle)) {
          // First row for this product - create the product entry
          productMap.set(handle, {
            wix_id: null,
            name: row.Title || 'Unnamed Product',
            description: row['Body (HTML)']?.replace(/<[^>]*>/g, ' ').trim() || null,
            slug: handle,
            price: parseFloat(row['Variant Price'] || '0'),
            currency: 'USD',
            discounted_price: row['Variant Compare At Price'] 
              ? parseFloat(row['Variant Compare At Price']) 
              : null,
            image_url: row['Image Src'] || null,
            image_alt: row.Title || null,
            stock_quantity: null,
            in_stock: row.Published?.toLowerCase() === 'true',
            category: row.Type || null,
            brand: row.Vendor || null,
          });
        }
      });

      const productsToImport = Array.from(productMap.values());
      
      console.log(`Importing ${productsToImport.length} products...`);

      // Insert products in batches
      const batchSize = 50;
      let totalImported = 0;

      for (let i = 0; i < productsToImport.length; i += batchSize) {
        const batch = productsToImport.slice(i, i + batchSize);
        
        const { data, error } = await supabase
          .from('products')
          .upsert(batch, { 
            onConflict: 'slug',
            ignoreDuplicates: false 
          })
          .select();

        if (error) {
          console.error('Batch import error:', error);
          throw error;
        }

        totalImported += data?.length || 0;
        console.log(`Imported batch ${i / batchSize + 1}, total: ${totalImported}`);
      }

      setImported(totalImported);
      toast.success("Import complete!", {
        description: `Successfully imported ${totalImported} products from CSV`,
        position: "top-center"
      });
    } catch (error) {
      console.error('Import error:', error);
      toast.error("Import failed", {
        description: error instanceof Error ? error.message : 'Failed to import products',
        position: "top-center"
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Import CSV Products</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                CSV Product Import
              </CardTitle>
              <CardDescription>
                Import all products from your CSV file into the database. This will make them
                available on your site and ready to sync to Wix.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imported !== null && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully imported {imported} products!
                </div>
              )}
              
              <Button
                onClick={handleImport}
                disabled={importing}
                size="lg"
                className="w-full"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Import All Products
                  </>
                )}
              </Button>

              <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t">
                <p className="font-medium">What happens when you import:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Reads all products from products.csv file</li>
                  <li>Parses product details, prices, and images</li>
                  <li>Adds products to your database</li>
                  <li>Products become available on your site</li>
                  <li>Ready to sync to Wix store</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImportCSV;
