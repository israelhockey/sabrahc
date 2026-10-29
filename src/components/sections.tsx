import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { club, firsts, episodes, players } from "@/data/club";
import { nextGame, lastGame, seasonRecord, skaterStats, goalieStats, gameDate, gameTime, gamePlace } from "@/lib/games";
import { GameRecap, TourMap, TourStops } from "./tour";
import { CamFrame, PlayIcon, SectionTitle, StatGrid } from "./broadcast";

/* ---------- The Firsts ---------- */

export const FirstsBoard = () => {
  const unlocked = firsts.filter((f) => f.date).length;
  const nextIndex = firsts.findIndex((f) => !f.date);
  return (
    <section aria-labelledby="firsts-title" className="bg-night py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="firsts-title"
          tag="Logged live, all season"
          tone="ice"
          title="The Firsts"
          intro="A new club only gets one of each. Every first in Sabra HC history fills in here, from the first goal on tour to the first game in Israel."
          action={
            <p className="flex items-center gap-3">
              <span className="tabular font-display text-6xl font-black text-sand">
                {unlocked}/{firsts.length}
              </span>
              <span className="label text-sm leading-tight text-muted-text">
                firsts
                <br />
                unlocked
              </span>
            </p>
          }
        />
        <ol className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {firsts.map((f, i) => {
            const done = Boolean(f.date);
            const next = i === nextIndex;
            return (
              <li
                key={f.title}
                className={`lift flex min-h-[150px] flex-col border bg-night-2 p-3.5 sm:min-h-[170px] sm:p-5 ${done ? "border-sand bg-sand/10" : next ? "border-sand" : "border-line"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="tabular font-display text-xl font-black text-muted-text sm:text-2xl">#{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`label px-2 py-1 text-[10px] sm:px-2.5 sm:text-xs ${
                      done ? "bg-sand text-night" : next ? "bg-sand text-night" : "bg-night text-muted-text"
                    }`}
                  >
                    {done ? "Unlocked" : next ? "Next up" : "Locked"}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl font-black uppercase leading-[0.95] sm:text-3xl">{f.title}</p>
                <div className="flex-1" />
                <p className={`label mt-3 border-t border-dashed border-line pt-2.5 text-xs sm:text-sm ${done ? "text-ice-white" : "text-muted-text"}`}>
                  {done ? `${f.date} · ${f.detail ?? ""}` : f.pending}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/* ---------- Game centre ---------- */

export const GameCentre = () => {
  const next = nextGame();
  const last = lastGame();
  const rec = seasonRecord();
  const leaders = skaterStats().slice(0, 5);
  const goalie = goalieStats()[0];
  return (
    <section aria-labelledby="gc-title" className="border-y border-line bg-night-deep py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="gc-title"
          tag="Game centre"
          title={`Season ${club.season}`}
          action={
            <a href={club.statsUrl} target="_blank" rel="noreferrer" className="border-b-[3px] border-sand pb-1 font-cond text-lg font-extrabold uppercase tracking-[0.1em] hover:text-sand">
              Official MHL stats
            </a>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {last ? (
            <GameRecap game={last} compact />
          ) : (
            <div className="panel p-6 text-muted-text">No results yet.</div>
          )}

          <div className="panel">
            <div className="panel-head">
              <span>Season record</span>
              <span className="text-ice">{club.leagueShort}</span>
            </div>
            <StatGrid
              stats={[
                { v: rec.played, l: "GP" },
                { v: rec.w, l: "W" },
                { v: rec.l + rec.otl, l: "L" },
                { v: rec.gf, l: "GF" },
                { v: rec.ga, l: "GA" },
                { v: goalie ? goalie.svPct : "–", l: "SV%" },
              ]}
              highlight="W"
            />
            <div className="border-t border-line px-4 py-3">
              <p className="label text-xs text-muted-text">Next game</p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-tight">
                {next ? `vs ${next.opponent}` : "Next weekend series · announced soon"}
              </p>
              {next && <p className="label mt-1 text-sm text-ice">{gameDate(next)} · {gameTime(next)}{gamePlace(next) ? ` · ${gamePlace(next)}` : ""}</p>}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span>Scoring leaders</span>
              <span>G · A · PTS</span>
            </div>
            <ol>
              {leaders.map((s, i) => (
                <li key={s.name} className="label grid grid-cols-[28px_1fr_32px_32px_40px] items-center border-b border-line px-4 py-2.5 text-base">
                  <span className="tabular text-muted-text">{i + 1}</span>
                  <span className="truncate text-ice-white">{s.number ? <span className="tabular mr-2 text-sand">#{s.number}</span> : null}{s.name}</span>
                  <span className="tabular text-right text-muted-text">{s.g}</span>
                  <span className="tabular text-right text-muted-text">{s.a}</span>
                  <span className="tabular text-right text-sand">{s.pts}</span>
                </li>
              ))}
            </ol>
            <Link to="/schedule" className="label block px-4 py-3 text-sm text-sand hover:text-sand-soft">
              Full schedule and stats →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- The tour ---------- */

export const TourSection = () => (
  <section aria-labelledby="tour-title" className="bg-night py-20 lg:py-24">
    <div className="container-site">
      <SectionTitle
        id="tour-title"
        tag={`${club.seasonName} · ${club.season}`}
        tone="sand"
        title="The Tour"
        intro="This season Sabra HC tours North America in the Mountain Hockey League. Every weekend series is an event for the local community, with a game, a meet-and-greet and a local partner."
        action={
          <Link to="/season" className="border-b-[3px] border-sand pb-1 font-cond text-lg font-extrabold uppercase tracking-[0.1em] hover:text-sand">
            Full tour
          </Link>
        }
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="border border-line">
          <div className="panel-head bg-night-2">
            <span>Cities on our list</span>
            <span className="text-sand">Dates announced as they're booked</span>
          </div>
          <TourMap light={false} />
        </div>
        <TourStops />
      </div>
    </div>
  </section>
);

/* ---------- Tour docuseries ---------- */

export const EpisodeRow = ({ heading = true }: { heading?: boolean }) => (
  <section aria-labelledby={heading ? "fs-title" : undefined} className="border-t border-line bg-night-deep py-20 lg:py-24">
    <div className="container-site">
      {heading && (
        <SectionTitle
          id="fs-title"
          tag="Original series"
          tone="live"
          title="On Tour"
          intro="Israel's flagship team on the road across North America, filmed from the inside. New episodes through the season."
          action={
            <Link to="/season" className="border-b-[3px] border-sand pb-1 font-cond text-lg font-extrabold uppercase tracking-[0.1em] hover:text-sand">
              All episodes
            </Link>
          }
        />
      )}
      <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {episodes.map((e) => {
          const live = Boolean(e.videoUrl);
          const card = (
            <>
              <CamFrame corners="diagonal" className="aspect-[16/10]">
                <div className="flex h-full items-center justify-center text-ice-white">
                  <PlayIcon />
                </div>
                <span className="label absolute bottom-3 left-4 right-4 z-[3] text-[11px] text-muted-text">CAM · {e.shot}</span>
              </CamFrame>
              <div className="px-4 pb-5 pt-4">
                <p className="label text-sm text-sand">
                  {e.ep} · {live ? e.released ?? "Watch now" : "Coming soon"}
                </p>
                <p className="mt-1 font-display text-3xl font-black uppercase leading-[0.95]">{e.title}</p>
              </div>
            </>
          );
          return (
            <li key={e.ep} className="w-[78%] flex-none snap-start sm:w-auto">
              {live ? (
                <a href={e.videoUrl} target="_blank" rel="noreferrer" className="lift block border border-line bg-night">
                  {card}
                </a>
              ) : (
                <div className="block border border-line bg-night">{card}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

/* ---------- Lineup + journey teaser ---------- */

const Silhouette = () => (
  <svg aria-hidden="true" width="64" height="64" viewBox="0 0 64 64" className="mx-auto block">
    <circle cx="32" cy="22" r="12" fill="#1C2C4A" />
    <path d="M10 62 C10 44 20 36 32 36 C44 36 54 44 54 62 Z" fill="#1C2C4A" />
  </svg>
);

export const LineupSection = () => {
  const roster = [...players].sort((a, b) => a.number - b.number);
  const show = roster.slice(0, 9);
  return (
    <section aria-labelledby="lineup-title" className="bg-night py-20 lg:py-24">
      <div className="container-site grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            id="lineup-title"
            tag="The roster"
            tone="ice"
            title="The Lineup"
            intro={`${roster.length} players have dressed for Sabra HC so far this season. Players live across North America and join the tour weekend by weekend.`}
          />
          <ul className="grid grid-cols-3 gap-2.5">
            {show.map((p) => (
              <li key={p.slug}>
                <Link to={`/team/${p.slug}`} className="lift block border border-line bg-night-2 px-3 py-4 text-center">
                  {p.photo ? <img src={p.photo} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" /> : <Silhouette />}
                  <p className="tabular mt-2 font-display text-2xl font-black text-ice-white">#{p.number}</p>
                  <p className="label mt-0.5 truncate text-xs text-sand">{p.lastName}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/team" className="btn-primary mt-6">
            Full roster
          </Link>
        </div>
        <div className="border border-line bg-night-2">
          <div className="panel-head">
            <span>Player journeys</span>
            <span className="text-sand">Every player, every road</span>
          </div>
          <svg role="img" aria-label="A route line from North America to Israel" viewBox="0 0 600 260" className="block h-auto w-full bg-night">
            <g stroke="#16233C" strokeWidth="1">
              <path d="M0 52 H600 M0 104 H600 M0 156 H600 M0 208 H600 M100 0 V260 M200 0 V260 M300 0 V260 M400 0 V260 M500 0 V260" />
            </g>
            <path d="M90 170 C 220 30, 420 30, 520 150" fill="none" stroke="#D6A84A" strokeWidth="3" strokeDasharray="8 7" />
            <circle cx="90" cy="170" r="9" fill="#9CC9E3" />
            <circle cx="520" cy="150" r="11" fill="#D6A84A" />
            <circle cx="520" cy="150" r="20" fill="none" stroke="#D6A84A" strokeOpacity="0.4" strokeWidth="2" />
          </svg>
          <div className="label flex justify-between px-4 py-3 text-base">
            <span className="text-ice">North America</span>
            <span className="text-sand">Israel</span>
          </div>
          <div className="px-4 pb-6 pt-1">
            <p className="font-display text-4xl font-black uppercase leading-[0.95]">On the road to the lion</p>
            <p className="mt-2 text-muted-text">
              This season we tour North America. Next season the road leads home to Israel. Every player gets a page with their season stats and their firsts in the jersey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Home ice, everywhere ---------- */

const ZONES: [string, string][] = [
  ["Tel Aviv", "Asia/Jerusalem"],
  ["London", "Europe/London"],
  ["Toronto", "America/Toronto"],
  ["New York", "America/New_York"],
  ["Los Angeles", "America/Los_Angeles"],
];

export const HomeIceEverywhere = () => {
  const next = nextGame();
  const iso = next?.date ?? "2026-11-21T19:00:00-05:00";
  const example = !next;
  return (
    <section aria-labelledby="everywhere-title" className="border-y border-line bg-night-deep py-20 lg:py-24">
      <div className="container-site">
        <SectionTitle
          id="everywhere-title"
          tag="Watch from anywhere"
          title="Home ice, everywhere"
          intro="We play across North America, but the Pride is everywhere. Faceoff shows in your time zone, including back home in Israel."
        />
        <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {ZONES.map(([city, tz], i) => (
            <li key={city} className={`px-5 py-5 ${i === 0 ? "bg-sand text-night" : "bg-night"}`}>
              <p className={`label text-sm ${i === 0 ? "text-night" : "text-ice"}`}>{city}</p>
              <p className="tabular mt-1 font-display text-5xl font-black leading-none sm:text-6xl">
                {new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz })}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {club.streamUrl ? (
            <a href={club.streamUrl} target="_blank" rel="noreferrer" className="btn-live">
              <span className="h-2.5 w-2.5 rounded-full bg-ice-white" aria-hidden="true" /> Watch live
            </a>
          ) : (
            <Link to="/tickets" className="btn-live">
              <span className="h-2.5 w-2.5 rounded-full bg-ice-white" aria-hidden="true" /> Stream details soon
            </Link>
          )}
          <span className="text-sm text-muted-text">
            {example ? "Example: a 7:00 pm faceoff in New York. Real times appear with each game." : "Times shown for the next game."}
          </span>
        </div>
      </div>
    </section>
  );
};

/* ---------- Uniform reveal + Pride ---------- */

export const UniformAndPride = () => (
  <section aria-label="Uniform reveal and the Pride" className="bg-night py-20 lg:py-24">
    <div className="container-site grid gap-4 lg:grid-cols-2">
      <CamFrame corners="diagonal" className="min-h-[440px] border border-line">
        <div className="flex h-full min-h-[440px] flex-col justify-between p-8 sm:p-10">
          <div>
            <span className="tag-white">Coming soon</span>
            <p className="mt-3 font-display text-6xl font-black uppercase leading-[0.88] sm:text-7xl">
              The uniform
              <br />
              reveal
            </p>
            <p className="mt-3 max-w-sm text-lg text-[#C9D6E6]">The first official Sabra HC jersey is in design. Be first to see it.</p>
          </div>
          <svg aria-hidden="true" viewBox="0 0 220 200" className="absolute bottom-8 right-8 hidden w-56 opacity-85 sm:block">
            <path
              d="M70 10 L40 20 L8 60 L30 86 L48 74 L48 190 L172 190 L172 74 L190 86 L212 60 L180 20 L150 10 C140 26 80 26 70 10 Z"
              fill="none"
              stroke="#D6A84A"
              strokeWidth="3"
              strokeDasharray="7 6"
              strokeLinejoin="round"
            />
            <text x="110" y="130" textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="900" fontSize="54" fill="#D6A84A">
              ?
            </text>
          </svg>
          <Link to="/pride" className="btn-primary self-start">
            Notify me
          </Link>
        </div>
      </CamFrame>
      <div className="flex min-h-[440px] flex-col justify-between bg-sand p-8 text-night sm:p-10">
        <div>
          <p className="label text-sm">Founding membership</p>
          <p className="mt-2 font-display text-7xl font-black uppercase leading-[0.85] sm:text-8xl">
            Join
            <br />
            the Pride
          </p>
          <p className="mt-4 max-w-md text-lg font-medium">
            Founders Edition jersey, merch pack, every game streamed and your name on the Founders Wall. Be on the list when memberships open.
          </p>
        </div>
        <Link to="/pride" className="btn-dark self-start">
          Get early access
        </Link>
      </div>
    </div>
  </section>
);
