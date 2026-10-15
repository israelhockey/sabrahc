import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import { club } from "@/data/club";
import { upcomingGames } from "@/lib/games";
import { useCountdown } from "./broadcast";

const links = [
  { to: "/team", label: "Team" },
  { to: "/schedule", label: "Schedule" },
  { to: "/tickets", label: "Tickets" },
  { to: "/news", label: "News" },
  { to: "/season", label: "Founding Season", accent: true },
  { to: "/club", label: "Club" },
];

const Crawl = () => {
  const cd = useCountdown(club.openerDate);
  const next = upcomingGames()[0];
  const items = [
    cd ? `Game 001 · ${cd.days} days` : "Game 001 · date announced soon",
    `Season ${club.season} · The Founding Season`,
    "Try-outs are open",
    "Founding partner: RDP Sports Management",
    "Uniform reveal coming soon",
    "Join the Pride: founding memberships",
    ...(next ? [`Next: Sabra HC vs ${next.opponent}`] : []),
  ];
  const loop = [...items, ...items];
  return (
    <div className="flex h-[34px] overflow-hidden border-b border-line bg-night">
      <div className="para-r flex flex-none items-center bg-sand pl-4 pr-7 font-cond text-xs font-extrabold uppercase tracking-[0.12em] text-night sm:text-sm">
        Sabra HC · Next up
      </div>
      <div className="flex flex-1 items-center overflow-hidden" aria-label="Club headlines">
        <div className="animate-crawl flex w-max font-cond text-xs font-semibold uppercase tracking-[0.14em] text-[#C9D6E6] sm:text-sm">
          {loop.map((t, i) => (
            <span key={i} className="whitespace-nowrap px-5" aria-hidden={i >= items.length}>
              {t}
              <span className="pl-10 text-sand">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScoreBug = () => {
  const cd = useCountdown(club.openerDate);
  const next = upcomingGames()[0];
  return (
    <Link to={next ? `/games/${next.id}` : "/schedule"} className="hidden h-10 items-stretch font-cond font-bold uppercase xl:flex" aria-label="Next game">
      <span className="flex items-center bg-sand px-3 text-xs tracking-[0.1em] text-night">Game 001</span>
      <span className="flex items-center gap-2.5 border border-line bg-night-2 px-3.5 text-base tracking-[0.06em] text-ice-white">
        SHC <span className="text-xs text-muted-text">vs</span> {next ? next.opponent.slice(0, 3).toUpperCase() : "TBA"}
      </span>
      <span className="tabular flex items-center border border-l-0 border-line bg-night px-3 text-base text-ice">
        {cd ? `${cd.d}D ${cd.h}H` : "SOON"}
      </span>
    </Link>
  );
};

const SiteNavbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Crawl />
      <header className="sticky top-0 z-50 border-b border-line bg-night-deep/90 backdrop-blur">
        <nav className="container-site flex h-[68px] items-center gap-6 lg:h-[76px]" aria-label="Main">
          <Link to="/" className="flex items-center gap-3" aria-label="Sabra HC home">
            <img src={crest} alt="" className="h-11 w-11 object-contain lg:h-14 lg:w-14" />
            <span className="font-display text-2xl font-black uppercase lg:text-[30px]">
              Sabra <span className="text-sand">HC</span>
            </span>
          </Link>
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `font-cond text-lg font-bold uppercase tracking-[0.08em] transition-colors ${
                      isActive || l.accent ? "text-sand" : "text-ice-white hover:text-sand"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex-1" />
          <ScoreBug />
          <Link to="/pride" className="btn-primary hidden min-h-[44px] px-6 text-base sm:inline-flex">
            Join the Pride
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-ice-white hover:text-sand lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-line bg-night-deep lg:hidden">
            <ul className="container-site flex flex-col py-6">
              {[...links, { to: "/pride", label: "Join the Pride" }, { to: "/partners", label: "Partners" }, { to: "/contact", label: "Contact" }].map((l, i) => (
                <li key={l.to} className="border-b border-line">
                  <NavLink
                    to={l.to}
                    className={({ isActive }) => `flex items-baseline gap-4 py-3 font-display text-4xl font-black uppercase ${isActive ? "text-sand" : "text-ice-white"}`}
                  >
                    <span className="tabular w-8 text-lg text-muted-text">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default SiteNavbar;
