import { useEffect, useId, useRef, useState } from "react";
import { geoConicEqualArea, geoDistance } from "d3-geo";
import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { targetMarkets, tourStops, type Game, type Market, type TourStop } from "@/data/club";
import { mapDots } from "@/data/mapDots";
import { gameDate, gameTime, periodLabel, seasonRecord } from "@/lib/games";

const GOLD = "#E8B547";
const CREAM = "#F3E9D2";

/* ---------- The tour map ---------- */

const proj = geoConicEqualArea()
  .parallels([29.5, 45.5])
  .rotate([97, 0])
  .scale(mapDots.scale)
  .translate(mapDots.translate as unknown as [number, number]);
const at = (lon: number, lat: number) => proj([lon, lat]) ?? [0, 0];

const DOT_FILL: Record<string, string> = { us: "#4F9673", ca: "#7BAE8F", mx: "#2A5E45", o: "#2A5E45" };
/** One SVG path per country: every dot is a tiny circle, so the whole map is 4 elements. */
const dotPaths = Object.entries(mapDots.runs).map(([k, runs]) => {
  const { step } = mapDots;
  const r = 2.2;
  let d = "";
  for (const run of runs.split(",")) {
    const [row, col, len] = run.split(".").map(Number);
    for (let i = 0; i < len; i++) {
      const x = step / 2 + (col + i) * step;
      const y = step / 2 + row * step;
      d += `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
    }
  }
  return { k, d };
});

// label placement per city so neighbours don't collide: [dx, dy, anchor]
const LBL: Record<string, [number, number, "start" | "end"]> = {
  "Los Angeles": [-12, -6, "end"],
  "San Diego": [-12, 14, "end"],
  "Las Vegas": [12, -4, "start"],
  Phoenix: [12, 10, "start"],
  Chicago: [-12, -4, "end"],
  Toronto: [-12, -6, "end"],
  Montreal: [12, -6, "start"],
  "New York": [12, 14, "start"],
  Boston: [12, 2, "start"],
  Tampa: [-12, 4, "end"],
  "South Florida": [12, 6, "start"],
  Vancouver: [12, 4, "start"],
};

const MILES_PER_RADIAN = 3958.8;

type Pin =
  | { kind: "stop"; id: string; x: number; y: number; stop: TourStop }
  | { kind: "market"; id: string; x: number; y: number; market: Market };

/** Counts up from 0 once it scrolls into view. */
const useCountUp = (target: number, run: boolean) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return setN(target);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
};

const Counter = ({ value, label, run, suffix = "" }: { value: number; label: string; run: boolean; suffix?: string }) => {
  const n = useCountUp(value, run);
  return (
    <div className="bg-night-deep px-4 py-3">
      <p className="tabular font-display text-2xl font-black text-sand sm:text-3xl">
        {n.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="label mt-0.5 text-[11px] text-muted-text">{label}</p>
    </div>
  );
};

/**
 * The tour map: North America as a dot matrix in the club colours, with the stops we've played in gold,
 * the next stop pulsing, the route drawn between them, and the cities on our list. Tap a city for details.
 * Stops appear automatically once they have lat/lon in tourStops.
 */
export const TourMap = ({ className = "" }: { light?: boolean; className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stops = tourStops.filter((s) => s.lat != null && s.lon != null && s.status !== "planned");
  const stopCities = new Set(stops.map((s) => s.city));
  const pins: Pin[] = [
    ...targetMarkets
      .filter((m) => !stopCities.has(m.city))
      .map((m) => {
        const [x, y] = at(m.lon, m.lat);
        return { kind: "market" as const, id: `m-${m.city}`, x, y, market: m };
      }),
    ...stops.map((s) => {
      const [x, y] = at(s.lon!, s.lat!);
      return { kind: "stop" as const, id: s.id, x, y, stop: s };
    }),
  ];
  const stopPins = pins.filter((p): p is Extract<Pin, { kind: "stop" }> => p.kind === "stop");
  const defaultId = (stopPins.find((p) => p.stop.status === "next") ?? stopPins[stopPins.length - 1])?.id ?? pins[0]?.id;
  const [selected, setSelected] = useState<string | undefined>(defaultId);
  const sel = pins.find((p) => p.id === selected);

  // the route, stop to stop, as gentle arcs
  const route = stopPins
    .slice(1)
    .map((p, i) => {
      const a = stopPins[i];
      const mx = (a.x + p.x) / 2;
      const my = (a.y + p.y) / 2 - Math.hypot(p.x - a.x, p.y - a.y) * 0.22;
      return `M${a.x} ${a.y}Q${mx} ${my} ${p.x} ${p.y}`;
    })
    .join("");

  const played = stops.filter((s) => s.status === "played");
  const miles = played.slice(1).reduce((sum, s, i) => sum + geoDistance([played[i].lon!, played[i].lat!], [s.lon!, s.lat!]) * MILES_PER_RADIAN, 0);
  const rec = seasonRecord();

  return (
    <div ref={wrap} className={`bg-night ${className}`}>
      <svg viewBox={`0 0 ${mapDots.w} ${mapDots.h}`} className="block h-auto w-full" role="img" aria-labelledby={`map-t-${uid}`}>
        <title id={`map-t-${uid}`}>Map of Sabra HC's North American tour: stops played, the next stop, and the cities on our list</title>
        <g className={`transition-opacity duration-1000 ${seen ? "opacity-100" : "opacity-0"}`}>
          {dotPaths.map(({ k, d }) => (
            <path key={k} d={d} fill={DOT_FILL[k] ?? DOT_FILL.o} />
          ))}
        </g>

        {route && (
          <path
            d={route}
            fill="none"
            stroke={GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={seen ? 0 : 1}
            style={{ transition: "stroke-dashoffset 2.2s ease-in-out 0.4s" }}
          />
        )}

        {pins.map((p, i) => {
          const isSel = p.id === selected;
          const label = p.kind === "stop" ? p.stop.city ?? "" : p.market.city;
          const [dx, dy, anchor] = LBL[label] ?? [13, 5, "start"];
          const status = p.kind === "stop" ? p.stop.status : "list";
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={p.kind === "stop" ? `${label}: ${status === "played" ? `played, ${p.stop.record ?? ""}` : "next stop"}` : `${label}: on our list`}
              aria-pressed={isSel}
              onClick={() => setSelected(p.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(p.id))}
              className="cursor-pointer outline-none [&:focus-visible_.pin-ring]:opacity-100"
              style={{ opacity: seen ? 1 : 0, transition: `opacity .5s ease ${0.3 + i * 0.05}s` }}
            >
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              {status === "list" ? (
                <circle cx={p.x} cy={p.y} r={isSel ? 7 : 5.5} fill={isSel ? GOLD : CREAM} stroke="#0A2A1E" strokeWidth="2" />
              ) : (
                <>
                  {status === "next" && <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={GOLD} strokeWidth="3" className="mg-ring" />}
                  <circle cx={p.x} cy={p.y} r="10" fill={GOLD} stroke="#0A2A1E" strokeWidth="3" />
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#0A2A1E" />
                </>
              )}
              <circle cx={p.x} cy={p.y} r="15" fill="none" stroke={CREAM} strokeWidth="2" className={`pin-ring ${isSel ? "opacity-100" : "opacity-0"}`} />
              <text
                x={p.x + dx}
                y={p.y + dy}
                textAnchor={anchor}
                fontFamily="Rubik, Arial, sans-serif"
                fontWeight={status === "list" ? 600 : 800}
                fontSize={status === "list" ? 17 : 21}
                letterSpacing="1"
                fill={status === "list" ? (isSel ? GOLD : CREAM) : GOLD}
                paintOrder="stroke"
                stroke="#0A2A1E"
                strokeWidth="4"
                strokeLinejoin="round"
              >
                {label.toUpperCase()}
                {p.kind === "stop" && p.stop.record ? ` · ${p.stop.record}` : ""}
              </text>
            </g>
          );
        })}

        <g transform={`translate(18 ${mapDots.h - 40})`} fontFamily="Rubik, Arial, sans-serif" fontSize="15" fontWeight="600" fill={CREAM}>
          <rect x="-8" y="-17" width="360" height="34" rx="4" fill="#0A2A1E" opacity="0.85" />
          <circle cx="4" cy="0" r="7" fill={GOLD} stroke="#0A2A1E" strokeWidth="2" />
          <text x="18" y="5">PLAYED</text>
          <circle cx="110" cy="0" r="7" fill={GOLD} />
          <circle cx="110" cy="0" r="7" fill="none" stroke={GOLD} strokeWidth="2" className="mg-ring" />
          <text x="124" y="5">NEXT</text>
          <circle cx="194" cy="0" r="5.5" fill={CREAM} />
          <text x="207" y="5">ON OUR LIST</text>
        </g>
      </svg>

      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="bg-night-2 p-5" aria-live="polite">
          {sel?.kind === "stop" ? (
            <>
              <p className="label text-xs text-sand">
                {sel.stop.label} · {sel.stop.status === "played" ? `Played · ${sel.stop.record ?? ""}` : "Next stop"}
              </p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-none">
                {sel.stop.city}
                {sel.stop.region ? `, ${sel.stop.region}` : ""}
              </p>
              <p className="mt-1 text-sm text-muted-text">
                {sel.stop.dates}
                {sel.stop.opponent ? ` · vs ${sel.stop.opponent}` : ""}
              </p>
              {sel.stop.note && <p className="mt-2 text-sm text-[#D9E3DC]">{sel.stop.note}</p>}
              <Link to="/schedule" className="label mt-3 inline-block text-sm text-sand hover:text-sand-soft">
                {sel.stop.status === "played" ? "Game reports →" : "Tickets & times →"}
              </Link>
            </>
          ) : sel?.kind === "market" ? (
            <>
              <p className="label text-xs text-sand">On our list · {sel.market.country}</p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-none">
                {sel.market.city}, {sel.market.region}
              </p>
              <p className="mt-2 text-sm text-[#D9E3DC]">
                A city with a big Jewish community we'd love to bring the tour to. Local synagogues, JCCs and businesses can help us make it happen.
              </p>
              <Link to="/partners#city-partner" className="label mt-3 inline-block text-sm text-sand hover:text-sand-soft">
                Bring us to {sel.market.city} →
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted-text">Tap a city on the map.</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-px bg-line">
          <Counter value={played.length} label="Cities visited" run={seen} />
          <Counter value={rec.played} label="Games played" run={seen} />
          {miles > 0 ? <Counter value={Math.round(miles)} label="Miles on tour" run={seen} /> : <Counter value={rec.w} label="Wins" run={seen} />}
          <Counter value={targetMarkets.length} label="Cities on our list" run={seen} />
        </div>
      </div>
    </div>
  );
};

/** The tour so far: played stops, the next one, and what's being booked. */
export const TourStops = ({ wide = false }: { wide?: boolean }) => (
  <ol className={`grid gap-3 ${wide ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1"}`}>
    {tourStops.map((s) => (
      <li key={s.id} className={`border p-5 ${s.status === "played" ? "border-line bg-night-2" : s.status === "next" ? "border-sand bg-sand/10" : "border-dashed border-line bg-night"}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="label text-sm text-sand">{s.label}</span>
          <span className={`label px-2 py-1 text-[10px] ${s.status === "played" ? "bg-ice text-night" : s.status === "next" ? "bg-sand text-night" : "bg-night-2 text-muted-text"}`}>
            {s.status === "played" ? `Played · ${s.record ?? ""}` : s.status === "next" ? "Next stop" : "Planned"}
          </span>
        </div>
        <p className="mt-2 font-display text-2xl font-black uppercase leading-none">{s.city ?? (s.opponent ? `vs ${s.opponent}` : "City TBA")}</p>
        <p className="label mt-1 text-sm text-muted-text">{s.dates}{s.region ? ` · ${s.region}` : ""}</p>
        {s.note && <p className="mt-3 text-sm text-[#D9E3DC]">{s.note}</p>}
      </li>
    ))}
    <li className="flex flex-col justify-between border border-dashed border-sand/60 bg-night p-5">
      <div>
        <span className="label text-sm text-sand">Next weekend series</span>
        <p className="mt-2 font-display text-2xl font-black uppercase leading-none">Being booked now</p>
        <p className="mt-3 text-sm text-[#D9E3DC]">Want Sabra HC in your city? Local partners and community groups can host a weekend.</p>
      </div>
      <Link to="/partners#city-partner" className="label mt-4 text-sm text-sand hover:text-sand-soft">
        Bring us to your city →
      </Link>
    </li>
  </ol>
);

/** Opponent logo from their own site, falling back to initials if it can't load. */
export const OpponentMark = ({ game, className = "h-16 w-16 sm:h-20 sm:w-20", letters = 3 }: { game: Game; className?: string; letters?: number }) => {
  const [failed, setFailed] = useState(false);
  if (game.opponentLogo && !failed)
    return <img src={game.opponentLogo} alt={`${game.opponent} logo`} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`mx-auto object-contain ${className}`} />;
  return (
    <div className={`mx-auto flex items-center justify-center rounded-full border-2 border-line font-display text-lg font-black text-muted-text ${className}`}>
      {game.opponent.slice(0, letters).toUpperCase()}
    </div>
  );
};

/** Full result card for a played game, built from the game sheet. */
export const GameRecap = ({ game, compact = false }: { game: Game; compact?: boolean }) => {
  const win = game.result === "W" || game.result === "OTW" || game.result === "SOW";
  return (
    <article className="panel min-w-0">
      <div className="panel-head">
        <span>{game.competition} · {gameDate(game)}</span>
        <span className={win ? "text-sand" : "text-muted-text"}>Final{game.result && game.result !== "W" && game.result !== "L" ? ` (${game.result})` : ""}</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 py-6 text-center">
        <div className="min-w-0">
          <img src={crest} alt="" className="mx-auto h-16 w-16 object-contain sm:h-20 sm:w-20" />
          <p className="mt-2 font-display text-base font-black leading-tight sm:text-xl">SABRA HC</p>
        </div>
        <p className="tabular whitespace-nowrap font-display text-3xl font-black sm:text-4xl">
          <span className={win ? "text-sand" : ""}>{game.sabraScore}</span>
          <span className="px-2 text-muted-text">–</span>
          <span className={!win ? "text-sand" : ""}>{game.opponentScore}</span>
        </p>
        <div className="min-w-0">
          <OpponentMark game={game} />
          <p className={`mt-2 font-display font-black uppercase leading-tight text-muted-text ${compact ? "text-sm sm:text-base" : "text-base sm:text-xl"}`}>{game.opponent}</p>
        </div>
      </div>
      {game.periods && (
        <div className="overflow-x-auto border-t border-line">
          <table className="tabular w-full text-center text-sm">
            <thead className="label text-xs text-muted-text">
              <tr>
                <th className="px-3 py-2 text-left font-bold">Goals</th>
                {game.periods.us.map((_, i) => (
                  <th key={i} className="px-3 py-2 font-bold">{periodLabel(i + 1)}</th>
                ))}
                <th className="px-3 py-2 font-bold">T</th>
                {game.shots && <th className="px-3 py-2 font-bold">Shots</th>}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="label px-3 py-2 text-left text-sand">Sabra HC</td>
                {game.periods.us.map((n, i) => <td key={i} className="px-3 py-2">{n}</td>)}
                <td className="px-3 py-2 font-bold">{game.sabraScore}</td>
                {game.shots && <td className="px-3 py-2">{game.shots.us}</td>}
              </tr>
              <tr className="border-t border-line">
                <td className="label px-3 py-2 text-left text-muted-text">{game.opponent}</td>
                {game.periods.them.map((n, i) => <td key={i} className="px-3 py-2">{n}</td>)}
                <td className="px-3 py-2 font-bold">{game.opponentScore}</td>
                {game.shots && <td className="px-3 py-2">{game.shots.them}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!compact && game.goals && game.goals.length > 0 && (
        <div className="border-t border-line px-4 py-4">
          <p className="label mb-2 text-xs text-muted-text">Sabra HC goals</p>
          <ol className="grid gap-1.5 text-sm">
            {game.goals.map((g, i) => (
              <li key={i} className="flex flex-wrap gap-x-2">
                <span className="label tabular w-[92px] flex-none whitespace-nowrap text-xs text-muted-text">{periodLabel(g.period)} · {g.clock}</span>
                <span className="font-semibold text-ice-white">{g.scorer}</span>
                {g.strength && <span className="label text-[10px] text-sand">{g.strength}</span>}
                <span className="text-muted-text">{g.assists.length ? `(${g.assists.join(", ")})` : "(unassisted)"}</span>
              </li>
            ))}
          </ol>
          {game.goalie && (
            <p className="mt-3 text-sm text-muted-text">
              In goal: <span className="text-ice-white">{game.goalie.name}</span>, {game.goalie.saves} saves on {game.goalie.shotsAgainst} shots
            </p>
          )}
          <p className="mt-2 text-xs text-muted-text">Clock shows time remaining in the period, as on the official sheet{game.sheetNote ? ` (${game.sheetNote})` : ""}.</p>
        </div>
      )}
      <div className="label flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm">
        <span className="text-[#D9E3DC]">{gameTime(game)}</span>
        <Link to={`/games/${game.id}`} className="text-sand hover:text-sand-soft">Game page →</Link>
      </div>
    </article>
  );
};
