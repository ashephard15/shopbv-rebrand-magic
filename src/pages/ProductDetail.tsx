import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft } from "lucide-react";
import { fetchWixProducts, WixProduct } from "@/lib/wix";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState<WixProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        setLoading(true);
        const products = await fetchWixProducts();
        const foundProduct = products.find((p: WixProduct) => p.slug === handle);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

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

  const images = product.media?.items?.map(item => item.image).filter(Boolean) || [];
  const price = product.price;

  const handleAddToCart = () => {
    addItem({
      product,
      productId: product.id,
      price: {
        amount: price.price,
        currency: price.currency
      },
      quantity: 1,
      selectedOptions: {}
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart`,
      position: "top-center"
    });
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
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-secondary/20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="mb-6 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  ${parseFloat(price.price).toFixed(2)}
                </span>
                <span className="text-muted-foreground">{price.currency}</span>
              </div>
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
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Stock Status */}
            {product.stock && (
              <div className="flex items-center gap-2 text-sm">
                {product.stock.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-muted-foreground">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-muted-foreground">Out of Stock</span>
                  </>
                )}
              </div>
            )}
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
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
