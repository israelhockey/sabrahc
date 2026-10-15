import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import ContourField from "./ContourField";
import { club, games, arenas } from "@/data/club";
import { formatGameDate } from "@/lib/games";

const links = [
  { to: "/team", label: "Team" },
  { to: "/schedule", label: "Schedule" },
  { to: "/tickets", label: "Tickets" },
  { to: "/news", label: "News" },
  { to: "/club", label: "The Club" },
  { to: "/partners", label: "Partners" },
];

const Ticker = () => {
  const next = games
    .filter((g) => g.status === "scheduled" && new Date(g.date) > new Date())
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  if (next) {
    const arena = arenas.find((a) => a.id === next.arenaId);
    return (
      <Link to={`/games/${next.id}`} className="block bg-sand text-night">
        <div className="container-site flex min-h-[36px] items-center justify-center gap-2 py-1.5 text-center text-xs font-bold uppercase tracking-[0.14em] sm:text-sm">
          <span>Next: Sabra HC vs {next.opponent}</span>
          <span className="hidden sm:inline">· {formatGameDate(next.date)}</span>
          {arena && <span className="hidden md:inline">· {arena.name}</span>}
          <span className="inline-flex items-center gap-1">· Tickets <ArrowRight className="h-3.5 w-3.5" /></span>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/pride" className="block bg-sand text-night">
      <div className="container-site flex min-h-[36px] items-center justify-center gap-2 py-1.5 text-center text-xs font-bold uppercase tracking-[0.14em] sm:text-sm">
        <span>{club.season} season</span>
        <span className="hidden sm:inline">· Schedule coming soon</span>
        <span className="inline-flex items-center gap-1">· Join the Pride <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  );
};

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overHero;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Ticker />
      <div
        className={`transition-colors duration-300 ${
          solid ? "border-b border-line bg-night/95 backdrop-blur" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-site flex h-16 items-center justify-between gap-4 lg:h-20" aria-label="Main">
          <Link to="/" className="flex items-center gap-3" aria-label="Sabra HC home">
            <img src={crest} alt="" className="h-11 w-11 object-contain lg:h-14 lg:w-14" />
            <span className="font-display text-2xl font-black uppercase tracking-wide text-ice-white lg:text-[28px]">
              Sabra <span className="text-sand">HC</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `font-display text-lg font-bold uppercase tracking-wide transition-colors ${
                      isActive ? "text-sand" : "text-ice-white hover:text-sand"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/pride" className="btn-primary hidden min-h-[44px] px-5 text-base sm:inline-flex">
              Join the Pride
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ice-white hover:text-sand lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 top-[100px] z-40 overflow-y-auto bg-night lg:hidden">
          <ContourField variant="transition" opacity={0.7} />
          <ul className="container-site relative flex flex-col gap-1 py-8">
            {[...links, { to: "/pride", label: "Join the Pride" }, { to: "/contact", label: "Contact" }].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `block py-2 font-display text-5xl font-black uppercase ${isActive ? "text-sand" : "text-ice-white"}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default SiteNavbar;
