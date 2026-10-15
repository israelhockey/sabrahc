import type { ReactNode } from "react";
import { CamFrame } from "./broadcast";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "sand" | "ice" | "live" | "white";
  cam?: string; // shot description for the background feed
  children?: ReactNode;
  // kept for compatibility with older pages
  variant?: string;
};

/** Broadcast-style page opener: a camera-feed band with a lower-third title. */
const PageHero = ({ eyebrow, title, intro, tone = "sand", cam, children }: Props) => (
  <CamFrame label={cam} corners="diagonal" className="border-b border-line">
    <div className="container-site flex min-h-[340px] flex-col justify-end pb-12 pt-20 lg:min-h-[420px] lg:pb-14">
      <span className={`tag-${tone} self-start animate-rise`}>{eyebrow}</span>
      <h1 className="mt-2 max-w-5xl font-display text-6xl font-black uppercase leading-[0.86] animate-rise sm:text-8xl lg:text-[120px]">{title}</h1>
      {intro && (
        <div className="mt-4 max-w-2xl border-l-[6px] border-ice bg-night/90 px-5 py-3 text-lg text-[#C9D6E6] animate-rise">{intro}</div>
      )}
      {children}
    </div>
  </CamFrame>
);

export default PageHero;
