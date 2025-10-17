import { Button } from "@/components/ui/button";

const Collections = () => {
  const collections = [
    {
      title: "Lippies",
      description: "From glossy to matte, find your perfect pout.",
      link: "#lips"
    },
    {
      title: "Face",
      description: "Foundation, blush, and everything in between.",
      link: "#face"
    },
    {
      title: "Eyes",
      description: "Make a statement with stunning eye looks.",
      link: "#eyes"
    },
    {
      title: "Skincare",
      description: "Nourish and glow from within.",
      link: "#skincare"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div 
              key={collection.title}
              className="group relative overflow-hidden rounded-xl bg-card p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-bold text-foreground">
                  {collection.title}
                </h3>
                <p className="font-sans text-muted-foreground">
                  {collection.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-semibold"
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
