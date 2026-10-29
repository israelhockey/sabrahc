import { Link } from "react-router-dom";
import { Users, MapPinned, Share2, Check } from "lucide-react";
import SignupForm from "@/components/SignupForm";
import BgVideo from "@/components/BgVideo";
import { TourMap } from "@/components/tour";
import { partners, targetMarkets } from "@/data/club";

const reasons = [
  {
    icon: Users,
    title: "A community, not just a crowd",
    body: "We build every crowd with local synagogues, JCCs, schools and Hillels. Families come together, and they remember who made the night happen. That's trust you can't buy with an ad.",
  },
  {
    icon: MapPinned,
    title: "A new city every weekend",
    body: "The tour travels across North America to cities with big Jewish communities. One partnership puts your name in front of a new community, in person, weekend after weekend.",
  },
  {
    icon: Share2,
    title: "A story people share",
    body: "Israel's team on tour, bringing communities together, is a story people want to pass on. Every weekend comes with game streams, highlights and social posts with your brand in them.",
  },
];

const weekend = [
  { day: "Friday", title: "Shabbat with the team", body: "A Shabbat dinner or gathering with the players and the local community, when a host community organises one." },
  { day: "Saturday", title: "Community night", body: "Game one. Synagogues, JCCs and schools in the stands together. Your name on the night." },
  { day: "Sunday", title: "Kids & families", body: "Game two, with kids meeting the players after the game for photos and autographs." },
  { day: "All weekend", title: "Content & stream", body: "The games streamed, plus highlights and behind-the-scenes posts on the club's channels." },
];

const packages = [
  {
    name: "City Partner",
    who: "Local businesses, family foundations, community leaders",
    pitch: "Own one tour weekend in your city.",
    items: ['"Sabra HC in [city], presented by [you]" on every post, poster and stream', "Your logo on the stream and in-arena announcements at both games", "Tickets and a meet-the-players moment for your staff, clients or members", "Your name on the community night"],
    featured: true,
  },
  {
    name: "Tour Partner",
    who: "Brands with a national audience",
    pitch: "Travel with the team to every stop, all season.",
    items: ["Your brand on every weekend of the tour", "Presence in the season's content series and highlights", "Hospitality at the stop of your choice", "Founding-partner recognition as the club grows"],
  },
  {
    name: "Jersey & Helmet",
    who: "Limited placements",
    pitch: "Wear the lion with us.",
    items: ["Shoulder, sleeve or helmet placement on the team's uniforms", "Seen in every game, every photo and every stream", "Placements are limited and sold for the season"],
  },
  {
    name: "Official Supplier",
    who: "Hotels, food, travel, gear, print",
    pitch: "Partner with what you already do.",
    items: ['"Official ___ of Sabra HC" status', "In-kind or part in-kind", "Recognition on the stream, the website and social"],
  },
];

