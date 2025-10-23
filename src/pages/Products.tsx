import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProducts, Product } from "@/hooks/useProducts";
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
    priceRange: [0, 500],
    brands: [],
    benefits: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = product.discounted_price || product.price;
      
      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: {
          price: product.price.toString(),
          currency: product.currency,
          discountedPrice: product.discounted_price?.toString()
        },
        media: {
          items: product.image_url ? [{
            image: {
              url: product.image_url,
              altText: product.image_alt || product.name
            }
          }] : []
        }
      },
      productId: product.id,
      variantTitle: undefined,
      price: {
        amount: product.price.toString(),
        currency: product.currency
      },
      quantity: 1,
      selectedOptions: {}
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
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
                  Try adjusting your filters or check back later
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const displayPrice = product.discounted_price || product.price;
                  const hasDiscount = product.discounted_price && product.discounted_price < product.price;

                  return (
                    <div key={product.id} className="group">
                      <Link to={`/product/${product.slug}`}>
                        <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden mb-4">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.image_alt || product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="mb-3">
                          {hasDiscount ? (
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-bold text-destructive">
                                ${displayPrice.toFixed(2)}
                              </p>
                              <p className="text-sm line-through text-muted-foreground">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xl font-bold">
                              ${displayPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </Link>
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
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
