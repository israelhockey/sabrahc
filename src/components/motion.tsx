/*
  Motion graphics for each page opener. All drawn in code (no photos),
  in the same bright broadcast style as the homepage rink feed.
*/
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import crest from "@/assets/sabra-crest.webp";
import rdpLogo from "@/assets/rdp-logo.webp";
import { club, arenas, roadToEurope, episodes, partners } from "@/data/club";
import { sortedArticles } from "@/data/news";

const NAVY = "#13274D";
const GOLD = "#D6A84A";
const RED = "#C8373D";
const LINE = "#C9D6E6";

/** A broadcast-graphic card the art sits in. */
const Board = ({ title, meta, children, className = "" }: { title: string; meta?: ReactNode; children: ReactNode; className?: string }) => (
  <div className={`border border-night/15 bg-white shadow-[0_30px_70px_-35px_rgba(6,13,26,0.55)] ${className}`}>
    <div className="flex items-center justify-between gap-3 bg-night px-4 py-2.5">
      <span className="label text-xs text-ice-white sm:text-sm">{title}</span>
      {meta && <span className="label text-xs text-sand sm:text-sm">{meta}</span>}
    </div>
    {children}
  </div>
);

const useTicker = (n: number, ms: number) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (n < 2) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return i;
};

/* ---------- Schedule: the season calendar, Game 001 looking for its date ---------- */

export const CalendarArt = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleString("en-GB", { month: "long" });
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  const rows = Math.ceil((offset + days) / 7);
  const cells = Array.from({ length: rows * 7 }, (_, i) => {
    const d = i - offset + 1;
    return d >= 1 && d <= days ? d : null;
  });
  // weekend-ish game nights the tile hops between (illustrative, not a date)
  const stops = useMemo(() => cells.map((d, i) => (d && (i % 7 === 3 || i % 7 === 5) ? i : -1)).filter((i) => i >= 0), [rows, offset]); // eslint-disable-line react-hooks/exhaustive-deps
  const step = useTicker(stops.length, 1500);
  const at = stops[step] ?? offset;
  const col = at % 7;
  const row = Math.floor(at / 7);
  const season = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  return (
    <div className="mg-float">
      <Board title={`${monthName} ${year}`} meta="Season calendar">
        <div className="grid grid-cols-7 border-b border-[#E3EAF0] bg-[#F3F7FA]">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="label py-2 text-center text-[11px] text-[#5B6B85]">
              {d}
            </span>
          ))}
        </div>
        <div className="relative grid grid-cols-7">
          {cells.map((d, i) => (
            <div
              key={i}
              className="mg-in flex aspect-[1.15] items-start justify-end border-b border-r border-[#E3EAF0] p-1.5 [&:nth-child(7n)]:border-r-0"
              style={{ animationDelay: `${i * 22}ms` }}
            >
              {d && <span className="tabular font-display text-lg font-black leading-none text-[#9AA8BE] sm:text-xl">{d}</span>}
            </div>
          ))}
          {/* Game 001 tile, still finding its night */}
          <div
            aria-hidden="true"
            className="absolute p-1 transition-all duration-700 ease-[cubic-bezier(.6,-0.2,.3,1.3)]"
            style={{ left: `${(col * 100) / 7}%`, top: `${(row * 100) / rows}%`, width: `${100 / 7}%`, height: `${100 / rows}%` }}
          >
            <div className="flex h-full flex-col items-center justify-center bg-sand text-night shadow-[0_10px_24px_-10px_rgba(6,13,26,0.7)]">
              <span className="font-display text-xl font-black leading-none sm:text-2xl">001</span>
              <span className="label text-[9px] sm:text-[10px]">TBA</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-[#E3EAF0] p-px">
          {season.map((m, i) => (
            <span key={m} className={`label py-2 text-center text-[11px] ${i === 0 ? "bg-night text-sand" : "bg-white text-[#5B6B85]"}`}>
              {m}
            </span>
          ))}
        </div>
      </Board>
      <p className="label mt-3 text-right text-xs text-[#5B6B85]">Game 001 date drops soon · all times Israel time</p>
    </div>
  );
};

