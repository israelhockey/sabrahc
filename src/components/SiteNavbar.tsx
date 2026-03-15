import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/sabra-logo.png";

const NAV_ITEMS = [
  { label: "News", path: "/news" },
  {
    label: "Team",
    children: [
      { label: "Roster", path: "/roster" },
      { label: "Schedule", path: "/schedule" },
    ],
  },
  { label: "Fan Zone", path: "/fans" },
  { label: "Media", path: "/media" },
  { label: "About", path: "/about" },
  { label: "Founders", path: "/founders" },
  { label: "Deck", path: "/deck" },
];

const SiteNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(null);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-primary via-gold-light to-primary" />

      <nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-lg shadow-background/50"
            : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Sabra HC"
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl lg:text-2xl tracking-wide text-foreground">
                SABRA HC
              </span>
              <span className="text-[9px] tracking-[0.3em] text-primary font-medium hidden sm:block">
                EST. 2025 • ISRAEL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-heading tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${dropdownOpen === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-card border border-border rounded-sm shadow-xl min-w-[180px] overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-5 py-3 text-sm font-heading tracking-wider transition-colors ${
                              isActive(child.path)
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className={`px-4 py-2 text-sm font-heading tracking-wider transition-colors ${
                    isActive(item.path!)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/fans"
              className="ml-4 px-6 py-2 text-sm font-heading font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right"
            >
              GET TICKETS
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
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
              className="lg:hidden bg-card/98 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <div className="container py-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 text-base font-heading tracking-wider text-muted-foreground"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${dropdownOpen === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l-2 border-primary/30"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block py-2.5 text-sm font-heading tracking-wider ${
                                  isActive(child.path) ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.path!}
                      className={`py-3 text-base font-heading tracking-wider ${
                        isActive(item.path!) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <Link
                  to="/fans"
                  className="mt-4 py-3 text-center text-sm font-heading font-semibold tracking-wider bg-primary text-primary-foreground clip-angle-right"
                >
                  GET TICKETS
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default SiteNavbar;
