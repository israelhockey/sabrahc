import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { club, partners } from "@/data/club";
import NewsletterSignup from "./NewsletterSignup";

const cols = [
  { title: "Club", links: [["/team", "Team"], ["/season", "Founding Season"], ["/news", "News"], ["/club", "The Club"]] },
  { title: "Fans", links: [["/schedule", "Schedule"], ["/tickets", "Tickets"], ["/pride", "Join the Pride"], ["/contact#tryouts", "Try-outs"]] },
  { title: "Business", links: [["/partners", "Partners"], ["/invest", "Ownership & Investment"], ["/contact", "Contact"]] },
];

const PartnerWall = () => (
  <section className="bg-ice-white py-14 text-night" aria-labelledby="partners-wall">
    <div className="container-site">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="partners-wall" className="text-4xl font-black">Partners</h2>
        <Link to="/partners" className="border-b-[3px] border-sand pb-1 font-cond text-lg font-extrabold uppercase tracking-[0.1em] text-night hover:text-sand-dark">
          Become a partner
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <li key={p.name} className="flex h-32 flex-col items-center justify-center gap-1.5 border-2 border-night bg-white">
            {p.logo ? <img src={p.logo} alt={p.name} className="h-16 w-auto object-contain" /> : <span className="font-display text-2xl font-black">{p.name}</span>}
            <span className="label text-[11px] text-sand-dark">{p.tier}</span>
          </li>
        ))}
        {Array.from({ length: Math.max(0, 6 - partners.length) }).map((_, i) => (
          <li key={i}>
            <Link to="/partners" className="flex h-32 items-center justify-center border-2 border-dashed border-[#C5D0DB] bg-white text-center font-cond text-base font-extrabold uppercase tracking-[0.12em] text-[#5B6B85] hover:border-sand-dark hover:text-night">
              Your brand here
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const SiteFooter = () => (
  <>
    <PartnerWall />
    <NewsletterSignup />
    <footer className="border-t-4 border-sand bg-night-deep">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <img src={crest} alt="Sabra HC" className="h-24 w-24 object-contain" />
          <p className="mt-3 font-display text-2xl font-black uppercase leading-none text-sand">
            Born in the desert.
            <br />
            <span className="text-ice">Built for the ice.</span>
          </p>
          <a href={`mailto:${club.email}`} className="mt-4 inline-block text-ice-white hover:text-sand">
            {club.email}
          </a>
          {club.socials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-4">
              {club.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="label text-sm text-muted-text hover:text-sand">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="label mb-3 text-sm text-muted-text">{c.title}</h2>
            <ul>
              {c.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="block py-1.5 text-ice-white hover:text-sand">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-1 py-6 text-sm text-muted-text sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Sabra HC LLC</p>
          <p>Competing in the {club.league}</p>
        </div>
      </div>
    </footer>
  </>
);

export default SiteFooter;
