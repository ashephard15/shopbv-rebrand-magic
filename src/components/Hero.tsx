import { Button } from "@/components/ui/button";
import heroGloss from "@/assets/hero-gloss.jpg";
import heroGlow from "@/assets/hero-glow.jpg";
import heroRio from "@/assets/hero-rio.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6">
            Take a Dip in Our Top-Notch Picks
          </h1>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
            Where Beauty Finds Its Moment
          </p>
        </div>

        {/* Featured Collections Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Gloss Lovers */}
          <div className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={heroGloss} 
                alt="Gloss Lovers Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Gloss Lovers Beware
              </h3>
              <p className="font-sans text-muted-foreground">
                Glosses that glow. Balms that boss.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold">
                Shop Lippies
              </Button>
            </div>
          </div>

          {/* Feel the Glow */}
          <div className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={heroGlow} 
                alt="Feel the Glow Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Feel the Glow
              </h3>
              <p className="font-sans text-muted-foreground">
                Glow like it's golden hour - anytime, anywhere.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold">
                Shop Now
              </Button>
            </div>
          </div>

          {/* Rio Radiance */}
          <div className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={heroRio} 
                alt="Rio Radiance Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Rio Radiance at Your Finger Tips
              </h3>
              <p className="font-sans text-muted-foreground">
                Skin-kissed formulas that smell like summer forever.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
