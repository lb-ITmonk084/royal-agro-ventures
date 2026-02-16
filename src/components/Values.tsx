import { Heart, Target, RefreshCw, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Values = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();
  const [quoteRef, quoteVisible] = useScrollReveal();

  const values = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Trust",
      description: "We believe trust is earned, not claimed. Every product and every promise we make is backed with honesty and transparency.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Discipline",
      description: "From sourcing to delivery, we follow strict processes to ensure consistency and reliability in every step.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <RefreshCw className="w-10 h-10" />,
      title: "Consistency",
      description: "Quality is not a one-time effort; it's our everyday commitment. We deliver the same excellence, every single time.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Principles",
      description: "Our business decisions are rooted in integrity, ensuring fairness to our farmers, partners, and buyers.",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section id="values" className="py-24">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Our Foundation</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Values That Guide Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Royal Agro Ventures, our values are the foundation of everything we do. 
            They guide our work, shape our relationships, and define the way we grow with our partners.
          </p>
        </div>

        <div ref={cardsRef} className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${cardsVisible ? "visible" : ""}`}>
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className={`inline-flex items-center justify-center w-16 h-16 ${value.color} rounded-2xl mb-6 relative z-10`}>
                {value.icon}
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 relative z-10">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">{value.description}</p>
            </div>
          ))}
        </div>

        <div ref={quoteRef} className={`mt-16 text-center reveal ${quoteVisible ? "visible" : ""}`}>
          <p className="text-lg text-muted-foreground italic font-serif">
            "Together, these values make us more than just an agri-business. 
            They make us a reliable partner for long-term success."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Values;
