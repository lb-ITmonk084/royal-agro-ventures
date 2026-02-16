import { ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import apedaImg from "@/assets/license-apeda.jpeg";
import dgftImg from "@/assets/license-dgft.jpeg";
import fssaiImg from "@/assets/license-fssai.jpg";
import msmeImg from "@/assets/license-msme.jpeg";

const licenses = [
  { name: "APEDA", description: "Agricultural & Processed Food Products Export Development Authority", image: apedaImg },
  { name: "DGFT", description: "Directorate General of Foreign Trade", image: dgftImg },
  { name: "FSSAI", description: "Food Safety and Standards Authority of India", image: fssaiImg },
  { name: "MSME", description: "Micro, Small & Medium Enterprises", image: msmeImg },
];

const Licenses = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();

  return (
    <section id="licenses" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Certifications</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Licensed & Certified
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are proud to hold certifications from India's leading regulatory and trade bodies, ensuring quality and compliance at every step.
          </p>
        </div>

        <div ref={cardsRef} className={`grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children ${cardsVisible ? "visible" : ""}`}>
          {licenses.map((license, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 group"
            >
              <div className="h-48 overflow-hidden bg-white flex items-center justify-center p-6">
                <img
                  src={license.image}
                  alt={license.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <h4 className="font-serif text-lg font-semibold">{license.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{license.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Licenses;
