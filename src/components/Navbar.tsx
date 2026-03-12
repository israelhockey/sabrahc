import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Vision", href: "#vision" },
  { label: "Identity", href: "#identity" },
  { label: "Season", href: "#season" },
  { label: "Membership", href: "#membership" },
  { label: "Giveaway", href: "#giveaway" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/80 backdrop-blur-md border-b border-border/30">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-heading text-xl font-bold tracking-wider text-foreground">
          JERUSALEM <span className="text-primary">HC</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#membership" className="px-5 py-2 text-sm font-semibold rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
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
            className="md:hidden bg-navy-dark/95 backdrop-blur-md border-b border-border/30 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                  {l.label}
                </a>
              ))}
              <a href="#membership" onClick={() => setOpen(false)} className="px-5 py-3 text-sm font-semibold rounded bg-primary text-primary-foreground text-center">
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
