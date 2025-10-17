import { Button } from "@/components/ui/button";
import makeupNails from "@/assets/collection-makeup-nails.jpg";
import skincare from "@/assets/collection-skincare.jpg";
import haircare from "@/assets/collection-haircare.jpg";
import fragrance from "@/assets/collection-fragrance.jpg";
import bodycare from "@/assets/collection-bodycare.jpg";
import toolsBrushes from "@/assets/collection-tools-brushes.jpg";

const Collections = () => {
  const collections = [
    {
      title: "Makeup & Nails",
      description: "From bold lips to perfect tips, own your look.",
      image: makeupNails,
      link: "#makeup-nails"
    },
    {
      title: "Skin Care",
      description: "Nourish and glow from within.",
      image: skincare,
      link: "#skincare"
    },
    {
      title: "Hair Care",
      description: "Luscious locks deserve the best.",
      image: haircare,
      link: "#haircare"
    },
    {
      title: "Fragrance",
      description: "Make your signature scent unforgettable.",
      image: fragrance,
      link: "#fragrance"
    },
    {
      title: "Body Care",
      description: "Smooth, soft, and totally you.",
      image: bodycare,
      link: "#bodycare"
    },
    {
      title: "Tools & Brushes",
      description: "The right tools for flawless finishes.",
      image: toolsBrushes,
      link: "#tools-brushes"
    }
  ];

  return (
    <section id="catalog" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop Our Must-Have Collections!
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Curated. Confident. Yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div 
              key={collection.title}
              className="group relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary/30">
                <img 
                  src={collection.image}
                  alt={`${collection.title} Collection`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {collection.title}
                </h3>
                <p className="font-sans text-muted-foreground">
                  {collection.description}
                </p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
                >
                  Shop {collection.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
