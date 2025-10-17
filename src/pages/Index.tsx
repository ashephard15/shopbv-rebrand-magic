import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Collections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
