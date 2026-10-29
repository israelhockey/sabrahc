import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import type { Game } from "@/data/club";
import { finalGames, nextGame } from "@/lib/games";

type NavItem = { to: string; label: string; he: string };

const left: NavItem[] = [
  { to: "/season", label: "Tour", he: "הסיור" },
  { to: "/schedule", label: "Games", he: "משחקים" },
  { to: "/team", label: "Team", he: "הקבוצה" },
];
const right: NavItem[] = [
  { to: "/news", label: "News", he: "חדשות" },
  { to: "/tickets", label: "Tickets", he: "כרטיסים" },
  { to: "/club", label: "Club", he: "המועדון" },
];
const extra: NavItem[] = [
  { to: "/pride", label: "Join the Pride", he: "הצטרפו לגאווה" },
  { to: "/partners", label: "Partners", he: "שותפים" },
  { to: "/invest", label: "Ownership", he: "בעלות" },
  { to: "/contact", label: "Contact", he: "צור קשר" },
];

/** "SAT 24.10", in the rink's own time zone. */
export const stripDate = (g: Game) => {
  const parts = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "2-digit", timeZone: g.tz }).formatToParts(new Date(g.date));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday").toUpperCase()} ${get("day")}.${get("month")}`;
};

const shortName = (name: string) => name.split(" ")[0];

/** The results strip across the top of every page. */
const GameStrip = () => {
  const results = finalGames().slice(0, 3).reverse();
  const next = nextGame();
  return (
    <div className="border-b border-line bg-night-deep text-[13px]">
      <div className="container-site flex items-center gap-x-6 gap-y-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <span className="flex-none font-bold text-sand">
          TOUR GAMES <span lang="he">· משחקים</span>
        </span>
        {results.map((g) => (
          <Link key={g.id} to={`/games/${g.id}`} className="flex-none whitespace-nowrap text-ice-white hover:text-sand">
            {stripDate(g)} · Sabra <b className="tabular">{g.sabraScore}–{g.opponentScore}</b> {shortName(g.opponent)}
          </Link>
        ))}
        <Link
          to={next ? `/games/${next.id}` : "/season"}
          className="ml-auto flex-none whitespace-nowrap rounded-full bg-sand px-3 py-0.5 font-bold text-night hover:bg-sand-soft"
        >
          {next ? `NEXT · ${stripDate(next)} · ${next.opponent}` : "NEXT STOP · BEING BOOKED"}
        </Link>
      </div>
    </div>
  );
};

const NavItemLink = ({ item }: { item: NavItem }) => (
  <NavLink to={item.to} className={({ isActive }) => `group flex flex-col leading-tight ${isActive ? "text-sand" : "text-ice-white"}`}>
    <span className="font-bold group-hover:text-sand">{item.label}</span>
    <span lang="he" className="text-xs text-muted-text">
      {item.he}
    </span>
  </NavLink>
);

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
      <GameStrip />
      <header className="sticky top-0 z-50 border-b border-line bg-night/95 backdrop-blur">
        <nav className="container-site grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[88px]" aria-label="Main">
          <ul className="hidden items-center gap-7 lg:flex">
            {left.map((l) => (
              <li key={l.to}>
                <NavItemLink item={l} />
              </li>
            ))}
          </ul>
          <Link to="/" className="col-start-1 row-start-1 flex items-center gap-3 justify-self-start lg:col-start-2 lg:justify-self-center" aria-label="Sabra HC home">
            <img src={crest} alt="" className="h-12 w-12 object-contain lg:h-[72px] lg:w-[72px]" />
            <span className="font-display text-lg font-black uppercase tracking-tight lg:hidden">Sabra HC</span>
          </Link>
          <div className="col-start-3 row-start-1 flex items-center justify-end gap-7">
            <ul className="hidden items-center gap-7 lg:flex">
              {right.map((l) => (
                <li key={l.to}>
                  <NavItemLink item={l} />
                </li>
              ))}
            </ul>
            <Link to="/pride" className="btn-primary hidden min-h-[46px] px-5 sm:inline-flex">
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
          </div>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-night lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="container-site flex h-[72px] flex-none items-center justify-between border-b border-line">
            <Link to="/" className="flex items-center gap-3" aria-label="Sabra HC home" onClick={() => setOpen(false)}>
              <img src={crest} alt="" className="h-12 w-12 object-contain" />
              <span className="font-display text-lg font-black uppercase tracking-tight">Sabra HC</span>
            </Link>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center text-ice-white hover:text-sand" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-7 w-7" />
            </button>
          </div>
          <ul className="container-site flex flex-1 flex-col overflow-y-auto py-3">
            {[...left, ...right, ...extra].map((l) => (
              <li key={l.to} className="border-b border-line">
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `flex items-baseline justify-between gap-4 py-3.5 ${isActive ? "text-sand" : "text-ice-white"}`}
                >
                  <span className="font-display text-2xl font-black uppercase">{l.label}</span>
                  <span lang="he" className="text-lg font-bold text-muted-text">
                    {l.he}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="container-site flex-none pb-8 pt-2">
            <Link to="/pride" onClick={() => setOpen(false)} className="btn-primary w-full">
              Join the Pride
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteNavbar;
