import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroGlow from "@/assets/hero-glow.png";

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

      {/* Quick Category Links */}
      <div className="bg-white border-y">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Makeup", emoji: "💄" },
              { name: "Skincare", emoji: "✨" },
              { name: "Fragrance", emoji: "🌸" },
              { name: "Hair Care", emoji: "💇‍♀️" }
            ].map((cat) => (
              <button
                key={cat.name}
                className="flex flex-col items-center justify-center p-6 border rounded-lg hover:border-primary hover:shadow-sm transition-all group"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
