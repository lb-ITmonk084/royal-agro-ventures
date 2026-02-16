import { Leaf, Sun, Carrot, Apple, Wheat, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImageLightbox from "./ImageLightbox";
import moringaImg from "@/assets/moringa.png";
import moringaLeavesImg from "@/assets/moringa-leaves.jpg";
import moringaPowderImg from "@/assets/moringa-powder.jpg";
import moringaDriedImg from "@/assets/moringa-dried.jpg";
import tomatoImg from "@/assets/tomato.png";
import tomatoFreshImg from "@/assets/tomato-fresh.jpg";
import tomatoFlakesImg from "@/assets/tomato-flakes.jpg";
import tomatoPowderImg from "@/assets/tomato-powder.jpg";
import carrotFreshImg from "@/assets/carrot-fresh.jpg";
import carrotFlakesImg from "@/assets/carrot-flakes.jpg";
import carrotPowderImg from "@/assets/carrot-powder.jpg";
import beetrootFreshImg from "@/assets/beetroot-fresh.jpg";
import beetrootFlakesImg from "@/assets/beetroot-flakes.jpg";
import beetrootPowderImg from "@/assets/beetroot-powder.jpg";
import garlicFreshImg from "@/assets/garlic-fresh.jpg";
import garlicFlakesImg from "@/assets/garlic-flakes.jpg";
import garlicPowderImg from "@/assets/garlic-powder.jpg";
import gingerFreshImg from "@/assets/ginger-fresh.jpg";
import gingerSlicesImg from "@/assets/ginger-slices.jpg";
import gingerPowderImg from "@/assets/ginger-powder.jpg";
import chilliFreshImg from "@/assets/chilli-fresh.jpg";
import chilliDriedImg from "@/assets/chilli-dried.jpg";
import chilliPowderImg from "@/assets/chilli-powder.jpg";
import turmericFreshImg from "@/assets/turmeric-fresh.jpg";
import turmericFingersImg from "@/assets/turmeric-fingers.jpg";
import turmericPowderImg from "@/assets/turmeric-powder.jpg";
import ashwagandhaFreshImg from "@/assets/ashwagandha-fresh.jpg";
import ashwagandhaRootImg from "@/assets/ashwagandha-root.jpg";
import ashwagandhaPowderImg from "@/assets/ashwagandha-powder.jpg";
import pineappleFreshImg from "@/assets/pineapple-fresh.jpg";
import pineappleDriedImg from "@/assets/pineapple-dried.jpg";
import pineapplePowderImg from "@/assets/pineapple-powder.jpg";
import bananaFreshImg from "@/assets/banana-fresh.jpg";
import bananaDriedImg from "@/assets/banana-dried.jpg";
import bananaPowderImg from "@/assets/banana-powder.jpg";
import guavaFreshImg from "@/assets/guava-fresh.jpg";
import guavaDriedImg from "@/assets/guava-dried.jpg";
import guavaPowderImg from "@/assets/guava-powder.jpg";
import sonaMasoori1Img from "@/assets/sona-masoori-1.jpg";
import sonaMasoori2Img from "@/assets/sona-masoori-2.jpg";
import ir64RiceImg from "@/assets/ir64-rice.jpg";

interface ImageCarouselProps {
  images: string[];
  name: string;
  onImageClick: (images: string[], index: number, name: string) => void;
}

const ImageCarousel = ({ images, name, onImageClick }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 overflow-hidden bg-muted/30 group/carousel">
      <img
        src={images[currentIndex]}
        alt={`${name} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 cursor-pointer hover:scale-105"
        onClick={() => onImageClick(images, currentIndex, name)}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface CategoryProps {
  category: {
    title: string;
    icon: React.ReactNode;
    products: {
      name: string;
      description: string;
      benefits: string[];
      images: string[];
      forms: string;
    }[];
  };
  onImageClick: (images: string[], index: number, name: string) => void;
}

const CategoryBlock = ({ category, onImageClick }: CategoryProps) => {
  const [ref, visible] = useScrollReveal();

  return (
    <div ref={ref} className="mb-16 last:mb-0">
      <div className={`flex items-center gap-3 mb-8 reveal-left ${visible ? "visible" : ""}`}>
        <div className="p-3 bg-primary text-primary-foreground rounded-xl">
          {category.icon}
        </div>
        <h3 className="font-serif text-2xl font-semibold">{category.title}</h3>
      </div>

      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${visible ? "visible" : ""}`}>
        {category.products.map((product, prodIndex) => (
          <div
            key={prodIndex}
            className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 group"
          >
            {product.images && product.images.length > 0 ? (
              <ImageCarousel 
                images={product.images} 
                name={product.name} 
                onImageClick={onImageClick}
              />
            ) : null}
            
            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="font-serif text-lg font-semibold leading-tight">{product.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
              <div className="mb-4">
                <span className="text-xs font-medium text-accent uppercase tracking-wider">Available Forms</span>
                <p className="text-sm font-medium mt-1">{product.forms}</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Health Benefits</span>
                <ul className="space-y-1">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <Sun className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const [headerRef, headerVisible] = useScrollReveal();

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxProductName, setLightboxProductName] = useState("");

  const handleImageClick = (images: string[], index: number, name: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxProductName(name);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const categories = [
    {
      title: "Dehydrated Vegetables",
      icon: <Carrot className="w-5 h-5" />,
      products: [
        {
          name: "Dehydrated Moringa Leaves & Powder",
          description: "Premium organic moringa sourced from the finest farms. Rich in nutrients and carefully processed to retain maximum nutritional value.",
          benefits: ["Rich in vitamins & minerals", "Supports immunity", "High protein content"],
          images: [moringaImg, moringaLeavesImg, moringaDriedImg, moringaPowderImg],
          forms: "Leaves / Powder",
        },
        {
          name: "Dehydrated Tomato Flakes",
          description: "High-quality dehydrated tomato flakes perfect for culinary applications. Retains natural flavor and color.",
          benefits: ["Rich in lycopene", "Natural antioxidants", "Long shelf life"],
          images: [tomatoImg, tomatoFreshImg, tomatoFlakesImg, tomatoPowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Dehydrated Carrot",
          description: "Fresh carrots sourced directly from farmers and gently dehydrated to preserve natural sweetness, color, and nutrients.",
          benefits: ["Rich in beta-carotene (Vitamin A)", "Supports eye health and immunity", "High antioxidant content"],
          images: [carrotFreshImg, carrotFlakesImg, carrotPowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Dehydrated Beetroot",
          description: "Carefully processed beetroot with vibrant color and natural flavor.",
          benefits: ["Improves blood circulation", "Supports stamina and energy", "Rich in iron and antioxidants"],
          images: [beetrootFreshImg, beetrootFlakesImg, beetrootPowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Dehydrated Garlic",
          description: "Premium quality garlic processed under controlled conditions to retain aroma and potency.",
          benefits: ["Boosts immunity", "Supports heart health", "Natural antibacterial properties"],
          images: [garlicFreshImg, garlicFlakesImg, garlicPowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Dehydrated Ginger",
          description: "High-quality ginger dried to preserve pungency and medicinal value.",
          benefits: ["Aids digestion", "Anti-inflammatory properties", "Supports immunity"],
          images: [gingerSlicesImg, gingerPowderImg],
          forms: "Slices / Powder",
        },
        {
          name: "Red Chilli",
          description: "Naturally dried red chillies with consistent heat and color.",
          benefits: ["Rich in antioxidants", "Boosts metabolism", "Enhances digestion"],
          images: [chilliFreshImg, chilliDriedImg, chilliPowderImg],
          forms: "Whole / Powder",
        },
      ],
    },
    {
      title: "Herbs & Roots",
      icon: <Leaf className="w-5 h-5" />,
      products: [
        {
          name: "Turmeric",
          description: "Naturally cultivated turmeric with high curcumin content, processed hygienically for maximum purity.",
          benefits: ["Powerful anti-inflammatory", "Supports immunity", "Widely used in food and wellness industries"],
          images: [turmericFreshImg, turmericFingersImg, turmericPowderImg],
          forms: "Fingers / Powder",
        },
        {
          name: "Ashwagandha",
          description: "Carefully sourced Ashwagandha roots processed to retain medicinal potency.",
          benefits: ["Reduces stress", "Improves stamina and strength", "Supports overall wellness"],
          images: [ashwagandhaFreshImg, ashwagandhaRootImg, ashwagandhaPowderImg],
          forms: "Root / Powder",
        },
      ],
    },
    {
      title: "Dehydrated Fruits",
      icon: <Apple className="w-5 h-5" />,
      products: [
        {
          name: "Pineapple",
          description: "Naturally sweet pineapple processed without additives.",
          benefits: ["Rich in Vitamin C", "Supports digestion", "Natural energy booster"],
          images: [pineappleFreshImg, pineappleDriedImg, pineapplePowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Banana",
          description: "Ripe bananas dehydrated to preserve natural sweetness and nutrition.",
          benefits: ["High in potassium", "Boosts energy", "Suitable for baby foods & bakery"],
          images: [bananaFreshImg, bananaDriedImg, bananaPowderImg],
          forms: "Flakes / Powder",
        },
        {
          name: "Guava Powder",
          description: "Guava processed into fine powder retaining flavor and nutrients.",
          benefits: ["High Vitamin C content", "Supports immunity", "Antioxidant rich"],
          images: [guavaFreshImg, guavaDriedImg, guavaPowderImg],
          forms: "Powder",
        },
      ],
    },
    {
      title: "Rice (Non-Basmati)",
      icon: <Wheat className="w-5 h-5" />,
      products: [
        {
          name: "Sona Masoori Rice",
          description: "Lightweight, aromatic rice suitable for daily consumption and export markets.",
          benefits: ["Low starch", "Easy digestion", "Preferred for South Indian cuisine"],
          images: [sonaMasoori1Img, sonaMasoori2Img],
          forms: "Grain",
        },
        {
          name: "IR64 Parboiled Rice",
          description: "Export-grade parboiled rice with excellent grain strength and shelf life.",
          benefits: ["Nutrient retention", "Consistent cooking quality", "Suitable for bulk export"],
          images: [ir64RiceImg],
          forms: "Grain",
        },
      ],
    },
  ];

  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Product Catalogue
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully sourced and processed products that meet the highest international standards. 
            Each product retains natural color, flavor, aroma, and nutritional value.
          </p>
        </div>

        {categories.map((category, catIndex) => (
          <CategoryBlock key={catIndex} category={category} onImageClick={handleImageClick} />
        ))}

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Looking for custom packaging or bulk orders? We offer flexible solutions for all requirements.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request Quotation
          </a>
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
        onIndexChange={setLightboxIndex}
        productName={lightboxProductName}
      />
    </section>
  );
};

export default Products;
