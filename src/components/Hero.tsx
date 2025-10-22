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
