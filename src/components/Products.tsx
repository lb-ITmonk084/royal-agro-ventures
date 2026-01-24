import { Leaf, Sun } from "lucide-react";
import moringaImg from "@/assets/moringa.png";
import tomatoImg from "@/assets/tomato.png";

const Products = () => {
  const products = [
    {
      image: moringaImg,
      name: "Dehydrated Moringa Leaves & Powder",
      description: "Premium organic moringa sourced from the finest farms. Rich in nutrients and carefully processed to retain maximum nutritional value.",
      icon: <Leaf className="w-5 h-5" />,
      features: ["100% Organic", "Nutrient-Rich", "Fine Powder Available"],
    },
    {
      image: tomatoImg,
      name: "Dehydrated Tomato Flakes",
      description: "High-quality dehydrated tomato flakes perfect for culinary applications. Retains natural flavor and color.",
      icon: <Sun className="w-5 h-5" />,
      features: ["Natural Flavor", "Long Shelf Life", "Premium Quality"],
    },
  ];

  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully sourced and processed dehydrated products that meet the highest international standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 group"
            >
              <div className="relative h-64 overflow-hidden bg-muted/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-2 rounded-full">
                  {product.icon}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-4">{product.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Interested in our complete product range including spices, rice, and pulses?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request Full Catalogue
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
