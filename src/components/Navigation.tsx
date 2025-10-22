import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/beauty-vault-logo.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      {/* Top banner */}
      <div className="bg-secondary text-foreground text-sm py-2 text-center">
        Free standard shipping on any $35 purchase
      </div>
      
      {/* Main navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          {/* Top row with logo and icons */}
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="The Beauty Vault" 
                className="h-28 w-auto"
              />
            </Link>

            {/* Search bar - centered and prominent */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search The Beauty Vault"
                  className="pl-10 w-full bg-secondary border-none focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bottom row with category links */}
          <div className="hidden md:flex items-center justify-center gap-8 pb-4 border-t border-border pt-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/rewards" className="text-sm font-medium hover:text-primary transition-colors">
              Rewards
            </Link>
            <Link to="/products?category=new" className="text-sm font-medium hover:text-primary transition-colors">
              New
            </Link>
            <Link to="/products?category=sale" className="text-sm font-medium hover:text-primary transition-colors">
              Sale
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