/** The sponsorship page: built to sell the tour to a potential partner. */
const Partners = () => (
  <>
    {/* the pitch */}
    <section aria-labelledby="partners-title" className="relative overflow-hidden bg-night-deep">
      <div aria-hidden="true" className="absolute inset-0">
        <BgVideo name="crowd" className="h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-deep via-night-deep/85 to-night-deep/50" />
      </div>
      <div className="container-site relative grid min-h-[600px] items-end gap-10 pb-16 pt-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:pb-20">
        <div>
          <p className="label text-sm text-sand">
            Partner with Sabra HC · <span lang="he">שותפים</span>
          </p>
          <h1 id="partners-title" className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl">
            One team. A new community <span className="text-sand">every weekend.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#D9E3DC]">
            Israel's team is touring North America this season, bringing Jewish communities together in city after city. Partner with us and your brand is at the
            heart of every one of those nights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#enquire" className="btn-primary">
              Get the partner pack
            </a>
            <a href="#packages" className="btn-ghost bg-night-deep/40 backdrop-blur">
              See the packages
            </a>
          </div>
        </div>
        <dl className="tabular grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line">
          {[
            [String(targetMarkets.length), "Cities on our tour list"],
            ["2", "Games every weekend series"],
            ["3", "Seasons of touring behind us"],
            [String(partners.length), "Partners already on board"],
          ].map(([v, k]) => (
            <div key={k} className="bg-night-deep/90 p-5 backdrop-blur">
              <dd className="font-display text-4xl font-black text-sand sm:text-5xl">{v}</dd>
              <dt className="mt-1 text-sm text-[#D9E3DC]">{k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* why it works */}
    <section className="bg-ice-white py-20 text-night lg:py-24" aria-labelledby="why-title">
      <div className="container-site">
        <p className="label text-xs text-sand-dark">Why it works</p>
        <h2 id="why-title" className="mt-2 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          Your brand where the community gathers
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded border border-[#D9C9A4] bg-[#D9C9A4] md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[#FBF6EA] p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-night text-sand">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-black uppercase leading-tight">{title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[#3E4F44]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* where your brand goes */}
    <section className="bg-night py-20 lg:py-24" aria-labelledby="map-title">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center">
        <div>
          <p className="label text-xs text-sand">Where your brand goes</p>
          <h2 id="map-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
            Coast to coast
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#D9E3DC]">
            We play weekend series in cities with big Jewish communities, from New York and Toronto to Los Angeles, Florida and Texas. Weekend one was in
            Mansfield, Texas. New stops are announced as they're booked, and a City Partner can help decide where we go next.
          </p>
        </div>
        <div className="overflow-hidden rounded border border-line">
          <TourMap />
        </div>
      </div>
    </section>

    {/* a partner's weekend */}
    <section className="border-t border-line bg-night-deep py-20 lg:py-24" aria-labelledby="weekend-title">
      <div className="container-site">
        <p className="label text-xs text-sand">What a tour weekend looks like</p>
        <h2 id="weekend-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          Three days. One community.
        </h2>
        <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {weekend.map((w, i) => (
            <li key={w.day} className="relative rounded border border-line bg-night p-6">
              <p className="tabular font-display text-5xl font-black leading-none text-sand/30">0{i + 1}</p>
              <p className="label mt-3 text-xs text-sand">{w.day}</p>
              <h3 className="mt-1 font-display text-xl font-black uppercase">{w.title}</h3>
              <p className="mt-2 text-[#D9E3DC]">{w.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* packages */}
    <section id="packages" className="scroll-mt-28 bg-night py-20 lg:py-24" aria-labelledby="packages-title">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-xs text-sand">Ways to partner</p>
            <h2 id="packages-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
              Pick your weekend, or the whole tour
            </h2>
          </div>
          <p className="max-w-sm text-muted-text">Every package can be shaped around what you want to achieve. Ask for the partner pack for details and pricing.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <div key={p.name} className={`flex flex-col rounded border p-6 ${p.featured ? "border-sand bg-sand text-night" : "border-line bg-night-2"}`}>
              {p.featured && <span className="label mb-3 self-start rounded bg-night px-2 py-1 text-[10px] text-sand">Start here</span>}
              <h3 className="font-display text-2xl font-black uppercase leading-tight">{p.name}</h3>
              <p className={`label mt-1 text-[11px] ${p.featured ? "text-night/70" : "text-muted-text"}`}>{p.who}</p>
              <p className={`mt-4 text-lg font-semibold ${p.featured ? "" : "text-ice-white"}`}>{p.pitch}</p>
              <ul className="mt-4 space-y-2.5">
                {p.items.map((it) => (
                  <li key={it} className={`flex gap-2.5 text-sm ${p.featured ? "" : "text-[#D9E3DC]"}`}>
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "" : "text-sand"}`} aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
              <a href="#enquire" className={`mt-auto pt-6 text-sm font-bold ${p.featured ? "underline" : "text-sand hover:text-sand-soft"}`}>
                Ask about {p.name} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* in good company */}
    <section className="bg-ice-white py-16 text-night" aria-labelledby="current-title">
      <div className="container-site">
        <p className="label text-xs text-sand-dark">In good company</p>
        <h2 id="current-title" className="mt-2 font-display text-3xl font-black uppercase sm:text-4xl">
          Our partners
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <li key={p.name} className="flex min-h-[130px] flex-col items-center justify-center gap-2 rounded border border-[#D9C9A4] bg-white p-4 text-center">
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="h-12 w-auto object-contain" />
              ) : (
                <span className="font-display text-base font-black uppercase leading-tight">{p.name}</span>
              )}
              <span className="label text-[10px] text-sand-dark">{p.tier}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* enquiry */}
    <section id="enquire" className="scroll-mt-28 bg-night py-20 lg:py-24" aria-labelledby="enquire-title">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="label text-xs text-sand">
            Let's talk · <span lang="he">בואו נדבר</span>
          </p>
          <h2 id="enquire-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
            Get the partner pack
          </h2>
          <p className="mt-4 max-w-md text-lg text-[#D9E3DC]">Tell us who you are and we'll send the packages and pricing, and set up a call.</p>
          <p className="mt-6 text-sm text-muted-text">
            Want us to play in your city instead?{" "}
            <Link to="/host" className="text-sand hover:text-sand-soft">
              Bring us to your city →
            </Link>
          </p>
        </div>
        <div className="rounded border-2 border-sand bg-night-2 p-6 sm:p-8">
          <SignupForm
            source="partner"
            idPrefix="partner"
            details={{ form: "Partner pack" }}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "company", label: "Company", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              {
                name: "interest",
                label: "Most interested in",
                type: "select",
                options: ["City Partner (one tour weekend)", "Tour Partner (whole season)", "Jersey & helmet", "Official Supplier", "Not sure yet"],
                full: true,
              },
            ]}
            submitLabel="Send me the partner pack"
            successTitle="Thanks, we'll be in touch"
            successBody="We'll send the partner pack and reach out to set up a call."
          />
        </div>
      </div>
    </section>
  </>
);

export default Partners;
