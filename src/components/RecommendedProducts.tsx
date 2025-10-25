import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface RecommendedProductsProps {
  allProducts: Product[];
}

const RecommendedProducts = ({ allProducts }: RecommendedProductsProps) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    // Get recently viewed products from localStorage
    const viewedProducts = localStorage.getItem('recentlyViewed');
    const viewedIds = viewedProducts ? JSON.parse(viewedProducts) : [];
    
    // Get products based on recently viewed or random selection
    let recommendations: Product[] = [];
    
    if (viewedIds.length > 0) {
      // Filter products from the same categories as viewed
      const viewedCategories = allProducts
        .filter(p => viewedIds.includes(p.id))
        .map(p => p.category);
      
      recommendations = allProducts
        .filter(p => viewedCategories.includes(p.category) && !viewedIds.includes(p.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
    }
    
    // Fallback: Select products from middle/end of array to avoid showing same as main grid
    // Main grid shows newest first, so we pick from older products randomly
    if (recommendations.length < 12) {
      const availableProducts = allProducts.filter(p => !viewedIds.includes(p.id));
      // Skip the first 20 products (which appear at top of main grid) and randomize the rest
      const skipFirst = Math.min(20, Math.floor(availableProducts.length * 0.3));
      const poolForRecommendations = availableProducts.slice(skipFirst);
      
      const shuffled = [...poolForRecommendations].sort(() => Math.random() - 0.5);
      const needed = 12 - recommendations.length;
      recommendations = [...recommendations, ...shuffled.slice(0, needed)];
    }
    
    setRecommendedProducts(recommendations);
  }, [allProducts]);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('recommendations-scroll');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: {
          price: product.price.toString(),
          currency: product.currency,
          discountedPrice: product.compare_at_price?.toString()
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
      wixId: product.wix_id,
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

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">We think you'll like</h2>
          <p className="text-sm text-muted-foreground">{recommendedProducts.length} items</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollContainer('left')}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollContainer('right')}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id="recommendations-scroll"
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recommendedProducts.map((product) => {
          const displayPrice = product.price;
          const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

          return (
            <div key={product.id} className="flex-shrink-0 w-[calc(20%-12.8px)] min-w-[180px] group flex flex-col">
              <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
                <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden mb-3">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.image_alt || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mb-2 mt-auto">
                  {hasDiscount ? (
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-destructive">
                        ${displayPrice.toFixed(2)}
                      </p>
                      <p className="text-xs line-through text-muted-foreground">
                        ${product.compare_at_price!.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold">
                      ${displayPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="w-full mt-2"
              >
                Add to bag
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProducts;