/* ---------- Team: the starting six on a tactics board ---------- */

export const LineupArt = () => {
  const spots: [string, number, number][] = [
    ["LW", 150, 120],
    ["C", 300, 165],
    ["RW", 450, 120],
    ["LD", 205, 285],
    ["RD", 395, 285],
    ["G", 300, 395],
  ];
  return (
    <Board title="Starting six" meta="Signings soon" className="mg-float">
      <svg viewBox="0 0 600 450" className="block h-auto w-full" role="img" aria-label="A tactics board with six empty position markers waiting for the first Sabra HC signings">
        <rect width="600" height="450" fill="#F7FAFC" />
        {/* defensive zone, net at the bottom */}
        <rect x="0" y="36" width="600" height="14" fill={NAVY} />
        <rect x="0" y="410" width="600" height="3" fill={RED} />
        <path d="M250 413 A 50 50 0 0 1 350 413" fill="#9CC9E3" fillOpacity="0.5" stroke={RED} strokeWidth="2" />
        <rect x="275" y="413" width="50" height="22" fill="none" stroke={RED} strokeWidth="3" />
        {[150, 450].map((x) => (
          <g key={x}>
            <circle cx={x} cy={300} r={95} fill="none" stroke={RED} strokeOpacity="0.55" strokeWidth="3" />
            <circle cx={x} cy={300} r={7} fill={RED} />
          </g>
        ))}
        {/* pass lines */}
        <g fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round">
          <path className="mg-draw" d="M300 395 L 205 285 L 150 120" />
          <path className="mg-draw" style={{ animationDelay: "0.8s" }} d="M395 285 C 450 230, 470 180, 450 120" strokeDasharray="3 12" />
          <path className="mg-draw" style={{ animationDelay: "1.4s" }} d="M150 120 C 220 90, 260 120, 300 165" />
        </g>
        {spots.map(([pos, x, y], i) => (
          <g key={pos} className="mg-pop" style={{ animationDelay: `${i * 0.35}s` }}>
            <circle cx={x} cy={y} r="31" fill={NAVY} />
            <circle cx={x} cy={y} r="31" fill="none" stroke={GOLD} strokeWidth="3" />
            <text x={x} y={y - 2} textAnchor="middle" fontFamily="Big Shoulders Display, Barlow Condensed, sans-serif" fontWeight="900" fontSize="22" fill="#F2F7FA">
              {pos}
            </text>
            <text x={x} y={y + 17} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="13" fill={GOLD}>
              #??
            </text>
          </g>
        ))}
      </svg>
    </Board>
  );
};

/* ---------- Tickets: a Game 001 ticket over a filling seat map ---------- */

