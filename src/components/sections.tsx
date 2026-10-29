import { Link } from "react-router-dom";
import { club, firsts, episodes } from "@/data/club";
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
          he="הראשונים"
          tone="ice"
          title="The Firsts"
          intro="A new club only gets one of each. Every first in Sabra HC history fills in here, from the first goal on tour to the first game in Israel."
          action={
            <p className="flex items-center gap-3">
              <span className="tabular font-display text-4xl font-black text-sand">
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
                  <span className="tabular font-display text-lg font-black text-muted-text sm:text-xl">#{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`label px-2 py-1 text-[10px] sm:px-2.5 sm:text-xs ${
                      done ? "bg-sand text-night" : next ? "bg-sand text-night" : "bg-night text-muted-text"
                    }`}
                  >
                    {done ? "Unlocked" : next ? "Next up" : "Locked"}
                  </span>
                </div>
                <p className="mt-3 font-display text-xl font-black uppercase leading-[0.95] sm:text-2xl">{f.title}</p>
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
          he="מרכז המשחק"
          title={`Season ${club.season}`}
          action={
            <a href={club.statsUrl} target="_blank" rel="noreferrer" className="btn-ghost">
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
              <p className="mt-1 font-display text-xl font-black uppercase leading-tight">
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
        he="הסיור"
        title="The Tour"
        intro="This season Sabra HC tours North America in the Mountain Hockey League. Every weekend series is an event for the local community, with a game, a meet-and-greet and a local partner."
        action={
          <Link to="/season" className="btn-ghost">
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
          he="בדרכים"
          tone="live"
          title="On Tour"
          intro="Israel's flagship team on the road across North America, filmed from the inside. New episodes through the season."
          action={
            <Link to="/season" className="btn-ghost">
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
              </CamFrame>
              <div className="px-4 pb-5 pt-4">
                <p className="label text-sm text-sand">
                  {e.ep} · {live ? e.released ?? "Watch now" : "Coming soon"}
                </p>
                <p className="mt-1 font-display text-2xl font-black uppercase leading-[0.95]">{e.title}</p>
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
