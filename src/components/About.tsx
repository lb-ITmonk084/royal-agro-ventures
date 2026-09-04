import { CheckCircle2, Package, Users, Globe, Award, BadgeCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import aboutFarmer from "@/assets/about-farmer.jpg";
import aboutWarehouse from "@/assets/about-warehouse1.jpg";
import aboutFacility from "@/assets/about-facility.jpg";
import aboutStorage from "@/assets/about-storage.jpg";

const About = () => {
  const [contentRef, contentVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();

  const highlights = [
    "Direct sourcing from Indian farms",
    "Advanced processing and quality control",
    "Customer-focused approach",
    "Global standards & compliance",
  ];

  const stats = [
    { icon: <Package className="w-8 h-8" />, value: "10+", label: "Products" },
    { icon: <Users className="w-8 h-8" />, value: "500+", label: "Happy Clients" },
    { icon: <Globe className="w-8 h-8" />, value: "25+", label: "Countries" },
    { icon: <Award className="w-8 h-8" />, value: "10+", label: "Years of Experience" },
    { icon: <BadgeCheck className="w-8 h-8" />, value: "100%", label: "Quality Commitment" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-12 items-center mb-14 reveal ${contentVisible ? "visible" : ""}`}
        >
          {/* Left: Text */}
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              About Royal Agro Ventures
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Royal Agro Ventures is a trusted exporter and supplier of premium
              agricultural products from India. We connect Indian farmers and
              producers with global markets through our quality products,
              transparent practices and reliable supply chain.
            </p>
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image collage */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={aboutFarmer}
                alt="Indian farmer holding a basket of fresh vegetables in a green farm field"
                loading="lazy"
                width={1024}
                height={768}
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { src: aboutWarehouse, alt: "Agricultural warehouse with fresh produce crates" },
                { src: aboutFacility, alt: "Food processing facility with vegetable conveyor line" },
                { src: aboutStorage, alt: "Storage warehouse aisle with grain bags on racks" },
              ].map((img, index) => (
                <div key={index} className="overflow-hidden rounded-xl shadow-md">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={768}
                    height={512}
                    className="w-full aspect-[3/2] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className={`bg-primary rounded-3xl px-8 py-10 reveal-scale ${statsVisible ? "visible" : ""}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 stagger-children visible">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4 text-primary-foreground">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary-foreground/40 flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-serif text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
