import { useEffect, useState, type ReactNode } from "react";
import { nextGame } from "@/lib/games";

/* ---------- Photo / video frame ---------- */

type CamProps = {
  label?: string; // kept for older call sites; not shown
  rec?: boolean;
  corners?: "all" | "diagonal" | "none";
  className?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
};

/** A spotlit frame that holds a photo or video, or a quiet placeholder until one arrives. */
export const CamFrame = ({ className = "", children, image, imageAlt = "" }: CamProps) => (
  <div className={`cam ${className}`}>
    {image && <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />}
    <div className="relative z-[3] h-full">{children}</div>
  </div>
);

/* ---------- Section title: small gold label + big headline ---------- */

type TitleProps = {
  tag: string;
  he?: string;
  tone?: "sand" | "ice" | "live" | "white" | "dark";
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  action?: ReactNode;
  light?: boolean;
  as?: "h1" | "h2";
};

export const SectionTitle = ({ tag, he, title, intro, id, action, light, as = "h2" }: TitleProps) => {
  const H = as;
  return (
    <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className={`label text-xs sm:text-[13px] ${light ? "text-sand-dark" : "text-sand"}`}>
          {tag}
          {he && (
            <span lang="he" className="normal-case tracking-normal">
              {" "}· {he}
            </span>
          )}
        </p>
        <H
          id={id}
          className={`mt-2 font-display font-black uppercase leading-[0.95] tracking-[-0.03em] ${
            as === "h1" ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl lg:text-6xl"
          } ${light ? "text-night" : "text-ice-white"}`}
        >
          {title}
        </H>
        {intro && <p className={`mt-3 max-w-2xl text-lg ${light ? "text-[#3E4F44]" : "text-[#D9E3DC]"}`}>{intro}</p>}
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
  const cd = useCountdown(nextGame()?.date ?? null);
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
    <div className="grid grid-cols-4 gap-px bg-line" role="timer" aria-label={cd ? `${cd.d} days ${cd.h} hours ${cd.m} minutes until the next game` : "Next game date to be announced"}>
      {blocks.map((b) => (
        <div key={b.l} className="bg-night px-1 py-3 text-center">
          <div className={`tabular font-display font-black leading-none text-ice-white ${size === "lg" ? "text-3xl sm:text-4xl" : "text-3xl"}`}>{b.v}</div>
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
        <dd className={`tabular font-display text-3xl font-black leading-none ${highlight === s.l ? "text-sand" : "text-ice-white"}`}>{s.v}</dd>
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
