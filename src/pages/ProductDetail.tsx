import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, Sparkles } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import StarRating from "@/components/StarRating";
import { useWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', handle)
          .maybeSingle();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  // Track product views for recommendations
  useEffect(() => {
    if (product?.id) {
      const viewedProducts = localStorage.getItem('recentlyViewed');
      const viewedIds: string[] = viewedProducts ? JSON.parse(viewedProducts) : [];
      
      if (!viewedIds.includes(product.id)) {
        const updatedIds = [product.id, ...viewedIds].slice(0, 20);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedIds));
      }
    }
  }, [product?.id]);

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => navigate("/products")}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const displayPrice = product?.price;
  const hasDiscount = product?.compare_at_price && product.compare_at_price > product.price;

  const handleAddToCart = () => {
    addItem({
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
        },
        stock: {
          inStock: product.in_stock,
          quantity: product.stock_quantity
        }
      },
      productId: product.id,
      wixId: product.wix_id,
      price: {
        amount: product.price.toString(),
        currency: product.currency
      },
      quantity: 1,
      selectedOptions: {}
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart`,
      position: "top-center"
    });
  };

  const handleWishlistToggle = async () => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.image_alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="py-3">
                <StarRating
                  rating={product.rating}
                  totalReviews={product.total_reviews}
                  source={product.rating_source}
                  size="md"
                />
              </div>
            )}

            {/* Price */}
            <div className="mb-6 space-y-3">
              {hasDiscount ? (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-destructive">
                      ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-xl line-through text-muted-foreground">
                      ${product.compare_at_price!.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.currency}</p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">{product.currency}</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full" 
                size="lg"
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                size="lg"
                onClick={handleWishlistToggle}
              >
                <Heart className={`w-4 h-4 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Earn Points */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium">
                  Earn {Math.floor(displayPrice)} points on this purchase
                </span>
              </div>
              {!user && (
                <Link to="/auth">
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Sign in or create an account
                  </Button>
                </Link>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.in_stock ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">
                    In Stock
                    {product.stock_quantity && ` (${product.stock_quantity} available)`}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-muted-foreground">Out of Stock</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {product.description && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold">Product Details</h2>
            <div className="prose max-w-none">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        )}

        {/* Rating Disclaimer */}
        {product.rating && (
          <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Customer ratings imported from verified retailer sources. Product reviews not yet collected on Beauty Vault.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
