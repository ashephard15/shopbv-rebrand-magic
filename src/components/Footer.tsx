import { Facebook, Instagram, Youtube, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">The Beauty Vault</h3>
            <p className="font-sans text-sm opacity-90">
              Unlock Your Everyday Luxury. Where Beauty Finds Its Moment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#catalog" className="hover:text-primary transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Music2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center">
          <p className="font-sans text-sm opacity-75">
            © 2025 The Beauty Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
