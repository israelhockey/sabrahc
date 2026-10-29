import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { club } from "@/data/club";
import { goalieStats, skaterTable, teamTable, type SkaterRow } from "@/lib/games";

type Col = { key: keyof SkaterRow; label: string; title: string; fmt?: (v: number) => string };

const SKATER_COLS: Col[] = [
  { key: "gp", label: "GP", title: "Games played" },
  { key: "g", label: "G", title: "Goals" },
  { key: "a", label: "A", title: "Assists" },
  { key: "pts", label: "P", title: "Points" },
  { key: "ppg", label: "PPG", title: "Power-play goals" },
  { key: "ppa", label: "PPA", title: "Power-play assists" },
  { key: "gwg", label: "GWG", title: "Game-winning goals" },
  { key: "pPerGp", label: "P/GP", title: "Points per game", fmt: (v) => v.toFixed(2) },
];

const pct = (v: number) => v.toFixed(3).replace(/^0/, "");

/** A leader card in the NHL.com style: the leader big, the next four underneath. */
const Leader = ({ title, rows, value }: { title: string; rows: SkaterRow[]; value: (r: SkaterRow) => number }) => {
  const list = [...rows].sort((a, b) => value(b) - value(a) || b.pts - a.pts).slice(0, 5);
  const [top, ...rest] = list;
  if (!top) return null;
  return (
    <div className="flex flex-col rounded border border-line bg-night-2">
      <p className="label border-b border-line px-5 py-3 text-xs text-sand">{title}</p>
      <div className="flex items-end justify-between gap-3 px-5 pb-4 pt-5">
        <div className="min-w-0">
          <p className="tabular font-display text-sm font-black text-muted-text">#{top.number ?? "–"}</p>
          <p className="truncate font-display text-xl font-black uppercase leading-tight">{top.name}</p>
        </div>
        <p className="tabular font-display text-5xl font-black leading-none text-sand">{value(top)}</p>
      </div>
      <ol className="mt-auto border-t border-line text-sm">
        {rest.map((r, i) => (
          <li key={r.name} className="tabular flex items-center justify-between border-b border-line px-5 py-2 last:border-b-0">
            <span className="truncate">
              <span className="mr-3 text-muted-text">{i + 2}</span>
              {r.name}
            </span>
            <span className="font-bold text-ice-white">{value(r)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Th = ({ children, title, active, onClick, left }: { children: React.ReactNode; title?: string; active?: boolean; onClick?: () => void; left?: boolean }) => (
  <th scope="col" title={title} aria-sort={active ? "descending" : undefined} className={`whitespace-nowrap px-3 py-3 font-bold ${left ? "text-left" : "text-right"} ${active ? "bg-sand text-night" : ""}`}>
    {onClick ? (
      <button type="button" onClick={onClick} className={`inline-flex items-center gap-1 ${active ? "" : "hover:text-sand"}`}>
        {children}
        {active && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    ) : (
      children
    )}
  </th>
);

const Stats = () => {
  const [tab, setTab] = useState<"skaters" | "goalies" | "team">("skaters");
  const [sort, setSort] = useState<keyof SkaterRow>("pts");
  const skaters = useMemo(() => skaterTable(), []);
  const goalies = goalieStats();
  const team = teamTable();
  const sorted = [...skaters].sort((a, b) => Number(b[sort]) - Number(a[sort]) || b.pts - a.pts || b.g - a.g || a.name.localeCompare(b.name));

  return (
    <>
      <PageHero compact he="סטטיסטיקה" eyebrow={`${club.season} · ${club.leagueShort}`} title="Stats" intro="Every goal, assist and save from the official game sheets, updated after each weekend series." />

      <section className="bg-night py-14" aria-labelledby="leaders-title">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 id="leaders-title" className="font-display text-3xl font-black uppercase sm:text-4xl">
              Stat leaders
            </h2>
            <p className="tabular text-sm text-muted-text">
              {team.played} games played · {team.w}–{team.l + team.otl} record
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Leader title="Points" rows={skaters} value={(r) => r.pts} />
            <Leader title="Goals" rows={skaters} value={(r) => r.g} />
            <Leader title="Assists" rows={skaters} value={(r) => r.a} />
            {goalies[0] ? (
              <div className="flex flex-col rounded border border-line bg-night-2">
                <p className="label border-b border-line px-5 py-3 text-xs text-sand">Save percentage</p>
                <div className="flex items-end justify-between gap-3 px-5 pb-4 pt-5">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-black text-muted-text">Goalie</p>
                    <p className="truncate font-display text-xl font-black uppercase leading-tight">{goalies[0].name}</p>
                  </div>
                  <p className="tabular font-display text-5xl font-black leading-none text-sand">{goalies[0].svPct}</p>
                </div>
                <dl className="tabular mt-auto grid grid-cols-3 border-t border-line text-center text-sm">
                  {[
                    ["Saves", goalies[0].saves],
                    ["Shots", goalies[0].sa],
                    ["W–L", `${goalies[0].w}–${goalies[0].l}`],
                  ].map(([k, v]) => (
                    <div key={k as string} className="border-r border-line px-2 py-2.5 last:border-r-0">
                      <dd className="font-bold text-ice-white">{v}</dd>
                      <dt className="label text-[10px] text-muted-text">{k}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-night-deep py-14" aria-labelledby="tables-title">
        <div className="container-site">
          <h2 id="tables-title" className="sr-only">
            Stats tables
          </h2>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded border border-line bg-night p-1" role="tablist" aria-label="Stats tables">
              {(
                [
                  ["skaters", "Skaters"],
                  ["goalies", "Goalies"],
                  ["team", "Team"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`rounded px-4 py-2 text-sm font-bold ${tab === k ? "bg-sand text-night" : "text-ice-white hover:text-sand"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            {tab === "skaters" && <p className="text-xs text-muted-text">Tap a column to sort</p>}
          </div>

          {tab === "skaters" && (
            <div className="overflow-x-auto rounded border border-line">
              <table className="tabular w-full min-w-[760px] text-sm">
                <thead className="label bg-night-2 text-[11px] text-muted-text">
                  <tr>
                    <Th left>Rank</Th>
                    <th scope="col" className="sticky left-0 z-10 whitespace-nowrap bg-night-2 px-3 py-3 text-left font-bold">Player</th>
                    <Th>#</Th>
                    {SKATER_COLS.map((c) => (
                      <Th key={c.key} title={c.title} active={sort === c.key} onClick={() => setSort(c.key)}>
                        {c.label}
                      </Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s, i) => (
                    <tr key={s.name} className="border-t border-line odd:bg-night even:bg-night-deep hover:bg-night-2">
                      <td className="px-3 py-2.5 text-muted-text">{i + 1}</td>
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-inherit px-3 py-2.5 text-left font-semibold shadow-[6px_0_8px_-6px_rgba(0,0,0,0.6)]">
                        {s.slug ? (
                          <Link to={`/team/${s.slug}`} className="text-ice-white hover:text-sand">
                            {s.name}
                          </Link>
                        ) : (
                          s.name
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right text-muted-text">{s.number ?? "–"}</td>
                      {SKATER_COLS.map((c) => (
                        <td key={c.key} className={`px-3 py-2.5 text-right ${sort === c.key ? "bg-sand/10 font-bold text-sand" : ""}`}>
                          {c.fmt ? c.fmt(Number(s[c.key])) : String(s[c.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "goalies" && (
            <div className="overflow-x-auto rounded border border-line">
              <table className="tabular w-full min-w-[640px] text-sm">
                <thead className="label bg-night-2 text-[11px] text-muted-text">
                  <tr>
                    <Th left>Goalie</Th>
                    <Th title="Games played">GP</Th>
                    <Th title="Wins">W</Th>
                    <Th title="Losses">L</Th>
                    <Th title="Shots against">SA</Th>
                    <Th title="Saves">SV</Th>
                    <Th title="Goals against">GA</Th>
                    <Th title="Goals against per game played">GA/GP</Th>
                    <Th title="Save percentage" active>
                      SV%
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {goalies.map((g) => (
                    <tr key={g.name} className="border-t border-line bg-night">
                      <td className="px-3 py-2.5 text-left font-semibold">{g.name}</td>
                      <td className="px-3 py-2.5 text-right">{g.gp}</td>
                      <td className="px-3 py-2.5 text-right">{g.w}</td>
                      <td className="px-3 py-2.5 text-right">{g.l}</td>
                      <td className="px-3 py-2.5 text-right">{g.sa}</td>
                      <td className="px-3 py-2.5 text-right">{g.saves}</td>
                      <td className="px-3 py-2.5 text-right">{g.sa - g.saves}</td>
                      <td className="px-3 py-2.5 text-right">{g.gp ? ((g.sa - g.saves) / g.gp).toFixed(2) : "–"}</td>
                      <td className="bg-sand/10 px-3 py-2.5 text-right font-bold text-sand">{g.svPct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "team" && (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="overflow-x-auto rounded border border-line">
                <table className="tabular w-full min-w-[560px] text-sm">
                  <thead className="label bg-night-2 text-[11px] text-muted-text">
                    <tr>
                      <Th left>Team</Th>
                      <Th title="Games played">GP</Th>
                      <Th title="Wins">W</Th>
                      <Th title="Losses">L</Th>
                      <Th title="Goals for">GF</Th>
                      <Th title="Goals against">GA</Th>
                      <Th title="Goal difference">DIFF</Th>
                      <Th title="Power-play goals">PPG</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-line bg-night">
                      <td className="px-3 py-3 text-left font-semibold">Sabra HC</td>
                      <td className="px-3 py-3 text-right">{team.played}</td>
                      <td className="px-3 py-3 text-right">{team.w}</td>
                      <td className="px-3 py-3 text-right">{team.l + team.otl}</td>
                      <td className="px-3 py-3 text-right">{team.gf}</td>
                      <td className="px-3 py-3 text-right">{team.ga}</td>
                      <td className="px-3 py-3 text-right font-bold text-sand">
                        {team.gf - team.ga >= 0 ? "+" : ""}
                        {team.gf - team.ga}
                      </td>
                      <td className="px-3 py-3 text-right">{team.ppg}</td>
                    </tr>
                  </tbody>
                </table>
                <dl className="tabular grid grid-cols-2 border-t border-line sm:grid-cols-4">
                  {[
                    ["Goals / game", team.gfPerGp.toFixed(2)],
                    ["Against / game", team.gaPerGp.toFixed(2)],
                    ["Shots / game", team.sfPerGp.toFixed(1)],
                    ["Shooting %", `${(team.shPct * 100).toFixed(1)}%`],
                    ["Shots against / game", team.saPerGp.toFixed(1)],
                    ["Team save %", pct(team.svPct)],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-r border-line bg-night-deep p-4">
                      <dd className="font-display text-2xl font-black text-ice-white">{v}</dd>
                      <dt className="label mt-0.5 text-[10px] text-muted-text">{k}</dt>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded border border-line bg-night-2 p-5">
                <p className="label text-xs text-sand">Goals by period</p>
                <ul className="mt-4 space-y-4">
                  {team.byPeriod.map((p, i) => {
                    const max = Math.max(1, ...team.byPeriod.flatMap((x) => [x.for, x.against]));
                    return (
                      <li key={i}>
                        <p className="label mb-1.5 text-[11px] text-muted-text">{["1st", "2nd", "3rd"][i]} period</p>
                        <div className="tabular flex items-center gap-2 text-sm">
                          <span className="w-10 text-muted-text">For</span>
                          <span className="h-3 rounded-sm bg-sand" style={{ width: `${(p.for / max) * 70}%` }} />
                          <span className="font-bold">{p.for}</span>
                        </div>
                        <div className="tabular mt-1 flex items-center gap-2 text-sm">
                          <span className="w-10 text-muted-text">Agst</span>
                          <span className="h-3 rounded-sm bg-[#5A6B5F]" style={{ width: `${(p.against / max) * 70}%` }} />
                          <span className="font-bold">{p.against}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          <p className="mt-6 text-sm text-muted-text">
            Source: official {club.leagueShort} game sheets. Full league stats on the{" "}
            <a href={club.statsUrl} target="_blank" rel="noreferrer" className="text-ice underline hover:text-sand">
              Mountain Hockey League site
            </a>
            . The October games were played under the team's former name, {club.formerName}.
          </p>
        </div>
      </section>
    </>
  );
};

export default Stats;
