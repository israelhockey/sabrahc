import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import { players, firsts } from "@/data/club";
import { CamFrame, StatGrid } from "@/components/broadcast";
import { skaterStats, goalieStats } from "@/lib/games";
import NotFound from "./NotFound";

const Player = () => {
  const { slug } = useParams();
  const p = players.find((x) => x.slug === slug);

  useEffect(() => {
    if (p) document.title = `#${p.number} ${p.firstName} ${p.lastName} — Sabra HC`;
    return () => {
      document.title = "Sabra HC — Israel's Flagship Hockey Club";
    };
  }, [p]);

  if (!p) return <NotFound />;
  const name = `${p.firstName} ${p.lastName}`;
  const journey = [...(p.journey ?? []), { seasons: "2026–27", club: "Sabra HC", league: "MHL", note: "The North American Tour" }];
  const s = skaterStats().find((x) => x.name === `${p.firstName} ${p.lastName}`);
  const gs = goalieStats().find((x) => x.name === `${p.firstName} ${p.lastName}`);
  const info = [
    ["Position", p.position],
    ["Shoots", p.shoots],
    ["Born", p.birthYear],
    ["Hometown", p.hometown],
    ["Last club", p.lastClub],
  ].filter(([, v]) => v !== undefined && v !== "") as [string, string | number][];
  const mine = firsts.filter((f) => f.detail?.includes(`${p.firstName} ${p.lastName}`));

  return (
    <>
      <section className="border-b border-line bg-night-deep">
        <div className="container-site pt-6">
          <Link to="/team" className="label inline-flex items-center gap-2 text-sm text-ice hover:text-sand">
            <ArrowLeft className="h-4 w-4" /> The team
          </Link>
        </div>
        <div className="container-site grid gap-8 pb-12 pt-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <CamFrame label={`CAM · ${p.lastName} portrait`} corners="diagonal" image={p.photo} imageAlt={name} className="aspect-[4/5] border border-line">
            <span
              aria-hidden="true"
              className="outline-num tabular absolute -right-3 -top-8 font-display text-[260px] font-black leading-none"
            >
              {p.number}
            </span>
            {!p.photo && <img src={crest} alt="" className="absolute inset-0 m-auto w-1/2 opacity-20" />}
          </CamFrame>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="tag-sand">#{p.number} · {p.position}</span>
              {p.tag && <span className="tag-ice">{p.tag}</span>}
              {p.captain && <span className="tag-white">{p.captain === "C" ? "Captain" : "Alternate"}</span>}
            </div>
            <h1 className="mt-3 font-display text-7xl font-black uppercase leading-[0.84] sm:text-8xl lg:text-[140px]">
              {p.firstName}
              <br />
              <span className="text-sand">{p.lastName}</span>
            </h1>
            {info.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                {info.map(([k, v]) => (
                  <div key={k} className="bg-night px-4 py-3">
                    <dt className="label text-xs text-muted-text">{k}</dt>
                    <dd className="font-display text-2xl font-black uppercase">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {p.eliteProspectsUrl && (
              <a href={p.eliteProspectsUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-5">
                EliteProspects profile
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-night py-16" aria-labelledby="statline">
        <div className="container-site">
          <h2 id="statline" className="label mb-4 text-sm text-muted-text">
            2026–27 · Sabra HC
          </h2>
          <StatGrid
            cols={4}
            stats={p.position === "Goalie" ? [{ v: gs?.gp ?? 0, l: "GP" }, { v: gs ? `${gs.w}–${gs.l}` : "0–0", l: "W–L" }, { v: gs?.saves ?? 0, l: "SV" }, { v: gs?.svPct ?? "–", l: "SV%" }] : [{ v: s?.gp ?? 0, l: "GP" }, { v: s?.g ?? 0, l: "G" }, { v: s?.a ?? 0, l: "A" }, { v: s?.pts ?? 0, l: "PTS" }]}
            highlight="PTS"
          />
        </div>
      </section>

      <section className="border-y border-line bg-night-deep py-20" aria-labelledby="journey-title">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="tag-ice">The journey</span>
            <h2 id="journey-title" className="mt-2 font-display text-6xl font-black uppercase leading-[0.88] sm:text-7xl">
              {p.hometown ? `From ${p.hometown}` : "The road"}
              <br />
              <span className="text-sand">to the lion</span>
            </h2>
            {p.quote && (
              <blockquote className="mt-8 border-l-[6px] border-sand bg-night px-6 py-5 font-display text-3xl font-bold uppercase leading-tight">
                “{p.quote}”
                <footer className="label mt-3 text-sm text-muted-text">{name}</footer>
              </blockquote>
            )}
          </div>
          <ol className="relative ml-3 border-l-2 border-line">
            {journey.map((s, i) => {
              const last = i === journey.length - 1;
              return (
                <li key={`${s.seasons}-${s.club}`} className="relative pb-8 pl-8 last:pb-0">
                  <span className={`absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-night-deep ${last ? "bg-sand" : "bg-ice"}`} aria-hidden="true" />
                  <p className="label tabular text-sm text-muted-text">{s.seasons}</p>
                  <p className={`font-display text-4xl font-black uppercase leading-none ${last ? "text-sand" : ""}`}>{s.club}</p>
                  <p className="text-muted-text">
                    {s.league}
                    {s.note ? ` · ${s.note}` : ""}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-night py-20" aria-labelledby="pfirsts">
        <div className="container-site">
          <span className="tag-sand">In the jersey</span>
          <h2 id="pfirsts" className="mt-2 font-display text-5xl font-black uppercase sm:text-6xl">
            {p.lastName}'s firsts
          </h2>
          {mine.length ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mine.map((f) => (
                <li key={f.title} className="border border-sand bg-sand/10 p-5">
                  <p className="font-display text-3xl font-black uppercase">{f.title}</p>
                  <p className="label mt-2 text-sm">{f.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-lg text-muted-text">Firsts in a Sabra HC jersey are logged here as they happen, starting with the first season on tour.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Player;
