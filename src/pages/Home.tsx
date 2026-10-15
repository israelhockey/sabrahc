import { Link } from "react-router-dom";
import { ArrowRight, Home as HomeIcon, Sprout, Globe2 } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import ContourField from "@/components/ContourField";
import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";
import SignupForm from "@/components/SignupForm";
import { club, partners, players, roadToEurope } from "@/data/club";
import { sortedArticles, formatDate } from "@/data/news";
import { upcomingGames, finalGames } from "@/lib/games";

const Hero = () => (
  <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night pt-[100px]">
    <ContourField variant="transition" lines={28} />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,hsl(var(--sand)/0.12),transparent_60%)]" />
    <div className="container-site relative grid items-center gap-10 py-16 lg:grid-cols-[1.25fr_1fr]">
      <div className="order-2 lg:order-1">
        <p className="eyebrow animate-rise">Israel's flagship hockey club · Est. 2026</p>
        <h1 className="mt-4 font-display font-black uppercase leading-[0.82] text-ice-white animate-rise">
          <span className="block text-[26vw] sm:text-[20vw] lg:text-[13.5vw] xl:text-[200px]">Sabra</span>
        </h1>
        <p className="mt-4 font-display text-3xl font-black uppercase leading-none sm:text-4xl lg:text-5xl animate-rise">
          <span className="text-sand">Born in the desert.</span>
          <br />
          <span className="text-ice">Built for the ice.</span>
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-rise">
          <Link to="/schedule" className="btn-primary">
            {club.season} Schedule
          </Link>
          <Link to="/pride" className="btn-outline">
            Join the Pride
          </Link>
        </div>
      </div>
      <div className="order-1 flex justify-center lg:order-2">
        <img
          src={crest}
          alt="Sabra HC crest: a lion with a sabra cactus mane over crossed hockey sticks and a Star of David"
          className="w-[62vw] max-w-[520px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-rise sm:w-[44vw] lg:w-full"
        />
      </div>
    </div>
  </section>
);

const MatchStrip = () => {
  const next = upcomingGames()[0];
  const last = finalGames()[0];
  return (
    <section className="relative z-10 -mt-px border-y border-line bg-night-2" aria-labelledby="matches-title">
      <div className="container-site py-10">
        <h2 id="matches-title" className="sr-only">
          Games
        </h2>
        {next || last ? (
          <div className="grid gap-4">
            {next && <GameCard game={next} />}
            {last && <GameCard game={last} />}
          </div>
        ) : (
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">{club.season} season</p>
              <p className="mt-2 font-display text-4xl font-black uppercase text-ice-white sm:text-5xl">Schedule announced soon</p>
              <p className="mt-2 text-muted-text">
                {club.leagueShort} regular season plus the Sabra Series. Be first to know when games and tickets go live.
              </p>
            </div>
            <SignupForm
              source="tickets"
              idPrefix="notify"
              fields={[{ name: "email", label: "Email", type: "email", required: true, full: true }]}
              submitLabel="Notify me"
              successTitle="You'll hear first"
              successBody="We'll email you when the schedule and tickets are out."
            />
          </div>
        )}
      </div>
    </section>
  );
};

