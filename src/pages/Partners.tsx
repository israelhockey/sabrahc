import { Shirt, LayoutPanelTop, Trophy, Smartphone, HeartHandshake, Wine } from "lucide-react";
import PageHero from "@/components/PageHero";
import { PartnerArt } from "@/components/motion";
import SectionHeading from "@/components/SectionHeading";
import SignupForm from "@/components/SignupForm";
import { partners } from "@/data/club";

const why = [
  ["Israel's flagship club", "Be part of the club building professional-level hockey in Israel from day one."],
  ["A global audience", "Reach Israeli fans, the worldwide Jewish community and the international hockey world."],
  ["Historic firsts", "Put your name on the first European pro games ever played in Israel."],
  ["A brand at the start", "Partners who join now grow with the club and are remembered as founders."],
];

const offers = [
  { icon: Shirt, title: "Jersey & helmet", body: "Front, shoulder and helmet placements on the team's uniforms." },
  { icon: LayoutPanelTop, title: "Rink boards", body: "Board and ice branding at home games." },
  { icon: Trophy, title: "Game-night naming", body: "Present a game, a series or a European visit." },
  { icon: Smartphone, title: "Digital & social", body: "Content series, highlights and stream branding." },
  { icon: HeartHandshake, title: "Community", body: "Youth hockey and learn-to-skate programs." },
  { icon: Wine, title: "Hospitality", body: "Host clients and teams at game nights." },
];

const Partners = () => (
  <>
    <PageHero cam="CAM 5 · Ribbon board" status="Now booking" tone="sand" art={<PartnerArt />} eyebrow="Partnerships" title="Partner with Israel's club" intro="Grow with a club at the start of its story, and a sport on the rise in Israel." />

    <section className="bg-ice-white py-20" aria-labelledby="current-title">
      <div className="container-site">
        <SectionHeading id="current-title" tone="light" eyebrow="Our partners" title="In it from the start" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name} className="flex flex-col items-center gap-4 rounded-lg border border-[#D5DEE6] bg-white p-8 text-center">
              {p.logo && <img src={p.logo} alt={p.name} className="h-24 w-auto object-contain" />}
              <div>
                <p className="font-display text-2xl font-black uppercase text-night">{p.name}</p>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand-dark">{p.tier}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-night py-20" aria-labelledby="why-title">
      <div className="container-site">
        <SectionHeading id="why-title" eyebrow="Why partner" title="Why Sabra HC" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, b]) => (
            <div key={t} className="border-t-4 border-sand pt-5">
              <h3 className="text-3xl font-black text-ice-white">{t}</h3>
              <p className="mt-2 text-muted-text">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-line bg-night-2 py-20" aria-labelledby="offer-title">
      <div className="container-site">
        <SectionHeading id="offer-title" eyebrow="What we offer" title="Ways to partner" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <div key={o.title} className="rounded-lg border border-line bg-night p-7">
              <o.icon className="h-9 w-9 text-sand" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-4 text-3xl font-black text-ice-white">{o.title}</h3>
              <p className="mt-2 text-muted-text">{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-night py-20" aria-labelledby="enquire-title">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading id="enquire-title" eyebrow="Let's talk" title="Partnership enquiry" intro="Tell us a little about your company and we'll come back with options that fit." />
        <SignupForm
          source="partner"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "company", label: "Company", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            {
              name: "interest",
              label: "Most interested in",
              type: "select",
              options: ["Jersey & helmet", "Rink boards", "Game-night naming", "European visit", "Digital & social", "Community", "Hospitality", "Not sure yet"],
              full: true,
            },
            { name: "message", label: "Message", type: "textarea" },
          ]}
          submitLabel="Send enquiry"
          successTitle="Thanks, we'll be in touch"
          successBody="Our partnerships team will reply within a few days."
        />
      </div>
    </section>
  </>
);

export default Partners;
