import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

export type SignupSource =
  | "newsletter"
  | "pride"
  | "partner"
  | "investor"
  | "contact"
  | "tryout"
  | "tickets";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "url" | "number";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
};

type Props = {
  source: SignupSource;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody?: string;
  tone?: "dark" | "light";
  idPrefix?: string;
  /** Extra fixed details saved with every submission, e.g. which form it came from. */
  details?: Record<string, string>;
  /** Values to prefill, e.g. a city passed in the link. */
  initial?: Record<string, string>;
};

// Columns that exist on the signups table; everything else goes into `details`.
const COLUMNS = ["name", "email", "phone", "company", "country", "message"];

// Older sources the table accepted before the 2026-10 migration, used as a fallback.
const LEGACY: Record<SignupSource, "newsletter" | "founders" | "fans"> = {
  newsletter: "newsletter",
  pride: "founders",
  partner: "fans",
  investor: "fans",
  contact: "fans",
  tryout: "fans",
  tickets: "fans",
};

const SignupForm = ({ source, fields, submitLabel, successTitle, successBody, tone = "dark", idPrefix = source, details: fixed, initial }: Props) => {
  const [values, setValues] = useState<Record<string, string>>(initial ?? {});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const inputClass = tone === "light" ? "field-light" : "field";
  const labelClass = tone === "light" ? "text-night" : "text-ice-white";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const row: Record<string, unknown> = { source };
    const details: Record<string, string> = { ...(fixed ?? {}) };
    for (const [k, v] of Object.entries(values)) {
      const val = v.trim();
      if (!val) continue;
      if (COLUMNS.includes(k)) row[k] = val;
      else details[k] = val;
    }
    if (Object.keys(details).length) row.details = details;
    if (typeof row.email === "string") row.email = row.email.toLowerCase();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from("signups").insert(row as any);
    if (!error || error.code === "23505") {
      setState("done");
      return;
    }
    // Fallback while the database update is pending: keep at least the contact.
    const fallback = await supabase
      .from("signups")
      .insert({ name: (row.name as string) ?? null, email: row.email as string, source: LEGACY[source] });
    setState(!fallback.error || fallback.error.code === "23505" ? "done" : "error");
  };

  if (state === "done") {
    return (
      <div role="status" className={`rounded-lg border p-8 ${tone === "light" ? "border-[#D9C9A4] bg-white" : "border-line bg-night-2"}`}>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand text-night">
          <Check className="h-6 w-6" />
        </div>
        <h3 className={`text-2xl font-black ${tone === "light" ? "text-night" : "text-ice-white"}`}>{successTitle}</h3>
        {successBody && <p className={`mt-2 text-lg ${tone === "light" ? "text-[#3E4F44]" : "text-muted-text"}`}>{successBody}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      {fields.map((f) => {
        const id = `${idPrefix}-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          placeholder: f.placeholder,
          value: values[f.name] ?? "",
          className: inputClass,
        };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className={`mb-1.5 block text-sm font-semibold ${labelClass}`}>
              {f.label}
              {f.required && <span className="text-sand"> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={4} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select {...common} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Choose…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn-primary" disabled={state === "sending"}>
          {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
          {submitLabel}
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm font-semibold text-red-400">
            Something went wrong. Please try again or email info@sabrahc.com.
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
