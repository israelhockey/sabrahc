import { useEffect, useState, type ReactNode } from "react";
import { club } from "@/data/club";

/* ---------- Camera-feed frame (photo / video placeholder) ---------- */

type CamProps = {
  label?: string; // e.g. "CAM 1 · Team skate-out"
  rec?: boolean;
  corners?: "all" | "diagonal" | "none";
  className?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
};

const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base = "pointer-events-none absolute z-[2] h-6 w-6 border-ice-white/55";
  const map = {
    tl: "left-4 top-4 border-l-2 border-t-2",
    tr: "right-4 top-4 border-r-2 border-t-2",
    bl: "bottom-4 left-4 border-b-2 border-l-2",
    br: "bottom-4 right-4 border-b-2 border-r-2",
  } as const;
  return <span aria-hidden="true" className={`${base} ${map[pos]}`} />;
};

export const CamFrame = ({ label, rec, corners = "all", className = "", children, image, imageAlt = "" }: CamProps) => (
  <div className={`cam ${className}`}>
    {image && <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />}
    {corners !== "none" && (
      <>
        <Corner pos="tl" />
        <Corner pos="br" />
        {corners === "all" && (
          <>
            <Corner pos="tr" />
            <Corner pos="bl" />
          </>
        )}
      </>
    )}
    {label && !image && (
      <span className="label absolute left-10 top-7 z-[2] hidden max-w-[70%] border border-line bg-night/85 px-2.5 py-1 text-[11px] text-ice-white sm:block">
        {label}
      </span>
    )}
    {rec && (
      <span className="label absolute right-10 top-8 z-[2] hidden items-center gap-2 text-xs text-ice-white sm:flex">
        <span className="animate-rec h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
        REC
      </span>
    )}
    <div className="relative z-[3] h-full">{children}</div>
  </div>
);

/* ---------- Section title: tag + big headline ---------- */

type TitleProps = {
  tag: string;
  tone?: "sand" | "ice" | "live" | "white" | "dark";
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  action?: ReactNode;
  light?: boolean;
  as?: "h1" | "h2";
};

export const SectionTitle = ({ tag, tone = "sand", title, intro, id, action, light, as = "h2" }: TitleProps) => {
  const H = as;
  return (
    <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <span className={`tag-${tone}`}>{tag}</span>
        <H
          id={id}
          className={`mt-2 font-display font-black uppercase leading-[0.88] ${
            as === "h1" ? "text-6xl sm:text-8xl lg:text-[120px]" : "text-5xl sm:text-6xl lg:text-[84px]"
          } ${light ? "text-night" : "text-ice-white"}`}
        >
          {title}
        </H>
        {intro && <p className={`mt-3 max-w-2xl text-lg ${light ? "text-[#3B4A63]" : "text-muted-text"}`}>{intro}</p>}
      </div>
      {action}
    </div>
  );
};

/* ---------- Countdown ---------- */

export const useCountdown = (iso: string | null) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!iso) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [iso]);
  if (!iso) return null;
  let diff = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000));
  const d = Math.floor(diff / 86400);
  diff -= d * 86400;
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return { d: p(d), h: p(h), m: p(m), s: p(s), days: d };
};

export const Countdown = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const cd = useCountdown(club.openerDate);
  const blocks = cd
    ? [
        { v: cd.d, l: "Days" },
        { v: cd.h, l: "Hrs" },
        { v: cd.m, l: "Min" },
        { v: cd.s, l: "Sec" },
      ]
    : [
        { v: "--", l: "Days" },
        { v: "--", l: "Hrs" },
        { v: "--", l: "Min" },
        { v: "--", l: "Sec" },
      ];
  return (
    <div className="grid grid-cols-4 gap-px bg-line" role="timer" aria-label={cd ? `${cd.d} days ${cd.h} hours ${cd.m} minutes until Game 001` : "Game 001 date to be announced"}>
      {blocks.map((b) => (
        <div key={b.l} className="bg-night px-1 py-3 text-center">
          <div className={`tabular font-display font-black leading-none text-ice-white ${size === "lg" ? "text-5xl sm:text-6xl" : "text-4xl"}`}>{b.v}</div>
          <div className="label mt-1.5 text-[11px] text-ice sm:text-xs">{b.l}</div>
        </div>
      ))}
    </div>
  );
};

/* ---------- Stat line ---------- */

export const StatGrid = ({ stats, cols = 3, highlight }: { stats: { v: string | number; l: string }[]; cols?: number; highlight?: string }) => (
  <dl className="grid gap-px bg-line" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
    {stats.map((s) => (
      <div key={s.l} className="bg-night px-2 py-4 text-center">
        <dd className={`tabular font-display text-5xl font-black leading-none ${highlight === s.l ? "text-sand" : "text-ice-white"}`}>{s.v}</dd>
        <dt className="label mt-1 text-xs text-ice">{s.l}</dt>
      </div>
    ))}
  </dl>
);

/* ---------- Play button ---------- */

export const PlayIcon = ({ size = 64 }: { size?: number }) => (
  <span
    className="flex items-center justify-center rounded-full border-2 border-ice-white"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg width={size * 0.3} height={size * 0.34} viewBox="0 0 20 22">
      <path d="M3 2 L18 11 L3 20 Z" fill="currentColor" />
    </svg>
  </span>
);
