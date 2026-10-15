import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { club } from "@/data/club";
import NewsletterSignup from "./NewsletterSignup";

const cols = [
  {
    title: "Club",
    links: [
      { to: "/club", label: "The Club" },
      { to: "/team", label: "Team" },
      { to: "/news", label: "News" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Fans",
    links: [
      { to: "/schedule", label: "Schedule" },
      { to: "/tickets", label: "Tickets" },
      { to: "/pride", label: "Join the Pride" },
      { to: "/contact#tryouts", label: "Try-outs" },
    ],
  },
  {
    title: "Business",
    links: [
      { to: "/partners", label: "Partners" },
      { to: "/invest", label: "Ownership & Investment" },
    ],
  },
];

const SiteFooter = () => (
  <footer className="border-t border-line bg-night">
    <NewsletterSignup />
    <div className="container-site grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Sabra HC home">
          <img src={crest} alt="" className="h-16 w-16 object-contain" />
          <span className="font-display text-3xl font-black uppercase text-ice-white">
            Sabra <span className="text-sand">HC</span>
          </span>
        </Link>
        <p className="font-display text-xl font-bold uppercase text-sand">{club.tagline}</p>
        <a href={`mailto:${club.email}`} className="text-ice hover:text-sand">
          {club.email}
        </a>
        {club.socials.length > 0 && (
          <ul className="flex flex-wrap gap-4">
            {club.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-muted-text hover:text-sand">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cols.map((c) => (
        <div key={c.title}>
          <h2 className="mb-4 font-body text-sm font-bold uppercase tracking-[0.2em] text-muted-text">{c.title}</h2>
          <ul className="flex flex-col gap-2.5">
            {c.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ice-white hover:text-sand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-line">
      <div className="container-site flex flex-col gap-2 py-6 text-sm text-muted-text sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Sabra HC LLC. All rights reserved.</p>
        <p>Sabra HC competes in the {club.league}.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
