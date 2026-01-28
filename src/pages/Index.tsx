import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OurProcess from "@/components/OurProcess";
import Values from "@/components/Values";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <OurProcess />
      <Values />
      <Products />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
