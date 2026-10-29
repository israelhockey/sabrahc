import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import PageHero from "@/components/PageHero";
import Jersey from "@/components/Jersey";
import { players, staff, type Player } from "@/data/club";
import { goalieStats, skaterStats } from "@/lib/games";

const skaters = skaterStats();
const goalies = goalieStats();
const full = (p: Player) => `${p.firstName} ${p.lastName}`;
const line = (p: Player) => skaters.find((x) => x.name === full(p));
const gline = (p: Player) => goalies.find((x) => x.name === full(p));

const GROUPS: { title: string; he: string; match: Player["position"][] }[] = [
  { title: "Goalies", he: "שוערים", match: ["Goalie"] },
  { title: "Forwards", he: "חלוצים", match: ["Forward"] },
  { title: "Defence", he: "הגנה", match: ["Defence"] },
  { title: "Skaters", he: "שחקני שדה", match: ["Skater"] },
];

const statText = (p: Player) => {
  const g = gline(p);
  if (g) return `${g.gp} GP · ${g.svPct} SV%`;
  const s = line(p);
  return s ? `${s.gp} GP · ${s.g} G · ${s.a} A · ${s.pts} P` : "";
};

/** Roster card: the photo when we have one, the jersey with his number until then. */
const PlayerCard = ({ p }: { p: Player }) => (
  <Link to={`/team/${p.slug}`} className="group relative flex flex-col overflow-hidden rounded border border-line bg-night-2 transition-colors hover:border-sand">
    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-night to-night-deep">
      <span
        aria-hidden="true"
        className="tabular pointer-events-none absolute -right-3 -top-8 font-display text-[150px] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "2px rgba(232,181,71,0.35)" }}
      >
        {p.number}
      </span>
      {p.photo ? (
        <img src={p.photo} alt={full(p)} loading="lazy" className="relative h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="relative flex h-full items-end justify-center pb-6">
          <Jersey number={p.number} className="h-auto w-[72%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1" />
        </div>
      )}
      {p.captain && (
        <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand font-display text-lg font-black text-night">{p.captain}</span>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-sand opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="tabular font-display text-lg font-black text-sand">#{p.number}</p>
        <p className={`label text-[11px] ${p.position === "Goalie" ? "rounded bg-sand px-1.5 font-black text-night" : "text-muted-text"}`}>{p.position === "Skater" ? "" : p.position}</p>
      </div>
      <h3 className="mt-1 font-display text-xl font-black uppercase leading-[1.05]">
        <span className="block text-base font-bold normal-case text-[#D9E3DC]">{p.firstName}</span>
        {p.lastName}
      </h3>
      {statText(p) && <p className="tabular mt-auto pt-3 text-xs font-semibold text-muted-text">{statText(p)}</p>}
    </div>
  </Link>
);

const Team = () => {
  const [view, setView] = useState<"cards" | "list">("cards");
  const sorted = [...players].sort((a, b) => a.number - b.number);
  // until positions are confirmed (everyone but the goalie shows as "Skater"), show one roster grid
  const positionsKnown = players.some((p) => p.position === "Forward" || p.position === "Defence");
  const groups = positionsKnown
    ? GROUPS.map((g) => ({ ...g, list: sorted.filter((p) => g.match.includes(p.position)) })).filter((g) => g.list.length)
    : [{ title: "Players", he: "שחקנים", match: [] as Player["position"][], list: sorted }];

  return (
    <>
      <PageHero
        compact
        he="הקבוצה"
        eyebrow="2026–27 roster"
        title="The Team"
        intro="Israeli and Jewish players who live across North America and come together for every weekend series. Next season, the road leads home to Israel."
      />

      <section className="bg-night py-12 lg:py-16" aria-labelledby="roster-title">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 id="roster-title" className="font-display text-3xl font-black uppercase sm:text-4xl">
              Roster <span className="tabular text-muted-text">· {players.length}</span>
            </h2>
            <div className="inline-flex rounded border border-line bg-night-deep p-1" role="tablist" aria-label="Roster view">
              {(
                [
                  ["cards", "Cards", LayoutGrid],
                  ["list", "List", List],
                ] as const
              ).map(([k, l, Icon]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={view === k}
                  onClick={() => setView(k)}
                  className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold ${view === k ? "bg-sand text-night" : "text-ice-white hover:text-sand"}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" /> {l}
                </button>
              ))}
            </div>
          </div>

          {view === "cards" ? (
            groups.map((g) => (
              <div key={g.title} className="mb-12 last:mb-0">
                <div className="mb-4 flex items-center gap-4">
                  <p className="font-display text-xl font-black uppercase">
                    {g.title} <span lang="he" className="ml-1 text-base text-sand">{g.he}</span>
                  </p>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  <span className="tabular text-sm text-muted-text">{g.list.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {g.list.map((p) => (
                    <PlayerCard key={p.slug} p={p} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="overflow-x-auto rounded border border-line">
              <table className="tabular w-full min-w-[640px] text-sm">
                <thead className="label bg-night-2 text-[11px] text-muted-text">
                  <tr>
                    {["#", "Player", "Pos", "Hometown", "GP", "G", "A", "P"].map((h, i) => (
                      <th key={h} scope="col" className={`px-3 py-3 font-bold ${i < 4 ? "text-left" : "text-right"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p) => {
                    const s = line(p);
                    return (
                      <tr key={p.slug} className="border-t border-line odd:bg-night even:bg-night-deep hover:bg-night-2">
                        <td className="px-3 py-2.5 font-display font-black text-sand">{p.number}</td>
                        <td className="whitespace-nowrap px-3 py-2.5 font-semibold">
                          <Link to={`/team/${p.slug}`} className="hover:text-sand">
                            {full(p)}
                          </Link>
                          {p.captain && <span className="ml-2 rounded bg-sand px-1.5 text-[10px] font-black text-night">{p.captain}</span>}
                        </td>
                        <td className="px-3 py-2.5 text-muted-text">{p.position === "Skater" ? "–" : p.position}</td>
                        <td className="px-3 py-2.5 text-muted-text">{p.hometown ?? "–"}</td>
                        <td className="px-3 py-2.5 text-right">{s?.gp ?? gline(p)?.gp ?? 0}</td>
                        <td className="px-3 py-2.5 text-right">{s?.g ?? 0}</td>
                        <td className="px-3 py-2.5 text-right">{s?.a ?? 0}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-sand">{s?.pts ?? 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-6 text-sm text-muted-text">
            Numbers and lineups from the official game sheets. Positions and player photos are being added.{" "}
            <Link to="/stats" className="text-sand hover:text-sand-soft">
              Full stats →
            </Link>
          </p>
        </div>
      </section>

      {staff.length > 0 && (
        <section className="border-t border-line bg-night-deep py-16" aria-labelledby="staff-title">
          <div className="container-site">
            <h2 id="staff-title" className="mb-6 font-display text-3xl font-black uppercase">
              Behind the bench
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((s) => (
                <div key={s.name} className="rounded border border-line bg-night-2 p-5">
                  {s.photo && <img src={s.photo} alt={s.name} className="mb-4 aspect-square w-full rounded object-cover" />}
                  <p className="font-display text-xl font-black uppercase">{s.name}</p>
                  <p className="text-sand">{s.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="crowd border-t border-line py-16">
        <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="label text-xs text-sand">
              Try-outs · <span lang="he">מבחנים</span>
            </p>
            <h2 className="mt-1 font-display text-3xl font-black uppercase sm:text-4xl">Want to wear the lion?</h2>
            <p className="mt-2 max-w-xl text-[#D9E3DC]">Israeli and Jewish players in North America can apply to join the tour roster.</p>
          </div>
          <Link to="/contact#tryouts" className="btn-primary">
            Apply for try-outs
          </Link>
        </div>
      </section>
    </>
  );
};

export default Team;
