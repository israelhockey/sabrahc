import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { LineupArt } from "@/components/motion";
import SectionHeading from "@/components/SectionHeading";
import { players, staff, type Player } from "@/data/club";
import crest from "@/assets/sabra-crest.webp";
import { skaterStats } from "@/lib/games";

const filters = ["All", ...Array.from(new Set(players.map((p) => p.position)))] as string[];

const line = skaterStats();
const stat = (p: Player) => {
  const s = line.find((x) => x.name === `${p.firstName} ${p.lastName}`);
  return s ? `${s.gp} GP · ${s.g} G · ${s.a} A` : "";
};

const PlayerCard = ({ p }: { p: Player }) => (
  <Link to={`/team/${p.slug}`} className="lift group relative block overflow-hidden border border-line bg-night-2">
    <div className="relative aspect-[4/5] overflow-hidden bg-night">
      <span
        aria-hidden="true"
        className="tabular absolute -right-2 -top-6 font-display text-[180px] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "2px hsl(var(--sand) / 0.5)" }}
      >
        {p.number}
      </span>
      {p.photo ? (
        <img src={p.photo} alt={`${p.firstName} ${p.lastName}`} className="relative h-full w-full object-cover object-top" />
      ) : (
        <img src={crest} alt="" className="relative mx-auto mt-16 w-1/2 opacity-30" />
      )}
      {p.captain && (
        <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand font-display text-xl font-black text-night">
          {p.captain}
        </span>
      )}
    </div>
    <div className="p-5">
      <p className="tabular font-display text-xl font-black text-sand">#{p.number}</p>
      <h3 className="text-3xl font-black leading-tight text-ice-white">
        {p.firstName} <span className="block">{p.lastName}</span>
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-text">{p.position}</span>
        {p.tag && <span className="rounded bg-night px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-ice">{p.tag}</span>}
        {stat(p) && <span className="tabular text-xs text-sand">{stat(p)}</span>}
      </div>
      <p className="label mt-4 text-sm text-sand">Player journey →</p>
    </div>
  </Link>
);

const Team = () => {
  const [filter, setFilter] = useState("All");
  const list = players
    .filter((p) => filter === "All" || p.position === filter)
    .sort((a, b) => a.number - b.number);

  return (
    <>
      <PageHero cam="CAM 2 · Tactics board" status="Roster live" tone="sand" art={<LineupArt />} eyebrow="2026–27 roster" title="The Team" intro="Israeli and Jewish players who live across North America and join the tour weekend by weekend. Next season, the road leads home to Israel." />

      <section className="bg-night py-20" aria-labelledby="roster-title">
        <div className="container-site">
          <h2 id="roster-title" className="sr-only">
            Roster
          </h2>
          {players.length === 0 ? (
            <div className="rounded-lg border border-line bg-night-2 p-10 text-center">
              <p className="eyebrow">Roster</p>
              <p className="mt-2 font-display text-5xl font-black uppercase text-ice-white">Roster reveal coming soon</p>
              <p className="mx-auto mt-3 max-w-xl text-muted-text">Signings will be announced here and in the news as they are confirmed.</p>
              <Link to="/contact#tryouts" className="btn-primary mt-8">
                Want to wear the lion? Try-outs
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by position">
                {filters.map((f) => (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={filter === f}
                    onClick={() => setFilter(f)}
                    className={filter === f ? "chip-on" : "chip-off"}
                  >
                    {f === "All" ? "All" : f === "Defence" ? "Defence" : `${f}s`}
                  </button>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((p) => (
                  <PlayerCard key={p.slug} p={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-ice-white py-20" aria-labelledby="staff-title">
        <div className="container-site">
          <SectionHeading id="staff-title" tone="light" eyebrow="Behind the bench" title="Coaches and staff" />
          {staff.length === 0 ? (
            <p className="text-lg text-[#3B4A63]">Coaching and staff announcements are coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((s) => (
                <div key={s.name} className="rounded-lg border border-[#D5DEE6] bg-white p-6">
                  {s.photo && <img src={s.photo} alt={s.name} className="mb-4 aspect-square w-full rounded object-cover" />}
                  <h3 className="text-3xl font-black text-night">{s.name}</h3>
                  <p className="text-sand-dark">{s.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-night py-20">
        <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-5xl font-black text-ice-white sm:text-6xl">Want to wear the lion?</h2>
          <Link to="/contact#tryouts" className="btn-primary">
            Apply for try-outs
          </Link>
        </div>
      </section>
    </>
  );
};

export default Team;
