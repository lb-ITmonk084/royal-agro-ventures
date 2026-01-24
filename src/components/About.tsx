import { Globe, Handshake, Shield } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured",
      description: "We only sell what we promise",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Long-term Partners",
      description: "Building relationships, not just deals",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Export & import network worldwide",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">About Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            More Than Just Business
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Royal Agro Ventures, we believe agriculture is more than just a business—it's a bond of trust. 
            We are proud to bring the finest rice, spices, and dehydrated products like moringa and tomato 
            products to our buyers across the globe through our export and import network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
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

        <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground text-center">
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            "What makes us different is simple: we keep our word. Our company is built on strong values—
            <span className="font-semibold">principles, discipline, consistency, and trust</span>—
            and these guide us in every deal we make."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
