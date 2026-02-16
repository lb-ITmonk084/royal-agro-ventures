import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OurProcess from "@/components/OurProcess";
import Values from "@/components/Values";
import Products from "@/components/Products";
import Licenses from "@/components/Licenses";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import logoImg from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Global Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src={logoImg} 
          alt="" 
          className="w-[500px] h-[500px] object-contain opacity-[0.036]"
        />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <OurProcess />
        <Values />
        <Products />
        <Licenses />
        <WhyChooseUs />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

export default Index;
