import { Leaf } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Royal Agro Ventures" className="h-10 w-auto brightness-0 invert" />
            <span className="font-serif text-xl font-semibold">Royal Agro Ventures</span>
          </div>
          
          <div className="flex items-center gap-2 text-background/60">
            <Leaf size={18} />
            <span>Cultivating Quality, Nurturing Trust</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>© {new Date().getFullYear()} Royal Agro Ventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
