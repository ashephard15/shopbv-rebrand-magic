import { ShoppingCart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/beauty-vault-logo.png";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center gap-8">
            <a href="/" className="font-serif text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="/products" className="font-serif text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#catalog" className="font-serif text-muted-foreground hover:text-foreground transition-colors">
              Catalog
            </a>
            <a href="#contact" className="font-serif text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src={logo} 
              alt="The Beauty Vault" 
              className="h-16 w-auto mix-blend-multiply"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
