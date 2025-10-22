import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gift, Star, Crown, Gem, Heart, ShoppingBag, Calendar, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Rewards = () => {
  const benefits = [
    {
      icon: ShoppingBag,
      title: "Earn Points on Every Purchase",
      description: "Get 1 point for every dollar spent",
    },
    {
      icon: Gift,
      title: "Birthday Surprise",
      description: "Select your special gift during your birthday month",
    },
    {
      icon: Zap,
      title: "Exclusive Bonus Events",
      description: "Double and triple point opportunities",
    },
    {
      icon: Heart,
      title: "Redeem for Rewards",
      description: "Turn points into dollars off your next purchase",
    },
  ];

  const redemptionTiers = [
    { points: 100, value: "$5", bgColor: "from-pink-100 to-rose-100" },
    { points: 250, value: "$15", bgColor: "from-purple-100 to-pink-100" },
    { points: 500, value: "$30", bgColor: "from-fuchsia-100 to-purple-100" },
    { points: 750, value: "$50", bgColor: "from-violet-100 to-fuchsia-100" },
    { points: 1000, value: "$75", bgColor: "from-purple-200 to-pink-200" },
  ];

  const membershipTiers = [
    {
      name: "Insider",
      icon: Star,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      requirement: "Free to join",
      benefits: [
        "Earn 1 point per $1 spent",
        "Birthday gift selection",
        "Exclusive member offers",
        "Early access to sales",
      ],
    },
    {
      name: "VIP",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      requirement: "Spend $500 in a year",
      benefits: [
        "Everything in Insider",
        "1.25 points per $1 spent",
        "Free shipping on all orders",
        "Quarterly bonus point events",
        "Exclusive VIP-only products",
      ],
    },
    {
      name: "Elite",
      icon: Gem,
      color: "text-fuchsia-600",
      bgColor: "bg-fuchsia-50",
      borderColor: "border-fuchsia-200",
      requirement: "Spend $1,200 in a year",
      benefits: [
        "Everything in VIP",
        "1.5 points per $1 spent",
        "Private shopping events",
        "Free beauty consultations",
        "Birthday month double points",
        "Exclusive Elite gift with purchase",
      ],
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
              >
                Join Free Today
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">1M+</p>
                <p className="text-muted-foreground">Happy Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">$10M+</p>
                <p className="text-muted-foreground">Rewards Redeemed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">Free</p>
                <p className="text-muted-foreground">To Join & Use</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
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

        {/* Points Value */}
        <section className="py-16 bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your Points = Real Savings</h2>
              <p className="text-lg text-muted-foreground">
                Redeem your points anytime for instant discounts
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {redemptionTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${tier.bgColor} p-6 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1`}
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {tier.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {tier.points} points
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Membership Levels</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The more you shop, the more you earn. Rise through the tiers and unlock exclusive benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {membershipTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <Card
                    key={index}
                    className={`${tier.bgColor} ${tier.borderColor} border-2 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1`}
                  >
                    <div className="p-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md`}>
                        <Icon className={`w-8 h-8 ${tier.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <Badge variant="outline" className="mb-4">
                        {tier.requirement}
                      </Badge>
                      
                      <ul className="space-y-3">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join Beauty Vault Rewards today and start earning points on your next purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8"
              >
                Sign Up Free
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
