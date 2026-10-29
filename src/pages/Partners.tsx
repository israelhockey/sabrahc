import { Shirt, LayoutPanelTop, Trophy, Smartphone, HeartHandshake, Wine } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SignupForm from "@/components/SignupForm";
import { partners } from "@/data/club";

const why = [
  ["Israel's flagship club", "Be part of the club building Israeli hockey's future, from this season's tour to the Israeli league and Europe."],
  ["Your local community", "Every tour stop is a community event in a city with a big Jewish community. Your brand is front and centre when we're in town."],
  ["A global audience", "Reach Israeli fans, the worldwide Jewish community and the hockey world through streams and our tour series."],
  ["A brand at the start", "Partners who join now grow with the club and are remembered as founders."],
];

const offers = [
  { icon: Shirt, title: "Jersey & helmet", body: "Front, shoulder and helmet placements on the team's uniforms." },
  { icon: LayoutPanelTop, title: "Present a tour stop", body: "\"Sabra HC in your city, presented by…\" for a full weekend series." },
  { icon: Trophy, title: "Game-night naming", body: "Present a single game, or a European visit next season." },
  { icon: Smartphone, title: "Digital & social", body: "Content series, highlights and stream branding." },
  { icon: HeartHandshake, title: "Community", body: "Youth hockey and learn-to-skate programs." },
  { icon: Wine, title: "Hospitality", body: "Host clients and teams at game nights." },
];

const Partners = () => (
  <>
    <PageHero he="שותפים" eyebrow="Partnerships" title="Partner with Israel's club" intro="Back Israel's flagship team as it tours North America this season, in your city or across the whole tour." />

    <section className="bg-ice-white py-20" aria-labelledby="current-title">
      <div className="container-site">
        <SectionHeading id="current-title" tone="light" eyebrow="Our partners" title="In it from the start" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name} className="flex flex-col items-center gap-4 rounded-lg border border-[#D9C9A4] bg-white p-8 text-center">
              {p.logo && <img src={p.logo} alt={p.name} className="h-24 w-auto object-contain" />}
              <div>
                <p className="font-display text-xl font-black uppercase text-night">{p.name}</p>
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
              <h3 className="text-2xl font-black text-ice-white">{t}</h3>
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
              <h3 className="mt-4 text-2xl font-black text-ice-white">{o.title}</h3>
              <p className="mt-2 text-muted-text">{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="city-partner" className="scroll-mt-28 bg-sand py-20 text-night" aria-labelledby="city-title">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="tag-dark">New this season</span>
          <h2 id="city-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.88] sm:text-5xl">
            Become a city partner
          </h2>
          <p className="mt-4 max-w-md text-lg font-medium">
            When Sabra HC comes to your city, the weekend is yours. It works for a local business, a family foundation or a community group that wants to
            bring Israel's team to town.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["Naming", "\"Sabra HC in [your city], presented by [you]\" on every post, poster and stream that weekend."],
            ["On the ice", "Your logo on the stream and in-arena announcements at both games."],
            ["Your people", "Tickets and a meet-and-greet with the players for your staff, clients or members."],
            ["Community", "Your name on the youth clinic or community event that weekend."],
          ].map(([t2, b]) => (
            <li key={t2} className="bg-night p-5 text-ice-white">
              <p className="font-display text-xl font-black uppercase text-sand">{t2}</p>
              <p className="mt-1 text-[#D9E3DC]">{b}</p>
            </li>
          ))}
          <li className="sm:col-span-2">
            <a href="#enquire-title" className="btn-dark">
              Ask about your city
            </a>
          </li>
        </ul>
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
              options: ["City partner (a tour weekend)", "Jersey & helmet", "Game-night naming", "Whole tour", "European visit (next season)", "Digital & social", "Community", "Not sure yet"],
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
