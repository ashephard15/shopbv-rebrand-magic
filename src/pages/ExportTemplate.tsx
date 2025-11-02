import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const ExportTemplate = () => {
  const generateTemplate = () => {
    // Define the CSV headers
    const headers = [
      "name",
      "slug",
      "description",
      "price",
      "compare_at_price",
      "category",
      "brand",
      "image_url",
      "image_alt",
      "stock_quantity",
      "in_stock",
      "currency",
      "rating",
      "total_reviews",
      "rating_source"
    ];

    // Example row
    const exampleRow = [
      "Luxury Face Serum",
      "luxury-face-serum",
      "A premium anti-aging serum with hyaluronic acid and vitamin C",
      "89.99",
      "119.99",
      "Skincare",
      "Beauty Vault",
      "https://example.com/image.jpg",
      "Luxury Face Serum bottle",
      "50",
      "true",
      "USD",
      "4.5",
      "128",
      "verified"
    ];

    // Create CSV content
    const csvContent = [
      headers.join(","),
      exampleRow.map(field => `"${field}"`).join(",")
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "product-catalog-template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Template downloaded successfully");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Product Catalog Template</h1>
        
        <div className="bg-card p-6 rounded-lg border mb-6">
          <h2 className="text-xl font-semibold mb-4">Download Blank Template</h2>
          <p className="text-muted-foreground mb-4">
            Download a CSV template with all required columns and one example row to help you format your product data correctly.
          </p>
          
          <Button onClick={generateTemplate} className="gap-2">
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Template Fields</h2>
          <div className="space-y-2 text-sm">
            <div><strong>name</strong> - Product name (required)</div>
            <div><strong>slug</strong> - URL-friendly identifier (required, e.g., "luxury-face-serum")</div>
            <div><strong>description</strong> - Product description (optional)</div>
            <div><strong>price</strong> - Product price (required, number only)</div>
            <div><strong>compare_at_price</strong> - Original price for discount display (optional)</div>
            <div><strong>category</strong> - Product category (e.g., "Skincare", "Makeup")</div>
            <div><strong>brand</strong> - Brand name</div>
            <div><strong>image_url</strong> - Full URL to product image</div>
            <div><strong>image_alt</strong> - Image alt text for accessibility</div>
            <div><strong>stock_quantity</strong> - Number of items in stock</div>
            <div><strong>in_stock</strong> - true or false</div>
            <div><strong>currency</strong> - Currency code (e.g., "USD")</div>
            <div><strong>rating</strong> - Product rating (0-5)</div>
            <div><strong>total_reviews</strong> - Number of reviews</div>
            <div><strong>rating_source</strong> - Source of ratings (optional)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTemplate;
