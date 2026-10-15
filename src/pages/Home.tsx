import { Link } from "react-router-dom";
import { club, arenas } from "@/data/club";
import { sortedArticles, formatDate } from "@/data/news";
import { Countdown, PlayIcon, SectionTitle } from "@/components/broadcast";
import RinkFeed from "@/components/RinkFeed";
import { FirstsBoard, GameCentre, EpisodeRow, LineupSection, HomeIceEverywhere, UniformAndPride } from "@/components/sections";
import { formatGameDate, formatGameTime } from "@/lib/games";

const channels = [
  { to: "/season", label: "Founding Season", live: true },
  { to: "/team", label: "The Lineup" },
  { to: "/schedule", label: "Schedule" },
  { to: "/pride", label: "Join the Pride" },
  { to: "/club", label: "Road to Europe" },
];

const Hero = () => {
  const arena = arenas.find((a) => a.id === club.openerArenaId);
  const firstEp = "/season";
  return (
    <section aria-labelledby="hero-title" className="bg-night-deep">
      <div className="relative overflow-hidden border-b border-line bg-[#EAF1F6] lg:bg-[#0A1426]">
        <RinkFeed className="absolute inset-0 hidden h-full w-full lg:block" />
        <div className="relative h-[250px] sm:h-[360px] lg:hidden">
          <RinkFeed view="610 175 780 500" className="absolute inset-0 h-full w-full" />
        </div>
        {/* soft wash so the headline reads on the ice */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white/75 via-white/25 to-transparent lg:block" />
        {/* broadcast frame */}
        <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 z-[2] h-7 w-7 border-l-[3px] border-t-[3px] border-night" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 z-[2] hidden h-7 w-7 border-b-[3px] border-r-[3px] border-night lg:block" />
        <div className="absolute left-10 right-10 top-7 z-[2] flex items-center justify-between gap-3">
          <span className="label border border-night/20 bg-white/90 px-2.5 py-1 text-[11px] text-night">CAM 9 · Overhead<span className="hidden sm:inline"> · Centre ice</span></span>
          <span className="tag-live !flex items-center gap-2">
            <span className="animate-rec h-2 w-2 rounded-full bg-ice-white" aria-hidden="true" /> Pre-game
          </span>
        </div>

        <div className="container-site relative z-[3] grid items-end gap-8 pb-10 pt-8 lg:min-h-[740px] lg:gap-10 lg:pt-28 lg:grid-cols-[1.35fr_1fr] lg:pb-14">
          <div>
            <span className="tag-dark animate-rise">The Founding Season · {club.season}</span>
            <h1 id="hero-title" className="mt-3 font-display text-[64px] font-black uppercase leading-[0.84] text-night animate-rise sm:text-[110px] lg:text-[136px]">
              History
              <br />
              starts at
              <br />
              <span className="mt-2 inline-block whitespace-nowrap bg-night px-3 pb-1 text-sand sm:px-4">Game 001</span>
            </h1>
            <div className="mt-5 max-w-xl border-l-[6px] border-sand bg-white/95 px-5 py-3 text-lg text-[#2B3A55] shadow-[0_10px_30px_-18px_rgba(6,13,26,0.6)] animate-rise">
              Sabra HC is Israel's newest hockey club. The ice is ready, the puck is on the dot, and every first is still to come. Follow it from the very first faceoff.
            </div>
          </div>

          <div className="panel animate-rise shadow-[0_24px_60px_-24px_rgba(6,13,26,0.8)]">
            <div className="panel-head">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-live animate-rec" aria-hidden="true" /> Faceoff · Game 001
              </span>
              <span className="text-ice">{club.leagueShort}</span>
            </div>
            <Countdown />
            <div className="border-t border-line px-4 py-3">
              <p className="label text-base text-ice-white">
                {club.openerDate ? `${formatGameDate(club.openerDate)} · ${formatGameTime(club.openerDate)}` : "Date announced soon"}
              </p>
              {arena && (
                <p className="text-sm text-muted-text">
                  {arena.name} · {arena.city}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-px bg-line">
              <Link to="/tickets" className="btn-primary justify-center whitespace-nowrap px-3 text-base sm:text-lg">
                Ticket alerts
              </Link>
              <Link to={firstEp} className="btn-dark justify-center gap-2 whitespace-nowrap px-3 text-base sm:text-lg">
                <PlayIcon size={22} /> Watch EP 01
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Channels" className="border-b border-line bg-night">
        <ul className="container-site flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {channels.map((c, i) => (
            <li key={c.to} className="flex-none">
              <Link
                to={c.to}
                className={`relative flex items-center gap-2.5 px-4 py-4 font-cond text-base font-bold uppercase tracking-[0.08em] hover:text-sand ${
                  i === 0 ? "text-ice-white" : "text-muted-text"
                }`}
              >
                <span className="tabular text-xs text-muted-text">CH {String(i + 1).padStart(2, "0")}</span>
                {c.label}
                {c.live && <span className="tag-live !px-2 !py-0.5 text-[10px]">New</span>}
                {i === 0 && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-sand" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

const NewsSection = () => {
  const [lead, ...rest] = sortedArticles;
  if (!lead) return null;
  return (
    <section aria-labelledby="news-title" className="bg-night py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="news-title"
          tag="Latest"
          title="Club news"
          action={
            <Link to="/news" className="border-b-[3px] border-sand pb-1 font-cond text-lg font-extrabold uppercase tracking-[0.1em] hover:text-sand">
              All news
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Link to={`/news/${lead.slug}`} className="lift group relative block min-h-[420px] overflow-hidden border border-line bg-night-2">
            <img src={lead.image} alt="" className={`absolute inset-0 h-full w-full ${lead.imageFit === "contain" ? "object-contain p-10" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`} />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="tag-sand">{lead.category}</span>
              <h3 className="mt-2 max-w-2xl font-display text-4xl font-black uppercase leading-[0.92] sm:text-5xl">{lead.title}</h3>
              <p className="label mt-3 text-sm text-ice">{formatDate(lead.date)}</p>
            </div>
          </Link>
          <ul className="grid gap-4">
            {rest.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <Link to={`/news/${a.slug}`} className="lift group grid h-full grid-cols-[120px_1fr] border border-line bg-night-2 sm:grid-cols-[160px_1fr]">
                  <div className="relative overflow-hidden bg-night">
                    <img src={a.image} alt="" className={`absolute inset-0 h-full w-full ${a.imageFit === "contain" ? "object-contain p-4" : "object-cover"}`} />
                  </div>
                  <div className="p-4">
                    <p className="label text-xs text-sand">
                      {a.category} · {formatDate(a.date)}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-black uppercase leading-[0.95] group-hover:text-sand">{a.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
            {rest.length === 0 && (
              <li className="flex items-center border border-dashed border-line p-6 text-muted-text">More stories from the founding season coming soon.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <FirstsBoard />
    <GameCentre />
    <NewsSection />
    <EpisodeRow />
    <LineupSection />
    <HomeIceEverywhere />
    <UniformAndPride />
  </>
);

export default Home;
