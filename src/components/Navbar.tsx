import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/jhc-logo.png";

const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Identity", href: "#identity" },
  { label: "Season", href: "#season" },
  { label: "Experience", href: "#giveaway" },
  { label: "Founders", href: "#founders" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-dark/90 backdrop-blur-xl border-b border-border/20 shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-3">
          <img src={logoImg} alt="Jerusalem HC" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span className="font-heading text-lg md:text-xl font-bold tracking-wider text-foreground">
            JERUSALEM <span className="text-primary">HC</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#membership"
            className="px-6 py-2.5 text-sm font-heading font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Join Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-dark/95 backdrop-blur-xl border-b border-border/20 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                  {l.label}
                </a>
              ))}
              <a href="#membership" onClick={() => setOpen(false)} className="px-6 py-3 text-sm font-heading font-semibold tracking-wider rounded-full bg-primary text-primary-foreground text-center mt-2">
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
