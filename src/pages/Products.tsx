import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductFilters, { FilterState } from "@/components/ProductFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/data/productsData";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100],
    brands: [],
    benefits: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

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
        <main className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-secondary py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                All Products
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products
              </p>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <ProductFilters
                  onFilterChange={setFilters}
                  activeFilters={filters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                      {(filters.categories.length + filters.benefits.length) >
                        0 && (
                        <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                          {filters.categories.length + filters.benefits.length}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <ProductFilters
                      onFilterChange={setFilters}
                      activeFilters={filters}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results Count and Sort */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.handle}
                    className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice &&
                          product.compareAtPrice > product.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      {product.variants && product.variants.length > 0 && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {product.variants.length} shades
                        </p>
                      )}
                      <Button className="w-full" size="sm">
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        priceRange: [0, 100],
                        brands: [],
                        benefits: [],
                      })
                    }
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
