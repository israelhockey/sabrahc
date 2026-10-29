import { useState } from "react";
import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import PageHero from "@/components/PageHero";
import SignupForm from "@/components/SignupForm";
import { OpponentMark } from "@/components/tour";
import { club, games, type Game } from "@/data/club";
import { formatGameTime, gameTime, seasonRecord, upcomingGames } from "@/lib/games";

const parts = (g: Game) => {
  const d = new Date(g.date);
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: g.tz }).format(d);
  return { weekday: f({ weekday: "short" }).toUpperCase(), day: f({ day: "numeric" }), month: f({ month: "short" }).toUpperCase(), monthYear: f({ month: "long", year: "numeric" }) };
};

const resultLabel = (g: Game) => {
  const w = g.result === "W" || g.result === "OTW" || g.result === "SOW";
  const suffix = g.result === "OTW" || g.result === "OTL" ? " OT" : g.result === "SOW" || g.result === "SOL" ? " SO" : "";
  return { w, text: `${w ? "W" : "L"} ${g.sabraScore}–${g.opponentScore}${suffix}` };
};

/** One row of the schedule, NHL.com style: date, matchup, place, then the result or the faceoff time. */
const GameRow = ({ g, n }: { g: Game; n?: number }) => {
  const p = parts(g);
  const final = g.status === "final";
  const r = final ? resultLabel(g) : null;
  return (
    <li className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-t border-line bg-night px-4 py-4 first:border-t-0 sm:px-5 lg:grid-cols-[72px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
      <div className="tabular row-span-2 text-center lg:row-span-1">
        <p className="label text-[11px] text-muted-text">{p.weekday}</p>
        <p className="font-display text-3xl font-black leading-none">{p.day}</p>
        <p className="label text-[11px] text-sand">{p.month}</p>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <img src={crest} alt="" className="hidden h-10 w-10 shrink-0 object-contain sm:block" />
        <span className="hidden font-bold sm:inline">Sabra HC</span>
        <span className="label text-xs text-muted-text">{g.home ? "vs" : "@"}</span>
        <OpponentMark game={g} className="h-10 w-10 shrink-0 text-xs" letters={2} />
        <span className="truncate font-bold">{g.opponent}</span>
      </div>

      <div className="col-start-2 min-w-0 text-sm text-muted-text lg:col-start-auto">
        <p className="truncate">{g.venue ?? "Venue TBA"}</p>
        <p className="truncate">
          {g.city ?? ""}
          {n ? ` · Game ${n}` : ""}
          {g.sheetNote ? ` · ${g.sheetNote}` : ""}
        </p>
      </div>

      <div className="col-start-2 lg:col-start-auto">
        {r ? (
          <p className="tabular flex items-center gap-2">
            <span className={`rounded px-2 py-0.5 text-xs font-black ${r.w ? "bg-sand text-night" : "bg-[#5A6B5F] text-ice-white"}`}>{r.w ? "WIN" : "LOSS"}</span>
            <span className="font-display text-2xl font-black">{r.text.slice(2)}</span>
            <span className="label text-[11px] text-muted-text">Final</span>
          </p>
        ) : (
          <div className="tabular text-sm">
            <p className="font-display text-xl font-black">{gameTime(g)}</p>
            <p className="text-muted-text">
              Israel <span lang="he">· שעון ישראל</span> {formatGameTime(g.date, "Asia/Jerusalem")}
            </p>
          </div>
        )}
      </div>

      <div className="col-start-2 flex flex-wrap gap-2 lg:col-start-auto lg:justify-end">
        {final ? (
          <>
            <Link to={`/games/${g.id}`} className="rounded border border-sand px-3 py-1.5 text-sm font-bold text-sand hover:bg-sand hover:text-night">
              Box score
            </Link>
            {g.recapSlug && (
              <Link to={`/news/${g.recapSlug}`} className="rounded border border-line px-3 py-1.5 text-sm font-bold text-ice-white hover:border-sand">
                Recap
              </Link>
            )}
          </>
        ) : (
          <>
            {g.ticketUrl ? (
              <a href={g.ticketUrl} target="_blank" rel="noreferrer" className="btn-primary min-h-[40px] px-4 text-sm">
                Tickets
              </a>
            ) : (
              <Link to={`/games/${g.id}`} className="btn-primary min-h-[40px] px-4 text-sm">
                Game info
              </Link>
            )}
          </>
        )}
      </div>
    </li>
  );
};

const Schedule = () => {
  const [view, setView] = useState<"all" | "results" | "upcoming">("all");
  const rec = seasonRecord();
  const upcoming = upcomingGames();
  const ordered = [...games].sort((a, b) => a.date.localeCompare(b.date));
  const number = new Map(ordered.filter((g) => g.status === "final").map((g, i) => [g.id, i + 1]));
  const shown = ordered.filter((g) => (view === "all" ? true : view === "results" ? g.status === "final" : g.status === "scheduled"));

  const months = new Map<string, Game[]>();
  for (const g of shown) {
    const k = parts(g).monthYear;
    months.set(k, [...(months.get(k) ?? []), g]);
  }

  return (
    <>
      <PageHero
        compact
        he="משחקים ותוצאות"
        eyebrow={`${club.seasonName} · ${club.season}`}
        title="Games"
        intro={`Every game on the tour, with results from the official ${club.leagueShort} game sheets. Times are shown in the rink's local time and in Israel.`}
      />

      <section className="bg-night pb-20 pt-12" aria-labelledby="games-title">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded border border-line bg-night-deep p-1" role="tablist" aria-label="Show games">
              {(
                [
                  ["all", "All games"],
                  ["results", "Results"],
                  ["upcoming", "Upcoming"],
                ] as const
              ).map(([k, l]) => (
                <button key={k} role="tab" aria-selected={view === k} onClick={() => setView(k)} className={`rounded px-4 py-2 text-sm font-bold ${view === k ? "bg-sand text-night" : "text-ice-white hover:text-sand"}`}>
                  {l}
                </button>
              ))}
            </div>
            <dl className="tabular flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {[
                ["Record", `${rec.w}–${rec.l + rec.otl}`],
                ["Goals", `${rec.gf}–${rec.ga}`],
                ["Played", rec.played],
              ].map(([k, v]) => (
                <div key={k as string} className="flex items-baseline gap-2">
                  <dt className="label text-[11px] text-muted-text">{k}</dt>
                  <dd className="font-display text-lg font-black">{v}</dd>
                </div>
              ))}
              <Link to="/stats" className="label self-center text-xs text-sand hover:text-sand-soft">
                Full stats →
              </Link>
            </dl>
          </div>

          <h2 id="games-title" className="sr-only">
            Schedule
          </h2>

          {[...months.entries()].map(([month, list]) => (
            <div key={month} className="mb-6">
              <p className="label mb-2 text-sm text-sand">{month}</p>
              <ol className="overflow-hidden rounded border border-line">
                {list.map((g) => (
                  <GameRow key={g.id} g={g} n={number.get(g.id)} />
                ))}
              </ol>
            </div>
          ))}

          {(view !== "results" && upcoming.length === 0) && (
            <div className="grid items-center gap-6 rounded border-2 border-dashed border-sand/60 bg-night-deep p-6 lg:grid-cols-2 lg:p-8">
              <div>
                <p className="label text-sm text-sand">Next weekend series</p>
                <p className="mt-1 font-display text-3xl font-black uppercase">Being booked now</p>
                <p className="mt-2 text-muted-text">We post each stop as soon as it's confirmed. Leave your email and we'll tell you when the tour comes near you.</p>
                <Link to="/host" className="label mt-4 inline-block text-sm text-sand hover:text-sand-soft">
                  Want us in your city? →
                </Link>
              </div>
              <SignupForm
                source="tickets"
                idPrefix="schedule-notify"
                fields={[
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "country", label: "Your city" },
                ]}
                submitLabel="Tell me"
                successTitle="You'll hear first"
              />
            </div>
          )}

          <p className="mt-6 text-sm text-muted-text">
            Official league schedule and stats:{" "}
            <a href={club.statsUrl} target="_blank" rel="noreferrer" className="text-ice underline hover:text-sand">
              Mountain Hockey League
            </a>
            . The October games were played under the team's former name, {club.formerName}.
          </p>
        </div>
      </section>
    </>
  );
};

export default Schedule;
