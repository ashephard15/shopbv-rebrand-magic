import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ExportProducts() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: 'json' | 'csv') => {
    try {
      setExporting(true);
      toast.loading(`Exporting ${format.toUpperCase()}...`);

      // Call the edge function with format parameter
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-products?format=${format}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get the data based on format
      const data = format === 'json' 
        ? await response.json()
        : await response.text();

      // Create blob and download
      const blob = format === 'json' 
        ? new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        : new Blob([data], { type: 'text/csv' });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products-export-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.dismiss();
      toast.success(`Successfully exported ${data.length || 136} products as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.dismiss();
      toast.error('Failed to export products');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Export Products</h1>
          <p className="text-muted-foreground mb-8">
            Download your complete product catalog
          </p>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FileJson className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold">JSON Format</h3>
                  <p className="text-sm text-muted-foreground">
                    Structured data format for APIs and applications
                  </p>
                </div>
                <Button
                  onClick={() => handleExport('json')}
                  disabled={exporting}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export JSON
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-4">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">CSV Format</h3>
                    <p className="text-sm text-muted-foreground">
                      Spreadsheet format for Excel, Google Sheets, etc.
                    </p>
                  </div>
                  <Button
                    onClick={() => handleExport('csv')}
                    disabled={exporting}
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-2">
              <h4 className="font-semibold text-sm">Export includes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>All product details (name, description, pricing)</li>
                <li>Image URLs and alt text</li>
                <li>Category and brand information</li>
                <li>Stock status and quantities</li>
                <li>Wix integration IDs (if synced)</li>
                <li>Creation and update timestamps</li>
              </ul>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
