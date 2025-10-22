import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Gift, Tag } from "lucide-react";
import promoGiftSets from "@/assets/promo-gift-sets.png";

const PromoBanners = () => {
  const promos = [
    {
      id: 1,
      title: "Exclusive Member Perks",
      subtitle: "Join now and save on your favorites",
      description: "Sign up today for special discounts and early access.",
      cta: "Join Free",
      link: "/products",
      gradient: "from-rose-100 via-pink-50 to-orange-50",
      textColor: "text-gray-900",
      icon: Sparkles,
    },
    {
      id: 2,
      title: "Gift Sets Starting at $12",
      subtitle: "Perfect presents for any occasion",
      description: "Curated collections that wow without breaking the bank.",
      cta: "Shop Sets",
      link: "/products?category=gift-sets",
      gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
      textColor: "text-white",
      icon: Gift,
    },
    {
      id: 3,
      title: "Signature Scent Collections",
      subtitle: "Find your perfect fragrance match",
      description: "Premium perfumes and colognes for every personality.",
      cta: "Discover Now",
      link: "/fragrance-quiz",
      gradient: "from-purple-600 via-pink-500 to-rose-500",
      textColor: "text-white",
      icon: Tag,
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {promos.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <Link
                key={promo.id}
                to={promo.link}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background image for gift sets card */}
                {promo.id === 2 && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={promoGiftSets}
                      alt="Gift Sets"
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/90 via-pink-600/90 to-rose-600/90" />
                  </div>
                )}
                
                <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                  <div className="mb-4">
                    <Icon className={`h-8 w-8 ${promo.textColor} opacity-80`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 ${promo.textColor}`}>
                      {promo.title}
                    </h3>
                    <p className={`text-lg font-medium mb-3 ${promo.textColor} opacity-90`}>
                      {promo.subtitle}
                    </p>
                    <p className={`text-sm ${promo.textColor} opacity-75 mb-6`}>
                      {promo.description}
                    </p>
                  </div>

                  <Button
                    className={`w-fit ${
                      promo.id === 1
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    } rounded-full px-6 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {promo.cta}
                  </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
