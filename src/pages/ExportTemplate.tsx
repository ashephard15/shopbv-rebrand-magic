import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const ExportTemplate = () => {
  const generateTemplate = () => {
    // Define the CSV headers for Wix import
    const headers = [
      'handleId', 'fieldType', 'name', 'description', 'productImageUrl', 'collection', 'sku', 'ribbon',
      'price', 'surcharge', 'visible', 'discountMode', 'discountValue', 'inventory', 'weight', 'cost',
      'productOptionName1', 'productOptionType1', 'productOptionDescription1',
      'productOptionName2', 'productOptionType2', 'productOptionDescription2',
      'productOptionName3', 'productOptionType3', 'productOptionDescription3',
      'productOptionName4', 'productOptionType4', 'productOptionDescription4',
      'productOptionName5', 'productOptionType5', 'productOptionDescription5',
      'productOptionName6', 'productOptionType6', 'productOptionDescription6',
      'additionalInfoTitle1', 'additionalInfoDescription1',
      'additionalInfoTitle2', 'additionalInfoDescription2',
      'additionalInfoTitle3', 'additionalInfoDescription3',
      'additionalInfoTitle4', 'additionalInfoDescription4',
      'additionalInfoTitle5', 'additionalInfoDescription5',
      'additionalInfoTitle6', 'additionalInfoDescription6',
      'customTextField1', 'customTextCharLimit1', 'customTextMandatory1', 'brand'
    ];

    // Example row showing a product with discount
    const exampleRow = [
      'luxury-face-serum', // handleId (max 50 chars, URL-friendly)
      'Product', // fieldType (always "Product")
      'Luxury Face Serum', // name
      'A premium anti-aging serum with hyaluronic acid and vitamin C', // description
      'https://example.com/serum.jpg', // productImageUrl
      'Skincare', // collection
      'SERUM-001', // sku
      'Sale', // ribbon
      '89.99', // price
      '', // surcharge
      'TRUE', // visible
      'AMOUNT', // discountMode (AMOUNT or PERCENT, leave empty for no discount)
      '10.00', // discountValue (discount amount or percentage)
      'InStock', // inventory (InStock or OutOfStock)
      '', // weight
      '', // cost
      '', '', '', // productOption1
      '', '', '', // productOption2
      '', '', '', // productOption3
      '', '', '', // productOption4
      '', '', '', // productOption5
      '', '', '', // productOption6
      '', '', // additionalInfo1
      '', '', // additionalInfo2
      '', '', // additionalInfo3
      '', '', // additionalInfo4
      '', '', // additionalInfo5
      '', '', // additionalInfo6
      '', '', '', // customTextField1
      'Beauty Vault' // brand
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
          <h2 className="text-xl font-semibold mb-4">Download Wix Import Template</h2>
          <p className="text-muted-foreground mb-4">
            Download a Wix-compatible CSV template with all required columns and one example row. This format ensures seamless product import and checkout functionality.
          </p>
          
          <Button onClick={generateTemplate} className="gap-2">
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Key Wix Template Fields</h2>
          <div className="space-y-2 text-sm">
            <div><strong>handleId</strong> - Unique product identifier (max 50 chars, URL-friendly, e.g., "luxury-face-serum")</div>
            <div><strong>fieldType</strong> - Always "Product" for product rows</div>
            <div><strong>name</strong> - Product name (required)</div>
            <div><strong>description</strong> - Product description</div>
            <div><strong>productImageUrl</strong> - Full URL to product image</div>
            <div><strong>collection</strong> - Product category/collection (e.g., "Skincare", "Makeup")</div>
            <div><strong>price</strong> - Product price (required, number only)</div>
            <div><strong>visible</strong> - TRUE or FALSE (show/hide product)</div>
            <div><strong>discountMode</strong> - AMOUNT or PERCENT (leave empty for no discount)</div>
            <div><strong>discountValue</strong> - Discount amount or percentage</div>
            <div><strong>inventory</strong> - InStock or OutOfStock</div>
            <div><strong>brand</strong> - Brand name</div>
            <div className="mt-4 p-3 bg-muted rounded">
              <strong>Note:</strong> The template includes additional fields for product options, additional info, and custom text fields. Leave these empty if not needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTemplate;
