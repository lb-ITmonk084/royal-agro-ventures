import {
  Leaf,
  Carrot,
  Apple,
  Wheat,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import onion1Img from "@/assets/ONION 1.jpg.jpeg";
import onion2Img from "@/assets/ONION 2.jpg.jpeg";

interface Product {
  name: string;
  description: string;
  images: string[];
  forms: string;
  category: string;
  benefits?: string[];
  specifications?: Record<string, string>;
  applications?: string[];
}

interface ImageCarouselProps {
  images: string[];
  name: string;
  onSelect: () => void;
}

const ImageCard = ({ images, name, onSelect }: ImageCarouselProps) => {
  const [currentIndex] = useState(0);

  return (
    <div className="relative h-52 overflow-hidden bg-muted/30">
      <img
        src={images[currentIndex]}
        alt={`${name} - Image ${currentIndex + 1}`}
        className="h-full w-full object-cover transition-transform duration-500 cursor-pointer hover:scale-105"
        onClick={onSelect}
      />
    </div>
  );
};

const getProductDetailMeta = (product: Product) => ({
  benefits:
    product.benefits ?? [
      "Premium quality ingredients",
      "Naturally processed and hygienic",
      "Suitable for food and wellness applications",
    ],
  specifications:
    product.specifications ?? {
      Origin: "India",
      Form: product.forms,
      Moisture: "≤ 10%",
      "Shelf Life": "12 Months",
      Packaging: "25 kg / 50 kg",
    },
  applications:
    product.applications ?? ["Food Processing", "Bakery", "Retail", "Export"],
});

const categories = [
  {
    title: "Dehydrated Vegetables",
    icon: <Carrot className="w-5 h-5" />,
    products: [
      {
        name: "Dehydrated Onion",
        description: "Premium dehydrated onion with natural aroma and flavor.",
        forms: "Flakes / Powder",
        images: [onion1Img, onion2Img],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Dehydrated Garlic",
        description: "Dehydrated garlic used for culinary flavor and wellness applications.",
        forms: "Flakes / Powder",
        images: [garlicFreshImg, garlicFlakesImg, garlicPowderImg],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Dehydrated Ginger",
        description: "Strong ginger aroma and consistent quality for food processing.",
        forms: "Slices / Powder",
        images: [gingerSlicesImg, gingerPowderImg],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Dehydrated Tomato",
        description: "Bright red tomato flakes and powder packed with flavor.",
        forms: "Flakes / Powder",
        images: [tomatoImg, tomatoFreshImg, tomatoFlakesImg, tomatoPowderImg],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Dehydrated Carrot",
        description: "Naturally sweet carrot slices and powder for healthy recipes.",
        forms: "Flakes / Powder",
        images: [carrotFreshImg, carrotFlakesImg, carrotPowderImg],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Dehydrated Beetroot",
        description: "Color-rich beetroot product for functional and culinary needs.",
        forms: "Flakes / Powder",
        images: [beetrootFreshImg, beetrootFlakesImg, beetrootPowderImg],
        category: "Dehydrated Vegetables",
      },
      {
        name: "Red Chilli",
        description: "High color and heat retention in a natural red chilli range.",
        forms: "Whole / Powder",
        images: [chilliFreshImg, chilliDriedImg, chilliPowderImg],
        category: "Dehydrated Vegetables",
      },
    ],
  },
  {
    title: "Herbs & Leaves",
    icon: <Leaf className="w-5 h-5" />,
    products: [
      {
        name: "Dehydrated Moringa",
        description: "Leaf powder and dried leaves from carefully sourced moringa plants.",
        forms: "Leaves / Powder",
        images: [moringaImg, moringaLeavesImg, moringaDriedImg, moringaPowderImg],
        category: "Herbs & Leaves",
      },
      {
        name: "Turmeric",
        description: "Premium turmeric fingers and powder with consistent purity.",
        forms: "Fingers / Powder",
        images: [turmericFreshImg, turmericFingersImg, turmericPowderImg],
        category: "Herbs & Leaves",
      },
      {
        name: "Ashwagandha",
        description: "Root and powder variants prepared for wellness-focused applications.",
        forms: "Root / Powder",
        images: [ashwagandhaFreshImg, ashwagandhaRootImg, ashwagandhaPowderImg],
        category: "Herbs & Leaves",
      },
    ],
  },
  {
    title: "Dehydrated Fruits",
    icon: <Apple className="w-5 h-5" />,
    products: [
      {
        name: "Pineapple",
        description: "Sweet dehydrated pineapple with premium flavor retention.",
        forms: "Slices / Powder",
        images: [pineappleFreshImg, pineappleDriedImg, pineapplePowderImg],
        category: "Dehydrated Fruits",
      },
      {
        name: "Banana",
        description: "Naturally sweet banana flakes and powder with added versatility.",
        forms: "Flakes / Powder",
        images: [bananaFreshImg, bananaDriedImg, bananaPowderImg],
        category: "Dehydrated Fruits",
      },
      {
        name: "Guava Powder",
        description: "Fine guava powder crafted from ripe fruit for convenient usage.",
        forms: "Powder",
        images: [guavaFreshImg, guavaDriedImg, guavaPowderImg],
        category: "Dehydrated Fruits",
      },
    ],
  },
  {
    title: "Rice & Grains",
    icon: <Wheat className="w-5 h-5" />,
    products: [
      {
        name: "Sona Masoori Rice",
        description: "Light, aromatic rice suited for premium daily consumption.",
        forms: "Grain",
        images: [sonaMasoori1Img, sonaMasoori2Img],
        category: "Rice & Grains",
      },
      {
        name: "IR64 Parboiled Rice",
        description: "Reliable export-grade rice with strong quality consistency.",
        forms: "Grain",
        images: [ir64RiceImg],
        category: "Rice & Grains",
      },
    ],
  },
];

const allProducts: Product[] = categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    category: category.title,
  }))
);

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductImageIndex, setSelectedProductImageIndex] = useState(0);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = allProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" || product.category === activeCategory;
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });
  }, [activeCategory, searchTerm, sortBy]);

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setSelectedProductImageIndex(0);
  };

  const selectedDetail = selectedProduct ? getProductDetailMeta(selectedProduct) : null;

  return (
    <section id="products" className="bg-[#f4f2ee] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-foreground">Category</span>
        </div>

        <div className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7a7a6d]">3. Products category page</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1d2d1e] md:text-4xl">Royal Agro</h2>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-[#e8e0d5] bg-[#f9f7f4] p-4 shadow-sm md:p-6 xl:flex-row">
          <aside className="w-full rounded-xl border border-[#eee4d5] bg-[#f2efe9] p-3 xl:w-[260px]">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6b5d]">Categories</div>
            <div className="space-y-1.5">
              {[
                "All Products",
                ...categories.map((category) => category.title),
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-[#183b2a] text-white"
                      : "text-[#233b30] hover:bg-[#e7e0d5]"
                  }`}
                >
                  <span>{category}</span>
                  {activeCategory === category && <span className="text-xs">●</span>}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search products..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[#e3d9cd] bg-white py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-[#b5c7af]"
                />
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-[#e3d9cd] bg-white px-3 py-2 text-sm text-[#264434] outline-none"
                >
                  <option value="name">Sort by: Name</option>
                  <option value="category">Sort by: Category</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={`${product.category}-${product.name}`}
                  onClick={() => handleOpenProductDetail(product)}
                  className="cursor-pointer overflow-hidden rounded-xl border border-[#e7ddd1] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <ImageCard
                    images={product.images}
                    name={product.name}
                    onSelect={() => handleOpenProductDetail(product)}
                  />
                  <div className="space-y-3 p-4">
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b8b70]">
                      {product.category}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1d2d1e]">{product.name}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6c7d68]">
                        {product.forms}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProductDetail(product);
                        }}
                        className="rounded-full border border-[#cedec5] bg-[#f1f7ee] px-3 py-1.5 text-[11px] font-medium text-[#1d2d1e] transition-colors hover:bg-[#e4f1e2]"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-8 rounded-xl border border-dashed border-[#d7cfc4] bg-white p-8 text-center text-sm text-muted-foreground">
                No products found for this search.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && selectedDetail && (
        <div className="fixed inset-0 z-50 bg-[#0e1d13]/55">
          <div className="h-full w-full overflow-y-auto bg-[#f7f4ef]">
            <div className="flex items-center justify-between border-b border-[#e8dfd3] px-5 py-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#6f766d]">
                Product Details
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full border border-[#d9d0c4] bg-white px-2.5 py-1 text-sm text-[#1d2d1e] hover:bg-[#f4efe9]"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-6">
              <div className="rounded-[22px] bg-[#efeadf] p-4">
                <div className="relative overflow-hidden rounded-[18px] border border-[#e0d5c4] bg-white">
                  <img
                    src={selectedProduct.images[selectedProductImageIndex]}
                    alt={selectedProduct.name}
                    className="h-[320px] w-full object-cover md:h-[400px]"
                  />

                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProductImageIndex(
                            (prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
                        aria-label="Previous product image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProductImageIndex(
                            (prev) => (prev + 1) % selectedProduct.images.length
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
                        aria-label="Next product image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={`${selectedProduct.name}-${index}`}
                      type="button"
                      onClick={() => setSelectedProductImageIndex(index)}
                      className={`overflow-hidden rounded-xl border bg-white p-1 transition-all ${
                        selectedProductImageIndex === index
                          ? "border-[#224d3a] shadow-sm"
                          : "border-[#e5dcca]"
                      }`}
                    >
                      <img src={image} alt={`${selectedProduct.name} preview ${index + 1}`} className="h-16 w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8b8b70]">
                  {selectedProduct.category}
                </div>
                <h3 className="mt-3 font-serif text-3xl font-bold text-[#1d2d1e] md:text-[2.2rem]">
                  {selectedProduct.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedProduct.description}</p>

                <ul className="mt-5 space-y-3 text-sm text-[#1d2d1e]">
                  {selectedDetail.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#234d3d]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="flex-1 rounded-full bg-[#1d3c2b] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163124]"
                  >
                    Request Sample
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-[#d5c8b8] bg-[#f6f0e7] px-5 py-3 text-sm font-medium text-[#1d3c2b] transition-colors hover:bg-[#eee2d1]"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e8dfd3] bg-white/60 px-5 py-6 md:px-6">
              <h4 className="font-serif text-2xl font-semibold text-[#1d2d1e]">Product Specifications</h4>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Object.entries(selectedDetail.specifications).map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[140px_1fr] gap-3 rounded-xl border border-[#ebe0d2] bg-[#f9f5f1] px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-[#5e665d]">{label}</span>
                    <span className="text-[#1d2d1e]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6a7465]">Applications</h5>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDetail.applications.map((application) => (
                    <span
                      key={application}
                      className="rounded-full border border-[#d9ddcf] bg-[#f1f5ee] px-3 py-1.5 text-xs font-medium text-[#284431]"
                    >
                      {application}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Products;
