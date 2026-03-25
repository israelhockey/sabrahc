import { Link } from "react-router-dom";
import logoImg from "@/assets/sabra-logo.png";

const footerLinks: { title: string; links: { label: string; path: string; external?: boolean }[] }[] = [
  {
    title: "Team",
    links: [
      { label: "Roster", path: "/roster" },
      { label: "Schedule", path: "/schedule" },
      { label: "News", path: "/news" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Founders", path: "/founders" },
      { label: "Fan Zone", path: "/fans" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Media", path: "/media" },
      { label: "Contact", path: "/about" },
      { label: "info@sabrahc.com", path: "mailto:info@sabrahc.com", external: true },
    ],
  },
];

const SiteFooter = () => (
  <footer className="bg-card border-t border-border">
    {/* Gold accent line */}
    <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

    <div className="container py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={logoImg} alt="Sabra HC" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-display text-2xl tracking-wide text-foreground">SABRA HC</span>
              <p className="text-[10px] tracking-[0.25em] text-primary">ISRAEL'S PROFESSIONAL HOCKEY CLUB</p>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Sabra Hockey Club is the flagship professional ice hockey team in Israel, competing domestically and across Europe.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((group) => (
          <div key={group.title}>
            <h4 className="font-heading text-sm tracking-wider text-primary mb-4">{group.title}</h4>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-divider my-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Sabra Hockey Club. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/60">
          #BornInTheDesert
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
