import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Truck, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const WIX_ORDERS_URL = "https://www.beautyvaultboutique.com/account/my-account";

  const features = [
    {
      icon: Package,
      title: "Order History",
      description: "View all your past purchases",
    },
    {
      icon: Truck,
      title: "Track Shipments",
      description: "Real-time tracking information",
    },
    {
      icon: Clock,
      title: "Order Status",
      description: "Check processing and delivery status",
    },
    {
      icon: CheckCircle,
      title: "Easy Returns",
      description: "Manage returns and exchanges",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Package className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                My Orders
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Track, manage, and review all your beauty orders
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 text-lg"
                onClick={() => window.open(WIX_ORDERS_URL, '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View My Orders
              </Button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Order Management</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Access your complete order history, track shipments, and manage returns through your Wix members area.
              </p>
              <Button
                size="lg"
                onClick={() => window.open(WIX_ORDERS_URL, '_blank')}
                className="rounded-full px-8"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Go to My Orders
              </Button>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Order Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your beauty purchases
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Check Your Orders?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              View order history, track shipments, and manage your purchases
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8"
                onClick={() => window.open(WIX_ORDERS_URL, '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Access My Orders
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600 rounded-full px-8"
                asChild
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
