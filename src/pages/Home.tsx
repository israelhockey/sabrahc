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

/* ---------- The banner ---------- */

const Hero = () => (
  <section aria-labelledby="hero-title" className="crowd relative overflow-hidden pb-24 pt-14 lg:pb-28 lg:pt-20">
    <div className="relative mx-[-30px] -rotate-2 bg-sand p-3 text-night shadow-[0_50px_90px_-30px_rgba(0,0,0,0.75)] sm:p-3.5">
      <div className="stitch">
        <div className="container-site grid items-center gap-8 px-10 py-10 sm:px-12 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:py-14">
          <img src={crest} alt="Sabra HC crest" className="mx-auto w-[46%] max-w-[420px] object-contain sm:w-[40%] lg:w-full" />
          <div className="min-w-0">
            <h1 id="hero-title" className="font-display text-[56px] font-black uppercase leading-[0.86] tracking-[-0.04em] sm:text-8xl xl:text-[128px]">
              We are
              <br />
              Sabra
            </h1>
            <p lang="he" dir="rtl" className="mt-2 text-left text-5xl font-black leading-none sm:text-7xl xl:text-[100px]">
              אנחנו סברה
            </p>
            <p className="mt-5 max-w-lg text-lg font-medium sm:text-xl">
              Israel's team, on tour across North America, bringing Jewish communities together at every stop. Next season, home.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/season" className="btn-dark">
                Follow the tour
              </Link>
              <Link to="/news/israel-selects-become-sabra-hc" className="btn border-2 border-night text-night hover:bg-night hover:text-sand">
                The story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className="absolute bottom-5 right-6 text-sm font-bold text-sand" aria-hidden="true">
      Scroll · <span lang="he">גללו</span> ↓
    </p>
  </section>
);

/* ---------- Last game band ---------- */

const LastGameBand = () => {
  const [last, before] = finalGames();
  if (!last) return null;
  const periods = last.periods ? last.periods.us.map((u, i) => `${u}:${last.periods!.them[i]}`).join(" / ") : null;
  return (
    <section aria-labelledby="last-title" className="bg-sand text-night">
      <div className="container-site grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:py-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="last-title" className="font-body text-sm font-bold tracking-[0.2em]">
            LAST GAME · {stripDate(last)}
            {last.city ? ` · ${last.city.toUpperCase()}` : ""}
          </h2>
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-2">
              <img src={crest} alt="" className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
              <span className="font-bold">Sabra HC</span>
            </div>
            <p className="tabular font-display text-6xl font-black leading-none sm:text-8xl">
              {last.sabraScore}:{last.opponentScore}
            </p>
            <div className="flex flex-col items-center gap-2">
              <OpponentMark game={last} className="h-20 w-20 border-night text-night sm:h-24 sm:w-24" />
              <span className="font-bold">{last.opponent}</span>
            </div>
          </div>
          {periods && <p className="tabular font-display text-base font-bold sm:text-lg">{periods}</p>}
          <Link to={`/games/${last.id}`} className="btn-dark mt-1">
            Game report
          </Link>
        </div>
        {before && (
          <Link to={`/games/${before.id}`} className="rounded bg-night p-6 text-ice-white transition-transform hover:-translate-y-0.5">
            <span className="label text-xs text-muted-text">The game before · {stripDate(before)}</span>
            <span className="tabular mt-2 block font-display text-4xl font-black text-sand">
              {before.sabraScore}:{before.opponentScore} {before.result === "W" ? "WIN" : before.result === "L" ? "LOSS" : before.result}
            </span>
            <span className="mt-1 block text-sm text-[#D9E3DC]">vs {before.opponent}</span>
            <span className="mt-4 block text-sm font-bold text-sand">Game report →</span>
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
              <Link to="/partners#city-partner" className="btn-ghost">
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

const TifoWall = () => (
  <section aria-labelledby="wall-title" className="bg-night py-20 lg:py-24">
    <div className="container-site">
      <SectionTitle
        id="wall-title"
        tag="Only at Sabra"
        he="מהיציע"
        title="The Tifo Wall"
        intro="Photos from the stands at every stop, city by city. The wall fills up as the tour goes. Send us yours from the game and it lands here."
      />
      <div className="grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[170px] sm:grid-cols-4">
        <div className="crowd col-span-2 row-span-2 flex items-end rounded p-4">
          <span className="rounded bg-night/85 px-3 py-1.5 text-sm font-bold">Mansfield, TX · weekend one</span>
        </div>
        <div className="flex items-center justify-center rounded bg-night-2">
          <img src={crest} alt="" className="h-20 w-20 object-contain opacity-80" />
        </div>
        <div className="scarf rounded" aria-hidden="true" />
        <div className="flex items-center justify-center rounded bg-night-deep p-4 text-center">
          <span lang="he" className="text-3xl font-black text-sand">
            סברה
          </span>
        </div>
        <div className="crowd rounded" aria-hidden="true" />
        <a
          href={`mailto:${club.email}?subject=${encodeURIComponent("Photo for the Tifo Wall")}`}
          className="col-span-2 flex items-center justify-center rounded bg-sand px-4 text-center font-display text-lg sm:col-span-4 font-black uppercase text-night hover:bg-sand-soft sm:text-xl"
        >
          + Send your photo
        </a>
      </div>
    </div>
  </section>
);

/* ---------- The locker room ---------- */

const Jersey = ({ number }: { number: number | string }) => (
  <svg viewBox="0 0 200 190" aria-hidden="true" className="mx-auto h-auto w-[70%]">
    <path d="M60 14 L84 8 Q100 26 116 8 L140 14 L190 50 L172 96 L150 86 L150 182 L50 182 L50 86 L28 96 L10 50 Z" fill="#0F3B2A" stroke="#E8B547" strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 150 H150 V160 H50 Z M50 166 H150 V170 H50 Z" fill="#E8B547" />
    <text x="100" y="128" textAnchor="middle" fontFamily="Unbounded, sans-serif" fontWeight="900" fontSize="56" fill="#F3E9D2">
      {number}
    </text>
  </svg>
);

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
