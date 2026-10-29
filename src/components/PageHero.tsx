import type { ReactNode } from "react";
import crest from "@/assets/sabra-crest.webp";

type Props = {
  eyebrow: string;
  title: ReactNode;
  /** The page name in Hebrew, set under the English title on the banner. */
  he?: string;
  intro?: ReactNode;
  children?: ReactNode;
  // older props, accepted so existing pages keep compiling; the banner ignores them
  tone?: string;
  cam?: string;
  status?: string;
  art?: ReactNode;
  variant?: string;
  /** Slim header for data pages (games, stats, team, news). */
  compact?: boolean;
};

/**
 * Page opener in the Tifo style: a gold supporters' banner held over the dotted crowd,
 * with the crest, the page title in English and Hebrew, and the intro underneath.
 */
const PageHero = ({ eyebrow, title, he, intro, children, compact }: Props) =>
  compact ? (
    <section className="crowd relative overflow-hidden border-b border-line">
      <div className="container-site relative flex flex-col gap-4 py-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="min-w-0">
          <p className="label text-xs text-sand sm:text-sm">{eyebrow}</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-6xl lg:text-7xl">{title}</h1>
            {he && (
              <p lang="he" dir="rtl" className="text-3xl font-black leading-none text-sand sm:text-4xl">
                {he}
              </p>
            )}
          </div>
        </div>
        {(intro || children) && (
          <div className="max-w-md text-base leading-relaxed text-[#D9E3DC] sm:text-lg lg:pb-1">
            {intro}
            {children}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="scarf h-2" />
    </section>
  ) : (

  <section className="crowd relative overflow-hidden border-b border-line pb-14 pt-12 lg:pb-16 lg:pt-16">
    <div className="relative mx-[-24px] -rotate-2 bg-sand p-2.5 text-night shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] sm:p-3.5">
      <div className="stitch">
        <div className="container-site grid items-center gap-6 px-10 py-8 sm:px-12 sm:py-10 lg:grid-cols-[auto_1fr] lg:gap-12 lg:py-12">
          <img src={crest} alt="" className="hidden h-36 w-36 object-contain lg:block xl:h-44 xl:w-44" />
          <div className="min-w-0">
            <p className="label text-xs sm:text-sm">{eyebrow}</p>
            <h1 className="mt-2 font-display text-[40px] font-black uppercase leading-[0.92] tracking-normal text-balance sm:text-6xl lg:text-7xl">{title}</h1>
            {he && (
              <p lang="he" dir="rtl" className="mt-2 text-left text-3xl font-black leading-none sm:text-5xl">
                {he}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    {(intro || children) && (
      <div className="container-site relative mt-10 max-w-3xl text-center">
        {intro && <div className="text-lg leading-relaxed text-[#D9E3DC] sm:text-xl">{intro}</div>}
        {children}
      </div>
    )}
  </section>
  );

export default PageHero;
