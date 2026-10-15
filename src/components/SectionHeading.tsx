import type { ReactNode } from "react";
import { SectionTitle } from "./broadcast";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  action?: ReactNode;
};

/** Older name for SectionTitle, kept so every page uses the broadcast heading. */
const SectionHeading = ({ eyebrow, title, intro, tone = "dark", id, action }: Props) => (
  <SectionTitle tag={eyebrow} tone={tone === "light" ? "dark" : "sand"} title={title} intro={intro} id={id} action={action} light={tone === "light"} />
);

export default SectionHeading;
