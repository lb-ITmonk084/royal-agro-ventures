import { Leaf, ShieldCheck, Package, Globe, FileCheck, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const badges = [
    { icon: <Tractor className="w-8 h-8" />, title: "Direct Sourcing", subtitle: "From Indian Farms" },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Quality Assured", subtitle: "At Every Step" },
    { icon: <Package className="w-8 h-8" />, title: "Bulk Supply", subtitle: "Competitive Pricing" },
    { icon: <Globe className="w-8 h-8" />, title: "Global Delivery", subtitle: "On Time, Every Time" },
    { icon: <FileCheck className="w-8 h-8" />, title: "Export Expertise", subtitle: "Documentation Support" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Indian farmland with tractor and export cargo ship at sunset"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        {/* Readability overlay — stronger on the left where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-background/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-foreground">Premium Indian</span>
              <br />
              <span className="text-primary">Agricultural Products</span>
              <br />
              <span className="text-foreground">for Global Markets</span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-foreground mb-2">
              From Indian Farms to the World.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-10">
              Sourced with Care. Delivered with Trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background border-2 border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-semibold rounded-md shadow-lg transition-all duration-300 uppercase tracking-wide"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Request Export Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge Strip */}
      <div className="relative z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <div className="text-primary shrink-0">{badge.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-primary hidden" />
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
