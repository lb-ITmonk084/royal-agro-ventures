import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#values", label: "Values" },
    { href: "#products", label: "Products" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Royal Agro Ventures" className="h-16 w-auto" />
            <span className="font-serif text-base sm:text-xl font-semibold text-primary">
              Royal Agro Ventures
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="gap-2">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-foreground/70 hover:text-primary transition-colors duration-300 font-medium border-b border-border/50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/admin/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="gap-2 mt-3 w-full">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
