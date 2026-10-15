import { useMemo } from "react";

type Variant = "desert" | "ice" | "transition";

type Props = {
  variant?: Variant;
  lines?: number;
  className?: string;
  opacity?: number;
  animate?: boolean;
};

const SAND = [214, 168, 74];
const ICE = [156, 201, 227];

const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

// Builds a path that repeats every 600px so the drift loops seamlessly.
const buildPath = (y: number, amp: number, phase: number, width: number) => {
  const pts: string[] = [];
  for (let x = -20; x <= width + 20; x += 20) {
    const t = (x / 600) * Math.PI * 2;
    const dy =
      amp * Math.sin(t + phase) +
      amp * 0.45 * Math.sin(2 * t + phase * 1.7) +
      amp * 0.2 * Math.sin(3 * t + phase * 0.6);
    pts.push(`${x.toFixed(0)},${(y + dy).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
};

/** The club's signature motif: desert contour lines that turn into skate-carve lines on ice. */
const ContourField = ({ variant = "transition", lines = 22, className = "", opacity = 1, animate = true }: Props) => {
  const height = 800;
  const width = 1200 + 600;
  const paths = useMemo(() => {
    return Array.from({ length: lines }, (_, i) => {
      const t = i / (lines - 1);
      const y = 20 + t * (height - 40);
      let amp: number;
      let color: string;
      let alpha: number;
      if (variant === "desert") {
        amp = 26 - t * 8;
        color = mix(SAND, SAND, 0);
        alpha = 0.1 + 0.12 * (1 - t);
      } else if (variant === "ice") {
        amp = 3 + t * 2;
        color = mix(ICE, ICE, 0);
        alpha = 0.08 + 0.12 * t;
      } else {
        amp = 30 * (1 - t) + 2;
        color = mix(SAND, ICE, t);
        alpha = 0.1 + 0.14 * Math.abs(t - 0.5) * 2;
      }
      return { d: buildPath(y, amp, i * 0.55, width), color, alpha };
    });
  }, [variant, lines]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }}>
      <svg className="h-full w-full" viewBox={`0 0 1200 ${height}`} preserveAspectRatio="xMidYMid slice">
        <g
          style={
            animate
              ? { animation: "contour-drift 90s linear infinite" }
              : undefined
          }
        >
          {paths.map((p, i) => (
            <path key={i} d={p.d} fill="none" stroke={p.color} strokeOpacity={p.alpha} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ContourField;
