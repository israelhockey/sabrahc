import type { ReactNode } from "react";
import ContourField from "./ContourField";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  variant?: "desert" | "ice" | "transition";
  children?: ReactNode;
};

/** Shared top-of-page hero: sits under the fixed header (ticker + nav). */
const PageHero = ({ eyebrow, title, intro, variant = "transition", children }: Props) => (
  <section className="relative overflow-hidden border-b border-line bg-night pb-16 pt-[160px] lg:pb-20 lg:pt-[196px]">
    <ContourField variant={variant} />
    <div className="container-site relative">
      <p className="eyebrow animate-rise">{eyebrow}</p>
      <h1 className="mt-3 max-w-5xl text-6xl font-black leading-[0.9] text-ice-white animate-rise sm:text-7xl lg:text-8xl text-balance">
        {title}
      </h1>
      {intro && <div className="mt-6 max-w-2xl text-lg text-muted-text sm:text-xl animate-rise">{intro}</div>}
      {children}
    </div>
  </section>
);

export default PageHero;
