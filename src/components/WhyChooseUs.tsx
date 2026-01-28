import { Tractor, ShieldCheck, Thermometer, TrendingUp, Package, Globe } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Tractor className="w-8 h-8" />,
      title: "Direct Farmer Sourcing",
      description: "We source directly from trusted farmers ensuring traceability and fair practices.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Strict Hygiene & Safety",
      description: "Every product processed under rigorous hygiene and food safety standards.",
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Quality-Controlled Dehydration",
      description: "Advanced dehydration process that retains natural color, flavor, and nutrients.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Consistent Supply",
      description: "Reliable supply capability to meet your business demands year-round.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Custom Packaging",
      description: "Flexible packaging options tailored to your specific requirements.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Export-Oriented Approach",
      description: "Products processed to meet international quality and compliance standards.",
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with a company that prioritizes quality, reliability, and long-term relationships.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-background group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 text-accent rounded-xl mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                {reason.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-2xl font-semibold mb-4">Ready to Partner With Us?</h3>
          <p className="text-muted-foreground mb-6">
            We would be happy to share product specifications and samples for evaluation.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
