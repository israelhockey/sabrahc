import { Link, useLocation } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { club, partners } from "@/data/club";
import NewsletterSignup from "./NewsletterSignup";

const cols = [
  { title: "Club", he: "המועדון", links: [["/team", "Team"], ["/season", "The Tour"], ["/news", "News"], ["/club", "The Club"]] },
  { title: "Fans", he: "אוהדים", links: [["/schedule", "Games"], ["/stats", "Stats"], ["/tickets", "Tickets"], ["/pride", "Join the Pride"], ["/host", "Bring us to your city"], ["/contact#tryouts", "Try-outs"]] },
  { title: "Business", he: "עסקים", links: [["/partners", "Partners"], ["/invest", "Ownership & Investment"], ["/contact", "Contact"]] },
];

const PartnerWall = () => (
  <section className="border-t border-line bg-night-deep py-16" aria-labelledby="partners-wall">
    <div className="container-site">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label text-xs text-sand">
            With thanks to · <span lang="he">תודה</span>
          </p>
          <h2 id="partners-wall" className="mt-1 text-3xl font-black sm:text-4xl">
            Our partners
          </h2>
        </div>
        <Link to="/partners" className="btn-ghost min-h-[44px] px-5">
          Become a partner
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <li key={p.name} className="flex min-h-[128px] flex-col items-center justify-center gap-2 rounded border border-line bg-night px-3 py-4 text-center">
            {p.logo ? (
              <span className="flex h-14 items-center justify-center rounded bg-ice-white px-3">
                <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain" />
              </span>
            ) : (
              <span className="font-display text-base font-black uppercase leading-tight">{p.name}</span>
            )}
            <span className="label text-[10px] text-sand">{p.tier}</span>
          </li>
        ))}
        {Array.from({ length: Math.max(0, 6 - partners.length) }).map((_, i) => (
          <li key={i}>
            <Link to="/partners#packages" className="flex min-h-[128px] items-center justify-center rounded border-2 border-dashed border-line text-center text-sm font-bold uppercase tracking-[0.12em] text-muted-text hover:border-sand hover:text-sand">
              Your brand here
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const SiteFooter = () => {
  const { pathname } = useLocation();
  return (
  <>
    {pathname !== "/partners" && <PartnerWall />}
    <NewsletterSignup />
    <div aria-hidden="true" className="scarf h-7" />
    <footer className="bg-night-deep">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <img src={crest} alt="Sabra HC" className="h-24 w-24 object-contain" />
          <p className="mt-4 font-display text-xl font-black uppercase leading-tight">
            Born in the desert.
            <br />
            <span className="text-sand">Built for the ice.</span>
          </p>
          <p lang="he" dir="rtl" className="mt-2 text-left text-xl font-black text-muted-text">
            נולדנו במדבר. נבנינו לקרח.
          </p>
          <p className="mt-3 max-w-xs text-sm text-[#D9E3DC]">Israel's hockey club, bringing Jewish communities together at every stop.</p>
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
            <h2 className="mb-3 flex items-baseline gap-2 font-body text-sm font-bold tracking-[0.14em] text-sand">
              {c.title} <span lang="he" className="text-xs text-muted-text">{c.he}</span>
            </h2>
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
          <p>
            {club.seasonName} · {club.league}
          </p>
        </div>
      </div>
    </footer>
  </>
  );
};

export default SiteFooter;