export const TicketArt = () => {
  const arena = arenas.find((a) => a.id === club.openerArenaId);
  const seats = useMemo(() => {
    const out: { x: number; y: number; d: number }[] = [];
    let s = 3;
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let row = 0; row < 6; row++) {
      const radius = 150 + row * 22;
      const n = 18 + row * 3;
      for (let k = 0; k < n; k++) {
        const a = Math.PI + (Math.PI * (k + 0.5)) / n;
        out.push({ x: 300 + radius * Math.cos(a), y: 250 + radius * Math.sin(a) * 0.62, d: r() * 4.5 });
      }
    }
    return out;
  }, []);
  return (
    <div className="relative">
      <svg viewBox="0 0 600 270" className="block h-auto w-full" aria-hidden="true">
        <rect x="200" y="200" width="200" height="86" rx="40" fill="#fff" stroke={NAVY} strokeWidth="4" />
        <rect x="298" y="200" width="4" height="86" fill={GOLD} />
        {seats.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" className="mg-seat" style={{ animationDelay: `${p.d}s` }} fill={LINE} />
        ))}
      </svg>
      <div className="mg-float relative -mt-24 px-2 sm:-mt-28 sm:px-8">
        <div className="mg-shine flex shadow-[0_30px_60px_-30px_rgba(6,13,26,0.7)]">
          <div className="relative flex-1 bg-night p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <img src={crest} alt="" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              <div>
                <p className="label text-[11px] text-sand">{club.leagueShort} · {club.season}</p>
                <p className="font-display text-3xl font-black uppercase leading-none sm:text-4xl">Sabra HC vs TBA</p>
              </div>
            </div>
            <p className="mt-3 font-display text-5xl font-black uppercase leading-none text-sand sm:text-6xl">Game 001</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-dashed border-line pt-3">
              {[
                ["Sec", "--"],
                ["Row", "--"],
                ["Seat", "--"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-[10px] text-muted-text">{k}</dt>
                  <dd className="tabular font-display text-2xl font-black">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-2 text-[11px] text-ice">{arena?.name ?? "Arena TBA"} · Date TBA</p>
            {/* perforation */}
            <span className="absolute -right-2 top-0 flex h-full flex-col justify-around" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-3 w-3 rounded-full bg-[#E9F0F5]" />
              ))}
            </span>
          </div>
          <div className="flex w-20 flex-col items-center justify-between bg-sand px-2 py-4 text-night sm:w-24">
            <span className="label whitespace-nowrap text-xs [writing-mode:vertical-rl]">Admit one</span>
            <span className="flex h-16 w-12 items-end gap-[2px]" aria-hidden="true">
              {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3].map((w, i) => (
                <span key={i} className="h-full bg-night" style={{ width: w }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- News: the news desk monitor cycling real headlines ---------- */

export const NewsDeskArt = () => {
  const items = sortedArticles.slice(0, 4);
  const i = useTicker(items.length, 4200);
  const a = items[i];
  return (
    <Board title="Sabra HC news desk" meta={<span className="mg-blink text-live">● On air</span>} className="mg-float">
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        {a && <img key={a.slug} src={a.image} alt="" className={`mg-swap absolute inset-0 h-full w-full ${a.imageFit === "contain" ? "object-contain p-8" : "object-cover"} opacity-80`} />}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="flex items-stretch">
            <span className="para-r bg-live px-4 py-1.5 pr-6 font-cond text-xs font-extrabold uppercase tracking-[0.12em] text-ice-white">{a?.category ?? "News"}</span>
            <span className="flex-1 bg-white/0" />
          </div>
          <p key={a?.slug} className="mg-swap bg-white px-4 py-3 font-display text-2xl font-black uppercase leading-[0.95] text-night sm:text-3xl">
            {a?.title}
          </p>
        </div>
      </div>
      <div className="flex gap-1.5 bg-white px-4 py-3">
        {items.map((x, k) => (
          <span key={x.slug} className={`h-1.5 flex-1 ${k === i ? "bg-sand" : "bg-[#E3EAF0]"}`} />
        ))}
      </div>
    </Board>
  );
};

/* ---------- Club: route map from Israel into Europe ---------- */

const proj = (lat: number, lon: number) => [(lon - 10) * 20, (50 - lat) * 20 + 10] as const;

export const RouteMapArt = () => {
  const uid = useId().replace(/:/g, "");
  const home = proj(32.33, 34.86);
  const stops: [string, number, number][] = [
    ["Bucharest", 44.43, 26.1],
    ["Budapest", 47.5, 19.04],
    ["Ljubljana", 46.05, 14.51],
  ];
  const routes = stops.map(([, lat, lon]) => {
    const [x, y] = proj(lat, lon);
    const cx = (home[0] + x) / 2 + 30;
    const cy = Math.min(home[1], y) - 70;
    return `M${home[0]} ${home[1]} Q ${cx} ${cy} ${x} ${y}`;
  });
  return (
    <Board title="Road to Europe" meta="Goals, not results" className="mg-float">
      <svg viewBox="0 0 580 420" className="block h-auto w-full" role="img" aria-label="Map lines from Israel to Bucharest, Budapest and Ljubljana, the region of the European leagues Sabra HC is aiming for">
        <rect width="580" height="420" fill="#F7FAFC" />
        <g stroke="#E1E9F0" strokeWidth="1">
          {Array.from({ length: 15 }).map((_, k) => (
            <path key={`v${k}`} d={`M${k * 40} 0 V420`} />
          ))}
          {Array.from({ length: 11 }).map((_, k) => (
            <path key={`h${k}`} d={`M0 ${k * 40 + 10} H580`} />
          ))}
        </g>
        {/* dot field */}
        <g fill="#C9D6E6">
          {Array.from({ length: 29 * 21 }).map((_, k) => {
            const x = (k % 29) * 20 + 10;
            const y = Math.floor(k / 29) * 20 + 10;
            return <circle key={k} cx={x} cy={y} r="1.6" />;
          })}
        </g>
        {routes.map((d, k) => (
          <g key={k}>
            <path d={d} fill="none" stroke={NAVY} strokeOpacity="0.15" strokeWidth="3" />
            <path className="mg-draw" style={{ animationDelay: `${k * 0.6}s` }} d={d} fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
            <circle r="6" fill={NAVY} className="mg-travel" style={{ offsetPath: `path("${d}")`, animationDelay: `${k * 0.6 + 0.4}s` }} />
          </g>
        ))}
        {stops.map(([name, lat, lon], k) => {
          const [x, y] = proj(lat, lon);
          return (
            <g key={name}>
              <circle cx={x} cy={y} r="9" fill="#fff" stroke={NAVY} strokeWidth="4" />
              <rect x={x - 46} y={y - 40} width="92" height="22" fill={NAVY} />
              <text x={x} y={y - 24} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1.5" fill="#F2F7FA">
                {name.toUpperCase()}
              </text>
              <circle cx={x} cy={y} r="9" fill="none" stroke={GOLD} strokeWidth="3" className="mg-ring" style={{ animationDelay: `${k * 0.6 + 2}s` }} />
            </g>
          );
        })}
        <defs>
          <clipPath id={`crest-${uid}`}>
            <circle cx={home[0]} cy={home[1]} r="30" />
          </clipPath>
        </defs>
        <circle cx={home[0]} cy={home[1]} r="34" fill={GOLD} />
        <circle cx={home[0]} cy={home[1]} r="30" fill={NAVY} />
        <image href={crest} x={home[0] - 27} y={home[1] - 27} width="54" height="54" clipPath={`url(#crest-${uid})`} />
        <circle cx={home[0]} cy={home[1]} r="34" fill="none" stroke={GOLD} strokeWidth="3" className="mg-ring" />
        <text x={home[0]} y={home[1] + 54} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="14" letterSpacing="2" fill={NAVY}>
          ISRAEL
        </text>
      </svg>
    </Board>
  );
};

/* ---------- Partners: jersey placements + the arena ribbon board ---------- */

export const PartnerArt = () => {
  const panels = [...partners.map((p) => p.name), "Your brand here", "Your brand here", "Your brand here"];
  const loop = [...panels, ...panels];
  const zones: [string, number, number, number, number][] = [
    ["Chest", 82, 92, 56, 30],
    ["Shoulder", 52, 34, 28, 16],
    ["Shoulder", 140, 34, 28, 16],
    ["Sleeve", 18, 70, 24, 14],
  ];
  return (
    <div className="mg-float min-w-0 space-y-4">
      <Board title="Partner inventory" meta="Now available">
        <div className="grid grid-cols-[96px_1fr] items-center gap-4 p-4 sm:grid-cols-[150px_1fr] sm:p-5">
          <svg viewBox="0 0 220 200" className="block w-full" aria-hidden="true">
            <path
              d="M70 10 L40 20 L8 60 L30 86 L48 74 L48 190 L172 190 L172 74 L190 86 L212 60 L180 20 L150 10 C140 26 80 26 70 10 Z"
              fill={NAVY}
              stroke={GOLD}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M48 160 H172" stroke={GOLD} strokeWidth="5" />
            {zones.map(([, x, y, w, h], k) => (
              <rect key={k} x={x} y={y} width={w} height={h} fill={GOLD} fillOpacity="0.25" stroke={GOLD} strokeWidth="2" strokeDasharray="4 3" className="mg-blink" style={{ animationDelay: `${k * 0.5}s` }} />
            ))}
          </svg>
          <ul className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
            {["Jersey & helmet", "Rink boards", "Centre ice", "Game-night naming", "Stream & social", "European visits"].map((t, k) => (
              <li key={t} className="mg-in label flex items-center gap-2 border border-[#E3EAF0] bg-[#F7FAFC] px-3 py-2.5 text-xs text-night" style={{ animationDelay: `${k * 90}ms` }}>
                <span className="h-2 w-2 flex-none bg-sand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Board>
      <div className="overflow-hidden border-y-4 border-night bg-night" aria-hidden="true">
        <div className="mg-ribbon flex w-max">
          {loop.map((t, k) => (
            <span key={k} className={`flex h-12 w-48 flex-none sm:h-14 sm:w-56 items-center justify-center whitespace-nowrap border-r border-night-2 font-cond text-base sm:text-lg font-extrabold uppercase tracking-[0.14em] ${t === "Your brand here" ? "text-sand" : "bg-white text-night"}`}>
              {t === "Your brand here" ? t : <img src={rdpLogo} alt="" className="h-9 w-auto object-contain" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Pride: the Founders Wall waiting for names ---------- */

export const FoundersWallArt = () => (
  <Board title="The Founders Wall" meta="Opening soon" className="mg-float">
    <div className="grid grid-cols-4 gap-2 bg-[#F3F7FA] p-4 sm:grid-cols-5">
      {Array.from({ length: 20 }).map((_, k) => {
        const lit = [1, 4, 7, 10, 13, 16, 18].includes(k);
        return (
          <div
            key={k}
            className={`flex aspect-[1.6] flex-col items-center justify-center border px-1 text-center ${lit ? "mg-plate" : "border-dashed border-[#C5D0DB] bg-white text-[#9AA8BE]"}`}
            style={lit ? { animationDelay: `${(k % 7) * 1.1}s` } : undefined}
          >
            <span className="tabular font-display text-lg font-black leading-none sm:text-xl">#{String(k + 1).padStart(3, "0")}</span>
            <span className="label mt-0.5 text-[9px]">Your name</span>
          </div>
        );
      })}
    </div>
    <div className="flex items-center justify-between gap-3 border-t border-[#E3EAF0] px-4 py-3">
      <img src={crest} alt="" className="h-10 w-10 object-contain" />
      <p className="label text-xs text-[#5B6B85]">Every founding member, on the wall for good</p>
    </div>
  </Board>
);

/* ---------- Invest: the plan as a rising step chart ---------- */

export const PlanChartArt = () => {
  const steps = roadToEurope;
  const pts = steps.map((_, k) => [95 + k * 125, 335 - k * 82] as const);
  const d = pts.reduce((acc, [x, y], k) => (k === 0 ? `M20 ${y} H${x}` : `${acc} V${y} H${x}`), "") + ` H560`;
  return (
    <Board title="The plan" meta="Targets · 2026–2031" className="mg-float">
      <svg viewBox="0 0 580 400" className="block h-auto w-full" role="img" aria-label="A step chart of Sabra HC's plan: win Israel, bring Europe to Israel, build, then join a European league">
        <rect width="580" height="400" fill="#F7FAFC" />
        <g stroke="#E1E9F0">
          {[90, 170, 250, 330].map((y) => (
            <path key={y} d={`M20 ${y} H560`} />
          ))}
        </g>
        <path d={`${d} V380 H20 Z`} fill={GOLD} fillOpacity="0.12" />
        <path className="mg-draw" d={d} fill="none" stroke={GOLD} strokeWidth="6" strokeLinejoin="round" />
        {pts.map(([x, y], k) => (
          <g key={k} className="mg-pop" style={{ animationDelay: `${k * 0.6}s` }}>
            <circle cx={x} cy={y} r="13" fill={k === pts.length - 1 ? GOLD : NAVY} stroke="#fff" strokeWidth="4" />
            <rect x={x - 85} y={y - 58} width="170" height="40" fill={NAVY} />
            <text x={x} y={y - 42} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="12" letterSpacing="1.5" fill={GOLD}>
              {steps[k].season}
            </text>
            <text x={x} y={y - 25} textAnchor="middle" fontFamily="Big Shoulders Display, Barlow Condensed, sans-serif" fontWeight="900" fontSize="14" fill="#F2F7FA" textLength={steps[k].title.length > 14 ? 156 : undefined} lengthAdjust="spacingAndGlyphs">
              {steps[k].title.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </Board>
  );
};

/* ---------- Contact: one signal, every channel ---------- */

export const SignalArt = () => {
  const nodes: [string, number, number][] = [
    ["General", 110, 90],
    ["Partners", 470, 90],
    ["Media", 110, 330],
    ["Try-outs", 470, 330],
  ];
  return (
    <Board title="Sabra HC · Comms" meta={<span className="mg-blink">● Receiving</span>} className="mg-float">
      <svg viewBox="0 0 580 420" className="block h-auto w-full" role="img" aria-label="Four message channels, general, partners, media and try-outs, all connecting to the club">
        <rect width="580" height="420" fill="#F7FAFC" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx="290" cy="210" r="60" fill="none" stroke={GOLD} strokeWidth="3" className="mg-ring" style={{ animationDelay: `${k}s` }} />
        ))}
        {nodes.map(([, x, y], k) => {
          const d = `M${x} ${y} Q ${(x + 290) / 2} ${y > 210 ? y - 10 : y + 10} 290 210`;
          return (
            <g key={k}>
              <path d={d} fill="none" stroke={NAVY} strokeOpacity="0.2" strokeWidth="3" strokeDasharray="6 8" />
              <circle r="7" fill={GOLD} className="mg-travel" style={{ offsetPath: `path("${d}")`, animationDelay: `${k * 0.9}s` }} />
            </g>
          );
        })}
        <circle cx="290" cy="210" r="58" fill={NAVY} />
        <image href={crest} x="244" y="164" width="92" height="92" />
        {nodes.map(([label, x, y]) => (
          <g key={label}>
            <rect x={x - 62} y={y - 22} width="124" height="44" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <text x={x} y={y + 6} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="17" letterSpacing="2" fill={NAVY}>
              {label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </Board>
  );
};

/* ---------- Season: the edit timeline of the docuseries ---------- */

export const TimelineArt = () => (
  <Board title="The Founding Season · Edit" meta={<span className="mg-blink text-live">● Rec</span>} className="mg-float">
    <div className="bg-night p-4">
      <div className="relative">
        <div className="mb-2 flex justify-between">
          {episodes.map((e) => (
            <span key={e.ep} className="label text-[11px] text-sand">
              {e.ep}
            </span>
          ))}
        </div>
        {/* video track */}
        <div className="grid grid-cols-4 gap-1">
          {episodes.map((e, k) => (
            <div key={e.ep} className={`flex h-16 items-end p-2 ${k % 2 ? "bg-ice/80" : "bg-sand"}`}>
              <span className="label truncate text-[10px] text-night">{e.title}</span>
            </div>
          ))}
        </div>
        {/* b-roll track */}
        <div className="mt-1 grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, k) => (
            <div key={k} className={`h-6 ${k % 3 === 0 ? "bg-[#2A3D60]" : "bg-[#1C2C4A]"}`} />
          ))}
        </div>
        {/* audio waveform */}
        <div className="mt-1 flex h-12 items-center gap-[3px] bg-[#0D1A30] px-1">
          {Array.from({ length: 64 }).map((_, k) => (
            <span key={k} className="mg-bar block w-full bg-ice/70" style={{ height: `${30 + ((k * 37) % 70)}%`, animationDelay: `${(k % 9) * 0.12}s` }} />
          ))}
        </div>
        <span className="mg-playhead absolute -bottom-1 -top-1 w-[3px] bg-live" aria-hidden="true">
          <span className="absolute -left-[6px] -top-1 h-0 w-0 border-x-[7px] border-t-[9px] border-x-transparent border-t-live" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-ice-white">
        <span className="label text-xs text-muted-text">V1 · B-roll · A1</span>
        <span className="label tabular text-xs">EP 01 · Coming soon</span>
      </div>
    </div>
  </Board>
);
