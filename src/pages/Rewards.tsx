import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Gift, Heart, ShoppingBag, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Rewards = () => {
  const WIX_LOYALTY_URL = "https://manage.wix.com/dashboard/9b424666-ec32-41d3-84d6-c831a2637239/loyalty";

  const benefits = [
    {
      icon: ShoppingBag,
      title: "Earn Points on Every Purchase",
      description: "Get rewarded automatically with every order",
    },
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Access member-only benefits and rewards",
    },
    {
      icon: Zap,
      title: "Special Events",
      description: "Double and triple point opportunities",
    },
    {
      icon: Heart,
      title: "Redeem for Rewards",
      description: "Turn points into savings on future purchases",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-fuchsia-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Beauty Vault Rewards
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Where every purchase makes you glow even brighter
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 text-lg"
                onClick={() => window.open(WIX_LOYALTY_URL, '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Access Your Rewards
              </Button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Manage Your Loyalty Rewards</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your rewards and points are managed through our customer portal. 
                Access your account to view your points balance, redeem rewards, and track your membership tier.
              </p>
              <Button
                size="lg"
                onClick={() => window.open(WIX_LOYALTY_URL, '_blank')}
                className="rounded-full px-8"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Go to Rewards Portal
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Rewards Program Benefits</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start earning rewards with every purchase and unlock exclusive perks
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Access Your Rewards?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              View your points balance, redeem rewards, and unlock exclusive member benefits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8"
                onClick={() => window.open(WIX_LOYALTY_URL, '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Access Rewards Portal
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600 rounded-full px-8"
                asChild
              >
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rewards;
