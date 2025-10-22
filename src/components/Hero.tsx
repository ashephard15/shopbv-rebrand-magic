import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroGlow from "@/assets/hero-glow.png";
import featuredGloss from "@/assets/featured-gloss.png";
import featuredRio from "@/assets/featured-rio.png";

const Hero = () => {
  return (
    <section className="bg-background">
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
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={featuredGloss}
                  alt="Gloss Lovers Beware"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                  Gloss Lovers Beware
                </h3>
                <p className="text-white/90 mb-4 drop-shadow-md">
                  Glosses that glow. Balms that boss.
                </p>
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6"
                  size="sm"
                >
                  Shop Now
                </Button>
              </div>
            </Link>

            {/* Feel the Glow */}
            <Link 
              to="/products?category=skin-care"
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={heroGlow}
                  alt="Feel the Glow"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                  Feel the Glow
                </h3>
                <p className="text-white/90 mb-4 drop-shadow-md">
                  Glow like it's golden hour - anytime, anywhere.
                </p>
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6"
                  size="sm"
                >
                  Shop Now
                </Button>
              </div>
            </Link>

            {/* Rio Radiance */}
            <Link 
              to="/products?category=body-care"
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={featuredRio}
                  alt="Rio Radiance at Your Finger Tips"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                  Rio Radiance at Your Finger Tips
                </h3>
                <p className="text-white/90 mb-4 drop-shadow-md">
                  Skin-kissed formulas that smell like summer forever.
                </p>
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6"
                  size="sm"
                >
                  Shop Now
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
