import { useScrollReveal } from "@/hooks/useScrollReveal";
import freshProduce from "@/assets/tomato-fresh.jpg";
import dehydrated from "@/assets/banana-dried.jpg";
import spices from "@/assets/cat-spices.jpg";
import riceGrains from "@/assets/ir64-rice.jpg";
import commodities from "@/assets/cat-commodities.jpg";
import sourcing from "@/assets/cat-sourcing.jpg";

const WhatWeSupply = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();

  const categories = [
    { image: freshProduce, title: "Fresh Produce", subtitle: "Fruits, Vegetables & Herbs" },
    { image: dehydrated, title: "Dehydrated Products", subtitle: "Vegetables, Fruits, Leaves & Powders" },
    { image: spices, title: "Spices & Herbs", subtitle: "Pure · Natural · Aromatic" },
    { image: riceGrains, title: "Rice & Grains", subtitle: "Non Basmati Rice & Grains" },
    { image: commodities, title: "Agri Commodities", subtitle: "Bulk Agricultural Products" },
    { image: sourcing, title: "Custom Sourcing", subtitle: "Can't find what you need?" },
  ];

  return (
    <section id="supply" className="py-24">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-14 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-primary font-semibold tracking-[0.25em] uppercase text-xs">
            What We Supply
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4">
            Wide Range of Quality Products
          </h2>
        </div>

        <div ref={cardsRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 stagger-children ${cardsVisible ? "visible" : ""}`}>
          {categories.map((cat, index) => (
            <a
              key={index}
              href="#products"
              className="group text-center"
            >
              <div className="overflow-hidden rounded-xl mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.subtitle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeSupply;
