import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, Star, Package, Store, Truck } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.handle === handle);
  
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground">Loading...</p>
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

  const images = [
    product.image,
    ...(product.variants?.map(v => v.image).filter(Boolean) || [])
  ];

  const currentPrice = product.variants?.[selectedVariant]?.price || product.price;
  const rating = 4.3;
  const reviewCount = 256;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-secondary rounded-sm overflow-hidden aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 ${
                    selectedImage === idx ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm font-medium mb-2 uppercase tracking-wide border-b border-foreground inline-block">
                {product.vendor || "BEAUTY VAULT"}
              </p>
              <h1 className="text-3xl font-normal mb-3">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="font-medium">{rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "fill-foreground text-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <button className="text-sm underline hover:no-underline">
                  {reviewCount} Reviews
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium">${currentPrice.toFixed(2)}</span>
                {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                💳 Afterpay available for orders over $35
              </p>
            </div>

            <Separator />

            {/* Variants/Colors */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Color: {product.variants[selectedVariant].title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedVariant === idx
                          ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                      title={variant.title}
                    >
                      {variant.image && (
                        <img
                          src={variant.image}
                          alt={variant.title}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.variants.length} shades available
                </p>
              </div>
            )}

            <Separator />

            {/* Delivery Options */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Pickup and delivery options</h3>
              <div className="grid grid-cols-3 gap-3">
                <button className="border border-border rounded-sm p-4 hover:border-foreground transition-colors text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm mb-1">Ship</p>
                  <p className="text-xs text-muted-foreground">
                    Free standard shipping over $35
                  </p>
                </button>
                <button className="border border-border rounded-sm p-4 hover:border-foreground transition-colors text-center">
                  <Store className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm mb-1">Pickup</p>
                  <p className="text-xs text-muted-foreground">
                    Free in-store pick up
                  </p>
                </button>
                <button className="border border-border rounded-sm p-4 hover:border-foreground transition-colors text-center">
                  <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm mb-1">Same day</p>
                  <p className="text-xs text-muted-foreground">
                    Delivered for $6.95
                  </p>
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                ✓ In stock and ready to ship
                <br />
                Usually ships out in 1-2 days
              </p>
            </div>

            <Separator />

            {/* Add to Bag */}
            <div className="flex gap-3">
              <Button className="flex-1 h-12 text-base rounded-full bg-foreground text-background hover:bg-foreground/90">
                Add to Bag
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="pt-6 space-y-2">
                <h3 className="font-medium">About this product</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
