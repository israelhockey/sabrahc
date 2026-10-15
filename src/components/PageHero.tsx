import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "sand" | "ice" | "live" | "white";
  cam?: string; // broadcast camera label, e.g. "CAM 4 · Calendar"
  status?: string; // the tag in the top right, e.g. "Schedule TBA"
  art?: ReactNode; // the page's motion graphic
  children?: ReactNode;
  // kept for compatibility with older pages
  variant?: string;
};

/**
 * Bright broadcast page opener, the same family as the homepage rink feed:
 * light ice background, navy frame, a camera label and status tag,
 * and a page-specific motion graphic.
 */
const PageHero = ({ eyebrow, title, intro, tone = "live", cam, status, art, children }: Props) => (
  <section className="ice-bg relative overflow-hidden border-b border-line">
    <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 z-[2] h-7 w-7 border-l-[3px] border-t-[3px] border-night" />
    <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 z-[2] h-7 w-7 border-b-[3px] border-r-[3px] border-night" />
    <div className="absolute left-10 right-10 top-7 z-[2] flex items-center justify-between gap-3">
      {cam ? <span className="label border border-night/20 bg-white/90 px-2.5 py-1 text-[11px] text-night">{cam}</span> : <span />}
      {status && (
        <span className={`tag-${tone} !flex items-center gap-2`}>
          {tone === "live" && <span className="animate-rec h-2 w-2 rounded-full bg-ice-white" aria-hidden="true" />}
          {status}
        </span>
      )}
    </div>

    <div className="container-site relative z-[1] grid items-center gap-8 pb-12 pt-24 lg:min-h-[560px] lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-16 lg:pt-24">
      {art && <div className="order-first min-w-0 lg:order-none lg:col-start-2 lg:row-start-1">{art}</div>}
      <div className={`min-w-0 ${art ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <span className="tag-dark animate-rise">{eyebrow}</span>
        <h1 className="mt-3 font-display text-6xl font-black uppercase leading-[0.86] text-night text-balance animate-rise sm:text-8xl lg:text-[104px]">{title}</h1>
        {intro && (
          <div className="mt-5 max-w-xl border-l-[6px] border-sand bg-white/95 px-5 py-3 text-lg text-[#2B3A55] shadow-[0_10px_30px_-18px_rgba(6,13,26,0.6)] animate-rise">
            {intro}
          </div>
        )}
        {children}
      </div>
    </div>
  </section>
);

export default PageHero;
