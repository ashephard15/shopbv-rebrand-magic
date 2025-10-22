import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroGlow from "@/assets/hero-glow.png";
import featuredGloss from "@/assets/featured-gloss.png";
import featuredRio from "@/assets/featured-rio.png";

const Hero = () => {
  return (
    <section className="bg-background">
      {/* Main Hero Banner */}
      <div className="relative bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Unlock Your
                <br />
                <span className="text-primary">Everyday Luxury</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover premium beauty essentials curated for your unique style
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full">
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Explore Collections
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroGlow}
                alt="Featured Products"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-12 text-muted-foreground/80">
            Take a Dip in Our Top-Notch Picks
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Gloss Lovers Beware */}
            <Link 
              to="/products?category=lip-makeup"
              className="group bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={featuredGloss}
                  alt="Gloss Lovers Beware"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-secondary/50">
                <h3 className="text-xl font-medium mb-2 text-muted-foreground">
                  Gloss Lovers Beware
                </h3>
                <p className="text-muted-foreground/70">
                  Glosses that glow. Balms that boss.
                </p>
              </div>
            </Link>

            {/* Feel the Glow */}
            <Link 
              to="/products?category=skin-care"
              className="group bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={heroGlow}
                  alt="Feel the Glow"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-secondary/50">
                <h3 className="text-xl font-medium mb-2 text-muted-foreground">
                  Feel the Glow
                </h3>
                <p className="text-muted-foreground/70">
                  Glow like it's golden hour - anytime, anywhere.
                </p>
              </div>
            </Link>

            {/* Rio Radiance */}
            <Link 
              to="/products?category=body-care"
              className="group bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={featuredRio}
                  alt="Rio Radiance at Your Finger Tips"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-secondary/50">
                <h3 className="text-xl font-medium mb-2 text-muted-foreground">
                  Rio Radiance at Your Finger Tips
                </h3>
                <p className="text-muted-foreground/70">
                  Skin-kissed formulas that smell like summer forever.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
