import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductFilters, { FilterState } from "@/components/ProductFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Products = () => {
  const { products, loading, error } = useProducts();
  const addItem = useCartStore(state => state.addItem);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100],
    brands: [],
    benefits: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      
      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const productType = product.node.productType?.toLowerCase() || '';
        const productTitle = product.node.title.toLowerCase();
        const hasMatchingCategory = filters.categories.some(category => 
          productType.includes(category.toLowerCase()) || 
          productTitle.includes(category.toLowerCase())
        );
        if (!hasMatchingCategory) return false;
      }

      // Benefits filter (check tags)
      if (filters.benefits.length > 0) {
        const productTags = product.node.tags?.map(tag => tag.toLowerCase()) || [];
        const hasMatchingBenefit = filters.benefits.some(benefit =>
          productTags.includes(benefit.toLowerCase())
        );
        if (!hasMatchingBenefit) return false;
      }

      return true;
    });
  }, [products, filters]);

  const handleAddToCart = (product: typeof products[0]) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    });

    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart`,
      position: "top-center"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-32 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products available
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters 
                onFilterChange={setFilters}
                activeFilters={filters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <ProductFilters 
                    onFilterChange={setFilters}
                    activeFilters={filters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found</p>
                <p className="text-sm text-muted-foreground">
                  Start by creating products in your Shopify store
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const mainImage = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const hasVariants = product.node.variants.edges.length > 1;

                  return (
                    <div
                      key={product.node.id}
                      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/products/${product.node.handle}`}>
                        <div className="aspect-square overflow-hidden bg-secondary/20">
                          {mainImage ? (
                            <img
                              src={mainImage.url}
                              alt={mainImage.altText || product.node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{product.node.title}</h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold">
                              ${parseFloat(price.amount).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {price.currencyCode}
                            </span>
                          </div>
                          {hasVariants && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {product.node.variants.edges.length} variants available
                            </p>
                          )}
                        </div>
                      </Link>
                      
                      <div className="p-4 pt-0">
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full"
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