const RoadToEurope = () => (
  <section className="relative overflow-hidden bg-night py-24 lg:py-32" aria-labelledby="road-title">
    <ContourField variant="desert" opacity={0.8} />
    <div className="container-site relative">
      <SectionHeading
        id="road-title"
        eyebrow="Our plan"
        title="The road to Europe"
        intro="Every step has a gate: the thing that must be true before we take the next one."
        action={
          <Link to="/club#road-to-europe" className="btn-outline">
            Read the plan
          </Link>
        }
      />
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {roadToEurope.map((s, i) => (
          <li key={s.season} className="flex flex-col gap-3 border-t-[6px] pt-6" style={{ borderColor: i < 2 ? "hsl(var(--sand))" : "hsl(var(--ice))" }}>
            <p className={`tabular font-body text-sm font-bold uppercase tracking-[0.2em] ${i < 2 ? "text-sand" : "text-ice"}`}>{s.season}</p>
            <h3 className="text-4xl font-black text-ice-white">{s.title}</h3>
            <p className="text-muted-text">{s.body}</p>
            <p className="mt-auto rounded-md bg-night-2 px-4 py-3 text-sm text-ice-white">
              <span className="font-bold text-sand">Gate:</span> {s.gate}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const pillars = [
  {
    icon: HomeIcon,
    title: "A path home",
    body: "Jewish players from around the world can build a life in Israel through hockey.",
  },
  {
    icon: Sprout,
    title: "Built here",
    body: "A real club for Israel's best young players to aim for, without leaving the country.",
  },
  {
    icon: Globe2,
    title: "Israel on the map",
    body: "Bringing European pro hockey to Israeli ice, and Israeli hockey to Europe.",
  },
];

const WhySabra = () => (
  <section className="bg-ice-white py-24 lg:py-28" aria-labelledby="why-title">
    <div className="container-site">
      <SectionHeading id="why-title" tone="light" eyebrow="Why Sabra" title="More than a team" />
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-lg border border-[#D5DEE6] bg-white p-8">
            <p.icon className="h-10 w-10 text-sand-dark" strokeWidth={1.6} aria-hidden="true" />
            <h3 className="mt-5 text-4xl font-black text-night">{p.title}</h3>
            <p className="mt-3 text-lg text-[#3B4A63]">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LatestNews = () => {
  const [lead, ...rest] = sortedArticles;
  if (!lead) return null;
  return (
    <section className="bg-night py-24 lg:py-28" aria-labelledby="news-title">
      <div className="container-site">
        <SectionHeading
          id="news-title"
          eyebrow="Latest"
          title="News"
          action={
            <Link to="/news" className="btn-outline">
              All news
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Link to={`/news/${lead.slug}`} className="card-lift group overflow-hidden rounded-lg border border-line bg-night-2">
            <div className="aspect-[16/9] overflow-hidden bg-night">
              <img src={lead.image} alt="" className={`h-full w-full ${lead.imageFit === "contain" ? "object-contain p-8" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`} />
            </div>
            <div className="p-6">
              <p className="eyebrow">{lead.category} · {formatDate(lead.date)}</p>
              <h3 className="mt-2 text-4xl font-black text-ice-white">{lead.title}</h3>
              <p className="mt-2 text-muted-text">{lead.excerpt}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-6">
            {rest.slice(0, 3).map((a) => (
              <Link key={a.slug} to={`/news/${a.slug}`} className="card-lift group flex gap-4 rounded-lg border border-line bg-night-2 p-4">
                <img src={a.image} alt="" className={`h-24 w-32 shrink-0 rounded bg-night ${a.imageFit === "contain" ? "object-contain p-2" : "object-cover"}`} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">{a.category} · {formatDate(a.date)}</p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-ice-white">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamTeaser = () => (
  <section className="relative overflow-hidden border-y border-line bg-night-2 py-24" aria-labelledby="team-title">
    <ContourField variant="ice" />
    <div className="container-site relative">
      <SectionHeading
        id="team-title"
        eyebrow="The team"
        title={players.length ? "Meet the roster" : "Roster reveal coming soon"}
        intro={
          players.length
            ? undefined
            : "Israel's best available players, with a path in for Jewish players worldwide and Israel's top under-20 talent."
        }
        action={
          players.length ? (
            <Link to="/team" className="btn-outline">
              Full roster
            </Link>
          ) : (
            <Link to="/contact#tryouts" className="btn-primary">
              Try-outs <ArrowRight className="h-5 w-5" />
            </Link>
          )
        }
      />
    </div>
  </section>
);

const PartnersStrip = () => (
  <section className="bg-ice-white py-20" aria-labelledby="partners-title">
    <div className="container-site flex flex-col items-center gap-8 text-center">
      <p id="partners-title" className="eyebrow text-sand-dark">
        Our partners
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-10">
        {partners.map((p) => (
          <li key={p.name} className="flex flex-col items-center gap-2">
            {p.logo ? <img src={p.logo} alt={p.name} className="h-20 w-auto object-contain" /> : <span className="font-display text-3xl font-black uppercase text-night">{p.name}</span>}
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7A93]">{p.tier}</span>
          </li>
        ))}
      </ul>
      <Link to="/partners" className="font-display text-xl font-bold uppercase text-night underline decoration-sand decoration-4 underline-offset-8 hover:text-sand-dark">
        Become a partner
      </Link>
    </div>
  </section>
);

const PrideBanner = () => (
  <section className="relative overflow-hidden bg-sand py-24" aria-labelledby="pride-title">
    <div className="container-site relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 id="pride-title" className="text-6xl font-black leading-[0.88] text-night sm:text-7xl lg:text-8xl">
          The Pride
          <br />
          starts here
        </h2>
        <p className="mt-5 max-w-xl text-lg font-medium text-night/80">
          Become a founding supporter of Israel's flagship club and be part of every first: the first title, the first European game, the first season.
        </p>
      </div>
      <Link to="/pride" className="btn-dark">
        Join the Pride <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  </section>
);

const Home = () => (
  <>
    <Hero />
    <MatchStrip />
    <RoadToEurope />
    <WhySabra />
    <LatestNews />
    <TeamTeaser />
    <PartnersStrip />
    <PrideBanner />
  </>
);

export default Home;
