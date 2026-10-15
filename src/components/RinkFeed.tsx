import { useId } from "react";
import crest from "@/assets/sabra-crest.webp";

/*
  The broadcast's overhead rink camera, drawn in code.
  A full NHL-size sheet (200 x 85 ft, 10 units per foot), bright ice, Sabra lines,
  the crest at centre ice, a puck waiting on the dot and a telestrator play.
*/

const NAVY = "#13274D";
const GOLD = "#D6A84A";
const RED = "#C8373D";
const CREASE = "#9CC9E3";

// Deterministic skate marks so the ice looks used, the same on every load.
const scratches = (() => {
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 70 }, () => {
    const x = 80 + r() * 1840;
    const y = 60 + r() * 730;
    const dx = 80 + r() * 260;
    const dy = (r() - 0.5) * 140;
    return `M${x.toFixed(0)} ${y.toFixed(0)} q ${(dx / 2).toFixed(0)} ${(dy * 1.6).toFixed(0)} ${dx.toFixed(0)} ${dy.toFixed(0)}`;
  });
})();

const FaceoffCircle = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r={150} fill="none" stroke={RED} strokeWidth={5} />
    <circle cx={x} cy={y} r={10} fill={RED} />
    {[-1, 1].map((sx) =>
      [-1, 1].map((sy) => (
        <path key={`${sx}${sy}`} d={`M${x + sx * 20} ${y + sy * 8} h${sx * 40} M${x + sx * 20} ${y + sy * 8} v${sy * 30}`} stroke={RED} strokeWidth={4} fill="none" />
      )),
    )}
  </g>
);

const Net = ({ x, dir }: { x: number; dir: 1 | -1 }) => (
  <g>
    <path d={`M${x} 365 A 60 60 0 0 ${dir === 1 ? 1 : 0} ${x} 485 Z`} fill={CREASE} fillOpacity={0.55} stroke={RED} strokeWidth={3} />
    <rect x={dir === 1 ? x - 40 : x} y={395} width={40} height={60} rx={10} fill="none" stroke={RED} strokeWidth={5} />
  </g>
);

const RinkFeed = ({ className = "", vertical = false, view }: { className?: string; vertical?: boolean; view?: string }) => {
  // each copy of the feed needs its own gradient ids (a hidden copy's defs can't be referenced)
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  return (
  <svg
    className={className}
    viewBox={view ?? (vertical ? "0 175 850 1500" : "-40 110 1560 850")}
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label="Overhead view of a hockey rink with the Sabra HC crest at centre ice and a puck waiting on the faceoff dot"
  >
    <defs>
      <clipPath id={id("rink-clip")}>
        <rect x={0} y={0} width={2000} height={850} rx={280} />
      </clipPath>
      <radialGradient id={id("ice-sheen")} cx="0.62" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#F3F8FB" />
        <stop offset="1" stopColor="#DCE8F0" />
      </radialGradient>
      <radialGradient id={id("light-pool")} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <marker id={id("tele-arrow")} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill={GOLD} />
      </marker>
    </defs>
    <g transform={vertical ? "translate(850 0) rotate(90)" : undefined}>

    {/* outside the boards: the dark arena floor */}
    <rect x={-400} y={-400} width={2800} height={1650} fill="#0A1426" />

    <g clipPath={`url(#${id("rink-clip")})`}>
      <rect x={0} y={0} width={2000} height={850} fill={`url(#${id("ice-sheen")})`} />
      {/* reflections of the arena lights */}
      {[
        [520, 210],
        [1000, 160],
        [1480, 210],
        [760, 620],
        [1240, 620],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx={210} ry={120} fill={`url(#${id("light-pool")})`} opacity={0.55} />
      ))}
      <g stroke="#B8C9D6" strokeOpacity={0.45} strokeWidth={1.6} fill="none" strokeLinecap="round">
        {scratches.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* lines */}
      <rect x={110} y={0} width={5} height={850} fill={RED} />
      <rect x={1885} y={0} width={5} height={850} fill={RED} />
      <rect x={735} y={0} width={30} height={850} fill={NAVY} />
      <rect x={1235} y={0} width={30} height={850} fill={NAVY} />
      <rect x={985} y={0} width={30} height={850} fill={GOLD} />
      <path d="M1000 0 V850" stroke="#FFFFFF" strokeWidth={4} strokeDasharray="22 18" opacity={0.9} />

      <Net x={115} dir={1} />
      <Net x={1885} dir={-1} />
      <FaceoffCircle x={310} y={205} />
      <FaceoffCircle x={310} y={645} />
      <FaceoffCircle x={1690} y={205} />
      <FaceoffCircle x={1690} y={645} />
      {[800, 1200].map((x) => [205, 645].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={10} fill={RED} />))}

      {/* centre ice */}
      <circle cx={1000} cy={425} r={150} fill="none" stroke={NAVY} strokeWidth={6} />
      <circle cx={1000} cy={425} r={118} fill="#FFFFFF" opacity={0.75} />
      <image href={crest} x={895} y={320} width={210} height={210} opacity={0.95} transform={vertical ? "rotate(-90 1000 425)" : undefined} />
      <path d="M900 850 A 100 100 0 0 1 1100 850" fill="none" stroke={RED} strokeWidth={5} />

      {/* the puck, waiting for Game 001 */}
      <g transform="translate(1000 600)">
        <circle r={26} fill="none" stroke={GOLD} strokeWidth={4} className="rink-pulse" />
        <ellipse rx={15} ry={13} fill="#0B0F17" />
        <ellipse rx={15} ry={13} fill="none" stroke="#3A4152" strokeWidth={2} />
      </g>

      {/* telestrator play */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="rink-tele" d="M1210 660 C 1060 760, 820 760, 700 600 S 460 300, 230 390" stroke={GOLD} strokeWidth={9} markerEnd={`url(#${id("tele-arrow")})`} />
        <path className="rink-tele rink-tele-2" d="M1120 230 C 960 160, 760 200, 560 330" stroke={GOLD} strokeWidth={6} strokeDasharray="4 16" markerEnd={`url(#${id("tele-arrow")})`} />
        <g stroke={NAVY} strokeWidth={6} opacity={0.85}>
          <circle cx={1210} cy={660} r={22} />
          <circle cx={1120} cy={230} r={22} />
          <path d="M540 470 l30 30 M570 470 l-30 30" />
          <path d="M430 230 l30 30 M460 230 l-30 30" />
        </g>
      </g>
    </g>

    {/* boards and glass */}
    <rect x={0} y={0} width={2000} height={850} rx={280} fill="none" stroke={NAVY} strokeWidth={22} />
    <rect x={-14} y={-14} width={2028} height={878} rx={292} fill="none" stroke="#C9D6E6" strokeOpacity={0.35} strokeWidth={6} />
    </g>
  </svg>
  );
};

export default RinkFeed;
