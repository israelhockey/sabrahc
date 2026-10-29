import { useId } from "react";
import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { targetMarkets, tourStops, type Game } from "@/data/club";
import { gameDate, gameTime, periodLabel } from "@/lib/games";

const NAVY = "#13274D";
const GOLD = "#D6A84A";

/* North America, equirectangular: lon -130..-60, lat 24..52 */
const W = 700;
const H = 340;
const px = (lon: number) => ((lon + 130) / 70) * W;
const py = (lat: number) => ((52 - lat) / 28) * H;

/** A broadcast-style tour map of the cities on the list, drawn on a dot grid. */
export const TourMap = ({ light = true, className = "" }: { light?: boolean; className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const bg = light ? "#F7FAFC" : "#0A1426";
  const dot = light ? "#C9D6E6" : "#1C2C4A";
  const ink = light ? NAVY : "#F2F7FA";
  // label placement per city so neighbours don't collide: [dx, dy, anchor]
  const LBL: Record<string, [number, number, "start" | "end"]> = {
    "Los Angeles": [-11, -6, "end"],
    "San Diego": [11, 14, "start"],
    "Las Vegas": [11, -4, "start"],
    Chicago: [-11, 4, "end"],
    Toronto: [-11, -4, "end"],
    "New York": [11, 16, "start"],
    Tampa: [-11, 4, "end"],
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`block h-auto w-full ${className}`} role="img" aria-label="Map of the North American cities on Sabra HC's tour list">
      <defs>
        <pattern id={`dots-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1.6" fill={dot} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={bg} />
      <rect width={W} height={H} fill={`url(#dots-${uid})`} />
      {/* US / Canada border, roughly along the 49th parallel to the Great Lakes */}
      <path d={`M0 ${py(49)} H${px(-95)} L${px(-83)} ${py(46)} L${px(-79)} ${py(43.3)} L${px(-75)} ${py(45)} L${px(-71)} ${py(45)} L${px(-67)} ${py(47.3)}`} fill="none" stroke={light ? "#B8C9D6" : "#22324F"} strokeWidth="2" strokeDasharray="6 6" />
      {targetMarkets.map((m, i) => {
        const x = px(m.lon);
        const y = py(m.lat);
        const [dx, dy, anchor] = LBL[m.city] ?? [11, 4, "start"];
        return (
          <g key={m.city}>
            <circle cx={x} cy={y} r="7" fill={m.country === "Canada" ? "#C8373D" : NAVY} stroke="#fff" strokeWidth="2.5" />
            <circle cx={x} cy={y} r="7" fill="none" stroke={GOLD} strokeWidth="2.5" className="mg-ring" style={{ animationDelay: `${(i % 6) * 0.5}s` }} />
            <text x={x + dx} y={y + dy} textAnchor={anchor} fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1" fill={ink}>
              {m.city.toUpperCase()}
            </text>
          </g>
        );
      })}
      <g transform={`translate(12 ${H - 44})`}>
        <rect width="156" height="32" fill={light ? "#fff" : "#0F1C33"} stroke={light ? "#DCE4EC" : "#22324F"} />
        <circle cx="16" cy="16" r="6" fill={NAVY} stroke="#fff" strokeWidth="2" />
        <text x="28" y="20" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="11" fill={ink}>USA</text>
        <circle cx="70" cy="16" r="6" fill="#C8373D" stroke="#fff" strokeWidth="2" />
        <text x="82" y="20" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="11" fill={ink}>CANADA</text>
      </g>
    </svg>
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
        <p className="mt-2 font-display text-3xl font-black uppercase leading-none">{s.city ?? (s.opponent ? `vs ${s.opponent}` : "City TBA")}</p>
        <p className="label mt-1 text-sm text-muted-text">{s.dates}{s.region ? ` · ${s.region}` : ""}</p>
        {s.note && <p className="mt-3 text-sm text-[#C9D6E6]">{s.note}</p>}
      </li>
    ))}
    <li className="flex flex-col justify-between border border-dashed border-sand/60 bg-night p-5">
      <div>
        <span className="label text-sm text-sand">Next weekend series</span>
        <p className="mt-2 font-display text-3xl font-black uppercase leading-none">Being booked now</p>
        <p className="mt-3 text-sm text-[#C9D6E6]">Want Sabra HC in your city? Local partners and community groups can host a weekend.</p>
      </div>
      <Link to="/partners#city-partner" className="label mt-4 text-sm text-sand hover:text-sand-soft">
        Bring us to your city →
      </Link>
    </li>
  </ol>
);

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
          <p className="mt-2 font-display text-lg font-black leading-tight sm:text-2xl">SABRA HC</p>
        </div>
        <p className="tabular whitespace-nowrap font-display text-4xl font-black sm:text-6xl">
          <span className={win ? "text-sand" : ""}>{game.sabraScore}</span>
          <span className="px-2 text-muted-text">–</span>
          <span className={!win ? "text-sand" : ""}>{game.opponentScore}</span>
        </p>
        <div className="min-w-0">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-line font-display text-xl font-black text-muted-text sm:h-20 sm:w-20">
            {game.opponent.slice(0, 3).toUpperCase()}
          </div>
          <p className={`mt-2 font-display font-black uppercase leading-tight text-muted-text ${compact ? "text-base sm:text-lg" : "text-lg sm:text-2xl"}`}>{game.opponent}</p>
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
        <span className="text-[#C9D6E6]">{gameTime(game)}</span>
        <Link to={`/games/${game.id}`} className="text-sand hover:text-sand-soft">Game page →</Link>
      </div>
    </article>
  );
};
