import { Award, Package, Globe, Leaf, IndianRupee } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Products carefully selected, processed, and packaged to meet the highest industry standards.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Wide Range",
      description: "From aromatic spices to premium pulses and dehydrated products for diverse needs.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Expertise",
      description: "Extensive experience in domestic and international markets with efficient deliveries.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Environmentally-friendly practices that benefit people and the planet.",
    },
    {
      icon: <IndianRupee className="w-8 h-8" />,
      title: "Competitive Pricing",
      description: "Best value through efficient sourcing and logistics management.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Why Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Why Choose Royal Agro Ventures?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 text-accent rounded-xl mb-5">
                {reason.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
