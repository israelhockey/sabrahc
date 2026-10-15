import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  action?: ReactNode;
};

const SectionHeading = ({ eyebrow, title, intro, tone = "dark", id, action }: Props) => (
  <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl">
      <p className={`eyebrow ${tone === "light" ? "text-sand-dark" : ""}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-2 text-5xl font-black leading-[0.92] sm:text-6xl lg:text-7xl text-balance ${
          tone === "light" ? "text-night" : "text-ice-white"
        }`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${tone === "light" ? "text-[#3B4A63]" : "text-muted-text"}`}>{intro}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeading;
