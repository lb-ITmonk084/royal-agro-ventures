import { Tractor, Shield, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();
  const [quoteRef, quoteVisible] = useScrollReveal();

  const highlights = [
    {
      icon: <Tractor className="w-8 h-8" />,
      title: "Direct Farmer Sourcing",
      description: "We work directly with farmers, ensuring traceability and fair practices",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Controlled",
      description: "Strict hygiene and food safety standards at every stage",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Export Ready",
      description: "Products processed to meet global quality expectations",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`max-w-4xl mx-auto text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-accent font-medium tracking-wider uppercase text-sm">About Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            From Farm to Global Markets
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Royal Agro Ventures is a professionally managed agri-export company committed to supplying 
            high-quality agricultural and dehydrated food products to domestic and international markets.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We work directly with farmers, ensuring traceability, consistent quality, and fair sourcing practices. 
            Every product is carefully selected, graded, and processed under strict hygiene and food safety standards.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our dehydration and processing methods are designed to retain natural color, flavor, aroma, and 
            nutritional value, while meeting global quality expectations. From raw material procurement to 
            final packaging, each stage follows controlled procedures to ensure safe, export-ready products.
          </p>
        </div>

        <div ref={cardsRef} className={`grid md:grid-cols-3 gap-8 mb-16 stagger-children ${cardsVisible ? "visible" : ""}`}>
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div ref={quoteRef} className={`bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground text-center reveal-scale ${quoteVisible ? "visible" : ""}`}>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            "At Royal Agro Ventures, we focus on <span className="font-semibold">quality, reliability, and long-term partnerships</span>, 
            helping buyers source dependable agricultural products with confidence."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
