import { useState, useEffect, useCallback } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const COLORS = [
  "#e74c3c", "#2ecc71", "#3498db", "#f39c12", "#9b59b6",
  "#1abc9c", "#e67e22", "#e91e63", "#00bcd4", "#ff5722",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameColor, setNameColor] = useState("hsl(142 45% 25%)");

  const randomizeColor = useCallback(() => {
    setNameColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", randomizeColor);
    return () => window.removeEventListener("scroll", randomizeColor);
  }, [randomizeColor]);

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
            <span
              className="font-serif text-base sm:text-xl font-semibold transition-colors duration-300"
              style={{ color: nameColor }}
            >
              Royal Agro Ventures
            </span>
          </a>

          {/* Menu Button */}
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Navigation */}
        {isOpen && (
          <div className="mt-4 pb-4 animate-fade-in">
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
