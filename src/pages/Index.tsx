import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PromoBanners from "@/components/PromoBanners";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <PromoBanners />
        <Collections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
