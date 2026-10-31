import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { playSilently } from "@/lib/autoplay";
import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { club, players } from "@/data/club";
import { sortedArticles, formatDate } from "@/data/news";
import { SectionTitle } from "@/components/broadcast";
import { OpponentMark } from "@/components/tour";
import { FirstsBoard, GameCentre, EpisodeRow, TourSection } from "@/components/sections";
import { nextGame, finalGames, gamePlace, gameTime, formatGameTime, skaterStats, goalieStats } from "@/lib/games";
import { stripDate } from "@/components/SiteNavbar";
import Community from "@/components/Community";
import Jersey from "@/components/Jersey";
import { photos, thumb } from "@/data/gallery";

/* ---------- The hero ---------- */

/** Where the hero film switches from the desert to the ice, in seconds. */
const ICE_AT = 6.6;

const Chant = () => {
  const words = ["We are Sabra", "אנחנו סברה", "Born in the desert", "נולדנו במדבר", "Built for the ice", "נבנינו לקרח"];
  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center" lang={/[֐-׿]/.test(w) ? "he" : undefined}>
          <span className="whitespace-nowrap px-6 font-display text-xl font-black uppercase sm:text-2xl">{w}</span>
          <span aria-hidden="true" className="text-xl">✶</span>
        </span>
      ))}
    </span>
  );
  return (
    <div aria-hidden="true" className="absolute inset-x-[-40px] bottom-6 z-20 -rotate-2 bg-sand py-1.5 text-night shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:bottom-8">
      <div className="stitch overflow-hidden py-2">
        <div className="flex w-max animate-[crawl_45s_linear_infinite] motion-reduce:animate-none">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const video = useRef<HTMLVideoElement>(null);
  const [ice, setIce] = useState(false);
  const [paused, setPaused] = useState(false);

  // start the film on every device; phones that refuse autoplay (e.g. Low Power Mode) start it on the first touch.
  // The button in the corner pauses it for anyone who'd rather it stayed still.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    return playSilently(v);
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };
  const next = nextGame();

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[640px] flex-col justify-end overflow-hidden bg-night-deep pb-28 pt-20 sm:pb-32 lg:h-[calc(100svh-130px)] lg:min-h-[700px] lg:pt-12">
      {/* the film: desert, then ice, on a loop */}
      <div aria-hidden="true" className="absolute inset-0">
        <video
          ref={video}
          className="h-full w-full object-cover object-[30%_50%]"
          poster="/media/hero.jpg"
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={(e) => setIce(e.currentTarget.currentTime >= ICE_AT)}
          onPlay={() => setPaused(false)}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
          <source src="/media/hero.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-deep/75 via-night-deep/15 to-transparent" />
      </div>

      <div className="container-site relative z-10">
        <p className="label inline-flex items-center gap-2 rounded-full bg-night-deep/70 px-3 py-1.5 text-xs text-sand backdrop-blur sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-sand" aria-hidden="true" />
          Israel's hockey club · on tour across North America
        </p>
        <h1 id="hero-title" className="mt-4 font-display text-[84px] font-bold uppercase leading-[0.88] tracking-normal text-ice-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)] sm:text-[132px] xl:text-[160px]">
          We are
          <br />
          Sabra
        </h1>
        <p lang="he" dir="rtl" className="mt-1 text-left text-5xl font-black leading-none text-sand drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)] sm:text-7xl xl:text-[84px]">
          אנחנו סברה
        </p>

        {/* the line that follows the film */}
        <div className="relative mt-5 h-9 sm:h-11" aria-live="off">
          <p className={`absolute inset-0 font-display text-2xl font-black uppercase text-ice-white transition-all duration-700 sm:text-4xl ${ice ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}>
            Born in the desert.
          </p>
          <p className={`absolute inset-0 font-display text-2xl font-black uppercase text-sand transition-all duration-700 sm:text-4xl ${ice ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            Built for the ice.
          </p>
        </div>

        <p className="mt-3 max-w-xl text-lg text-[#D9E3DC] sm:text-xl">Bringing Jewish communities together at every stop. Next season, home to Israel.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/season" className="btn-primary">
            Follow the tour
          </Link>
          <Link to="/club" className="btn-ghost bg-night-deep/40 backdrop-blur">
            Our story
          </Link>
          <Link
            to={next ? `/games/${next.id}` : "/tickets"}
            className="ml-0 inline-flex items-center gap-2 rounded-full border border-line bg-night-deep/70 px-4 py-2 text-sm font-bold text-ice-white backdrop-blur hover:border-sand sm:ml-2"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sand opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sand" />
            </span>
            {next ? `Next · ${stripDate(next)} · ${next.opponent}` : "Next stop · being booked · get alerts"}
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play the background film" : "Pause the background film"}
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-night-deep/60 text-ice-white backdrop-blur hover:border-sand hover:text-sand"
      >
        {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>

      <Chant />
    </section>
  );
};

/* ---------- Last game band ---------- */

const isWin = (r?: string) => r === "W" || r === "OTW" || r === "SOW";

/** One team line on the scoreboard: logo, name, goals by period, total, shots. */
const ScoreRow = ({ logo, name, periods, total, shots, won }: { logo: React.ReactNode; name: string; periods: number[]; total?: number; shots?: number; won: boolean }) => (
  <tr className={`border-t border-white/10 ${won ? "text-ice-white" : "text-[#9DB5A6]"}`}>
    <th scope="row" className="relative py-3 pl-5 pr-3 text-left sm:py-4">
      {won && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-1 rounded-r bg-sand" />}
      <span className="flex items-center gap-3">
        {logo}
        <span className={`truncate text-base sm:text-lg ${won ? "font-black" : "font-semibold"}`}>{name}</span>
      </span>
    </th>
    {periods.map((p, i) => (
      <td key={i} className="hidden w-12 py-3 text-center text-base sm:table-cell">
        {p}
      </td>
    ))}
    <td className={`w-16 py-3 text-center font-display text-4xl font-black sm:w-20 sm:text-5xl ${won ? "text-sand" : ""}`}>{total}</td>
    <td className="hidden w-16 py-3 pr-5 text-center text-sm sm:table-cell">{shots ?? "–"}</td>
  </tr>
);

const LastGameBand = () => {
  const [last, before] = finalGames();
  if (!last) return null;
  const won = isWin(last.result);
  const n = last.periods?.us.length ?? 3;
  return (
    <section aria-labelledby="last-title" className="border-y border-white/10 bg-[#051710] py-12 lg:py-16">
      <div className="container-site grid items-stretch gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-md border border-white/10 bg-[#0A2219] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-black/30 px-5 py-3">
            <h2 id="last-title" className="label flex items-center gap-2 text-xs text-ice-white">
              <span className="rounded-sm bg-sand px-1.5 py-0.5 font-black text-night">FINAL</span>
              Last game · {stripDate(last)}
              {last.city ? ` · ${last.city}` : ""}
            </h2>
            <span className="label text-[11px] text-[#9DB5A6]">{last.competition}{last.sheetNote ? ` · ${last.sheetNote.replace("MHL ", "")}` : ""}</span>
          </div>
          <table className="tabular w-full">
            <thead className="label text-[11px] text-[#9DB5A6]">
              <tr>
                <th scope="col" className="py-2 pl-5 text-left font-bold">Team</th>
                {Array.from({ length: n }).map((_, i) => (
                  <th key={i} scope="col" className="hidden w-12 py-2 text-center font-bold sm:table-cell">
                    {i === 3 ? "OT" : i + 1}
                  </th>
                ))}
                <th scope="col" className="w-16 py-2 text-center font-bold sm:w-20">T</th>
                <th scope="col" className="hidden w-16 py-2 pr-5 text-center font-bold sm:table-cell" title="Shots on goal">SOG</th>
              </tr>
            </thead>
            <tbody>
              <ScoreRow
                logo={<img src={crest} alt="" className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" />}
                name="Sabra HC"
                periods={last.periods?.us ?? []}
                total={last.sabraScore}
                shots={last.shots?.us}
                won={won}
              />
              <ScoreRow
                logo={<OpponentMark game={last} className="!mx-0 h-10 w-10 shrink-0 text-xs sm:h-12 sm:w-12" letters={2} />}
                name={last.opponent}
                periods={last.periods?.them ?? []}
                total={last.opponentScore}
                shots={last.shots?.them}
                won={!won}
              />
            </tbody>
          </table>
          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-5 py-4">
            <Link to={`/games/${last.id}`} className="btn-primary min-h-[42px] px-5 text-sm">
              Box score
            </Link>
            {last.recapSlug && (
              <Link to={`/news/${last.recapSlug}`} className="btn-ghost min-h-[42px] px-5 text-sm">
                Recap
              </Link>
            )}
            {last.venue && <span className="ml-auto text-sm text-[#9DB5A6]">{last.venue}</span>}
          </div>
        </div>

        {before && (
          <Link
            to={`/games/${before.id}`}
            className="group flex flex-col justify-between rounded-md border border-white/10 bg-[#0A2219] p-5 transition-colors hover:border-sand"
          >
            <div>
              <p className="label text-[11px] text-[#9DB5A6]">The game before · {stripDate(before)}</p>
              <div className="tabular mt-4 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-semibold">
                  <img src={crest} alt="" className="h-8 w-8 object-contain" /> Sabra
                </span>
                <span className="font-display text-3xl font-black">{before.sabraScore}</span>
              </div>
              <div className="tabular mt-2 flex items-center justify-between gap-3 text-[#9DB5A6]">
                <span className="flex items-center gap-2 font-semibold">
                  <OpponentMark game={before} className="!mx-0 h-8 w-8 text-[10px]" letters={2} /> {before.opponent.split(" ")[0]}
                </span>
                <span className="font-display text-3xl font-black">{before.opponentScore}</span>
              </div>
            </div>
            <p className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className={`rounded-sm px-1.5 py-0.5 text-xs font-black ${isWin(before.result) ? "bg-sand text-night" : "bg-white/10 text-ice-white"}`}>
                {isWin(before.result) ? "WIN" : "LOSS"}
              </span>
              <span className="font-bold text-sand group-hover:text-sand-soft">Box score →</span>
            </p>
          </Link>
        )}
      </div>
    </section>
  );
};

/* ---------- Next stop ---------- */

const NextStop = () => {
  const next = nextGame();
  return (
    <section aria-labelledby="next-title" className="bg-night pt-16 lg:pt-20">
      <div className="container-site">
        <div className="grid items-center gap-5 rounded border-2 border-sand p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))_auto]">
          <div>
            <p className="label text-xs text-sand">
              Next stop · <span lang="he">התחנה הבאה</span>
            </p>
            <h2 id="next-title" className="mt-1 font-display text-3xl font-black uppercase leading-[0.95] sm:text-4xl">
              {next ? next.city ?? `vs ${next.opponent}` : "Being booked"}
            </h2>
            <p className="mt-1 text-[#D9E3DC]">
              {next ? `vs ${next.opponent}${gamePlace(next) ? ` · ${gamePlace(next)}` : ""}` : "We announce each weekend series as soon as it's booked."}
            </p>
          </div>
          <div className="rounded bg-night-deep px-5 py-4">
            <p className="label text-[11px] text-muted-text">Rink time</p>
            <p className="mt-1 font-display text-xl font-black">{next ? `${stripDate(next)} · ${gameTime(next)}` : "To be announced"}</p>
          </div>
          <div className="rounded bg-night-deep px-5 py-4">
            <p className="label text-[11px] text-muted-text">
              In Israel · <span lang="he">שעון ישראל</span>
            </p>
            <p className="mt-1 font-display text-xl font-black">{next ? formatGameTime(next.date, "Asia/Jerusalem") : "Shown with every game"}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col">
            <Link to="/tickets" className="btn-primary">
              Get tour alerts
            </Link>
            {!next && (
              <Link to="/host" className="btn-ghost">
                Bring us to your city
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- The story so far ---------- */

const chapters = [
  { when: "2023–26", title: "Israel Selects", body: "Three seasons bringing players from Israel Elite Hockey League teams and Israel's national team to play in North America." },
  { when: "2026–27 · now", title: "The North American Tour", body: "The Selects play as Sabra HC: weekend series in cities with big Jewish communities, each one a night that brings the community together." },
  { when: "2027–28 and on", title: "Home, then Europe", body: "The Israeli league and European clubs in Israel, the Continental Cup as champions, and a European league by 2031." },
];

const StorySoFar = () => (
  <section aria-labelledby="story-title" className="bg-night pt-20 lg:pt-24">
    <div className="container-site">
      <SectionTitle
        id="story-title"
        tag="The story so far"
        he="הסיפור שלנו"
        title="From Selects to Sabra"
        action={
          <Link to="/club" className="btn-ghost">
            Our story
          </Link>
        }
      />
      <ol className="grid gap-3 md:grid-cols-3">
        {chapters.map((c, i) => (
          <li key={c.title} className={`rounded border p-6 ${i === 1 ? "border-sand bg-sand text-night" : "border-line bg-night-2"}`}>
            <p className={`label text-xs ${i === 1 ? "" : "text-sand"}`}>
              Chapter {i + 1} · {c.when}
            </p>
            <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight">{c.title}</h3>
            <p className={`mt-2 ${i === 1 ? "font-medium" : "text-[#D9E3DC]"}`}>{c.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ---------- From the stands ---------- */

/** The home-page wall: a mosaic of the best photos, each tile opening the gallery on its category. */
const WALL: { id: string; span: string; label?: string; c?: string }[] = [
  { id: "p009", span: "col-span-2 row-span-2", label: "The community shows up", c: "community" },
  { id: "p147", span: "col-span-2", label: "Goal!", c: "game" },
  { id: "p023", span: "", label: "Shabbat with the team", c: "shabbat" },
  { id: "p094", span: "row-span-2", label: "Kids in the locker room", c: "kids" },
  { id: "p061", span: "", c: "game" },
  { id: "p106", span: "row-span-2", label: "Flags up", c: "community" },
  { id: "p137", span: "col-span-2", label: "One team", c: "team" },
  { id: "p119", span: "", c: "kids" },
  { id: "p060", span: "", c: "game" },
  { id: "p092", span: "", c: "team" },
  { id: "p036", span: "", c: "kids" },
  { id: "p003", span: "col-span-2", label: "The Finland trip", c: "finland" },
];

const TifoWall = () => (
  <section aria-labelledby="wall-title" className="bg-night py-20 lg:py-24">
    <div className="container-site">
      <SectionTitle
        id="wall-title"
        tag="Only at Sabra"
        he="מהיציע"
        title="The Tifo Wall"
        intro="Three seasons of Israel Selects on tour: the games, the fans, the kids and the Shabbat tables. Sabra HC's photos join the wall as this season goes."
        action={
          <Link to="/gallery" className="btn-ghost">
            See all {photos.length} photos
          </Link>
        }
      />
      <div className="grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[170px] sm:grid-cols-4 lg:grid-cols-5">
        {WALL.map((t) => (
          <Link
            key={t.id}
            to={t.c ? `/gallery?c=${t.c}` : "/gallery"}
            className={`group relative overflow-hidden rounded bg-night-2 ${t.span}`}
            aria-label={t.label ?? "Open the photo wall"}
          >
            <img src={thumb(t.id)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {t.label && (
              <span className="absolute bottom-2 left-2 rounded bg-night/85 px-2.5 py-1 text-xs font-bold text-ice-white backdrop-blur sm:text-sm">{t.label}</span>
            )}
          </Link>
        ))}
      </div>
      <Link to="/gallery" className="mt-2 flex items-center justify-center gap-3 rounded bg-sand px-4 py-4 text-center text-night hover:bg-sand-soft">
        <span className="font-display text-3xl font-bold">+{photos.length - WALL.length}</span>
        <span className="text-sm font-bold uppercase tracking-wide">More photos</span>
      </Link>
      <p className="mt-4 text-sm text-muted-text">
        Were you at a game?{" "}
        <a href={`mailto:${club.email}?subject=${encodeURIComponent("Photo for the Tifo Wall")}`} className="text-sand hover:text-sand-soft">
          Send us your photo →
        </a>
      </p>
    </div>
  </section>
);

/* ---------- The locker room ---------- */

const LockerRoom = () => {
  const goalie = goalieStats()[0];
  const lines = skaterStats().slice(0, 4);
  const find = (name: string) => players.find((p) => `${p.firstName} ${p.lastName}` === name);
  const stalls = [
    ...(goalie ? [{ name: goalie.name, note: `${goalie.saves} saves · ${goalie.svPct}` }] : []),
    ...lines.map((s) => ({ name: s.name, note: `${s.g} G · ${s.a} A · ${s.pts} PTS` })),
  ];
  return (
    <section aria-labelledby="room-title" className="bg-night-deep py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="room-title"
          tag="The team"
          he="חדר ההלבשה"
          title="The locker room"
          action={
            <Link to="/team" className="btn-ghost">
              All {players.length} players
            </Link>
          }
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stalls.map((s) => {
            const p = find(s.name);
            const card = (
              <>
                <div className="flex flex-1 items-center justify-center py-6">
                  {p?.photo ? <img src={p.photo} alt="" className="h-40 w-full object-cover" /> : <Jersey number={p?.number ?? ""} />}
                </div>
                <div className="flex items-center justify-between gap-2 bg-sand px-3 py-2.5 text-night">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold uppercase">{s.name}</span>
                    <span className="block text-xs font-medium">{s.note}</span>
                  </span>
                  <span className="tabular font-display text-xl font-black">{p?.number}</span>
                </div>
              </>
            );
            return (
              <li key={s.name}>
                {p ? (
                  <Link to={`/team/${p.slug}`} className="flex h-full min-h-[300px] flex-col overflow-hidden rounded border border-line bg-gradient-to-b from-night-2 to-night transition-transform hover:-translate-y-1">
                    {card}
                  </Link>
                ) : (
                  <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded border border-line bg-gradient-to-b from-night-2 to-night">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* ---------- News ---------- */

const NewsSection = () => {
  const [lead, ...rest] = sortedArticles;
  if (!lead) return null;
  return (
    <section aria-labelledby="news-title" className="bg-night py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="news-title"
          tag="Latest"
          he="חדשות"
          title="Club news"
          action={
            <Link to="/news" className="btn-ghost">
              All news
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Link to={`/news/${lead.slug}`} className="group relative block min-h-[420px] overflow-hidden rounded border border-line bg-night-2">
            <img src={lead.image} alt="" className={`absolute inset-0 h-full w-full ${lead.imageFit === "contain" ? "object-contain p-10" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`} />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="tag-sand">{lead.category}</span>
              <h3 className="mt-3 max-w-2xl font-display text-3xl font-black uppercase leading-[0.95] sm:text-4xl">{lead.title}</h3>
              <p className="label mt-3 text-xs text-muted-text">{formatDate(lead.date)}</p>
            </div>
          </Link>
          <ul className="grid gap-4">
            {rest.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <Link to={`/news/${a.slug}`} className="group grid h-full grid-cols-[120px_1fr] overflow-hidden rounded border border-line bg-night-2 hover:border-sand sm:grid-cols-[160px_1fr]">
                  <div className="relative overflow-hidden bg-night">
                    <img src={a.image} alt="" className={`absolute inset-0 h-full w-full ${a.imageFit === "contain" ? "object-contain p-4" : "object-cover"}`} />
                  </div>
                  <div className="p-4">
                    <p className="label text-[11px] text-sand">
                      {a.category} · {formatDate(a.date)}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-black uppercase leading-tight group-hover:text-sand">{a.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
            {rest.length === 0 && <li className="flex items-center rounded border border-dashed border-line p-6 text-muted-text">More stories from the tour coming soon.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ---------- Scarves up + the Pride ---------- */

const ScarvesUp = () => (
  <section aria-labelledby="pride-title" className="relative overflow-hidden bg-night py-20 lg:py-24">
    <div aria-hidden="true" className="scarf mx-[-40px] flex h-36 -rotate-3 items-center justify-center border-y-[10px] border-night-deep shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:h-40">
      <span className="bg-night px-5 py-2 font-display text-2xl font-black text-sand sm:text-3xl">
        SABRA · <span lang="he">סברה</span>
      </span>
    </div>
    <div className="container-site mt-14 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="label text-xs text-sand">
          Founding membership · <span lang="he">הגאווה</span>
        </p>
        <h2 id="pride-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
          Join the Pride
        </h2>
        <p className="mt-3 max-w-xl text-lg text-[#D9E3DC]">Tour alerts, every faceoff in your time and Israel time, and first access to the first Sabra HC jersey.</p>
      </div>
      <Link to="/pride" className="btn-primary">
        Get early access
      </Link>
    </div>
  </section>
);

const Home = () => (
  <>
    <Hero />
    <LastGameBand />
    <NextStop />
    <Community />
    <StorySoFar />
    <TourSection />
    <GameCentre />
    <TifoWall />
    <LockerRoom />
    <NewsSection />
    <EpisodeRow />
    <FirstsBoard />
    <ScarvesUp />
  </>
);

export default Home;
