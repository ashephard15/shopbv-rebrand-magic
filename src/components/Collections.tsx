import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fragranceImg from "@/assets/collection-fragrance-new.png";
import skincareImg from "@/assets/collection-skincare-new.png";
import makeupImg from "@/assets/collection-makeup-nails-new.png";
import haircareImg from "@/assets/collection-haircare-new.png";

const Collections = () => {
  const collections = [
    {
      title: "Fragrance",
      description: "Signature scents for every mood",
      image: fragranceImg,
      link: "/products?category=Fragrance"
    },
    {
      title: "Skincare",
      description: "Glow from within with our curated skincare",
      image: skincareImg,
      link: "/products?category=Skin Care"
    },
    {
      title: "Makeup",
      description: "Express yourself with bold colors",
      image: makeupImg,
      link: "/products?category=Makeup"
    },
    {
      title: "Hair Care",
      description: "Transform your hair care routine",
      image: haircareImg,
      link: "/products?category=Hair Care"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of premium beauty products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <a
              key={collection.title}
              href={collection.link}
              className="group relative overflow-hidden rounded-lg border border-border hover:shadow-lg transition-all"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                <p className="text-sm mb-4 opacity-90">{collection.description}</p>
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-white/90 rounded-full"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
