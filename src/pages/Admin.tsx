import { useEffect, useMemo, useState } from "react";
import { Download, ShieldCheck, LogOut } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";

type Signup = {
  id: string;
  name: string | null;
  email: string;
  source: string;
  phone?: string | null;
  company?: string | null;
  country?: string | null;
  message?: string | null;
  details?: Record<string, string> | null;
  created_at: string;
};

const SOURCES: Record<string, string> = {
  newsletter: "Newsletter",
  tickets: "Ticket alerts",
  pride: "Pride",
  partner: "Partners",
  investor: "Investors",
  contact: "Contact",
  tryout: "Try-outs",
  founders: "Founders (old)",
  fans: "Fans (old)",
};

const Admin = () => {
  const [key, setKey] = useState(() => {
    try {
      return localStorage.getItem("sabra_admin_key") || "";
    } catch {
      return "";
    }
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSignups = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ key: adminKey });
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/admin-signups?${params.toString()}`, {
        headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
      });
      if (res.status === 401) {
        setError("Invalid admin key");
        setAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error("Failed");
      setSignups(await res.json());
      setAuthenticated(true);
      try {
        localStorage.setItem("sabra_admin_key", adminKey);
      } catch {
        /* storage unavailable */
      }
    } catch {
      setError("Failed to load sign-ups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) fetchSignups(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: signups.length };
    for (const s of signups) c[s.source] = (c[s.source] ?? 0) + 1;
    return c;
  }, [signups]);

  const filtered = filter === "all" ? signups : signups.filter((s) => s.source === filter);

  const exportCSV = () => {
    const headers = ["Date", "Type", "Name", "Email", "Phone", "Company", "Country", "Message", "Details"];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toISOString(),
      SOURCES[s.source] ?? s.source,
      s.name ?? "",
      s.email,
      s.phone ?? "",
      s.company ?? "",
      s.country ?? "",
      s.message ?? "",
      s.details ? JSON.stringify(s.details) : "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `sabra-signups-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => {
    try {
      localStorage.removeItem("sabra_admin_key");
    } catch {
      /* ignore */
    }
    setKey("");
    setAuthenticated(false);
    setSignups([]);
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night px-4">
        <form onSubmit={(e) => { e.preventDefault(); fetchSignups(key); }} className="w-full max-w-sm rounded-lg border border-line bg-night-2 p-8">
          <img src={crest} alt="" className="mx-auto mb-4 h-20 w-20 object-contain" />
          <h1 className="mb-6 flex items-center justify-center gap-2 text-3xl font-black text-ice-white">
            <ShieldCheck className="h-6 w-6 text-sand" /> Admin
          </h1>
          <label htmlFor="admin-key" className="mb-1.5 block text-sm font-semibold text-ice-white">
            Admin key
          </label>
          <input id="admin-key" type="password" value={key} onChange={(e) => setKey(e.target.value)} className="field mb-3" autoComplete="current-password" />
          {error && <p role="alert" className="mb-3 text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night">
      <header className="border-b border-line bg-night-2">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <img src={crest} alt="" className="h-10 w-10 object-contain" />
            <h1 className="text-3xl font-black text-ice-white">Sign-ups</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="btn-outline min-h-[44px] px-4 text-base">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={logout} className="btn-outline min-h-[44px] px-4 text-base" aria-label="Log out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <div className="container-site py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {["all", ...Object.keys(SOURCES)].filter((k) => k === "all" || counts[k]).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`min-h-[44px] rounded-md px-4 text-sm font-bold uppercase tracking-wider ${
                filter === k ? "bg-sand text-night" : "border border-line text-ice-white hover:border-sand"
              }`}
            >
              {k === "all" ? "All" : SOURCES[k]} · {counts[k] ?? 0}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-night-2 text-xs uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-text">No sign-ups yet</td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="border-t border-line align-top">
                    <td className="tabular whitespace-nowrap px-4 py-3 text-muted-text">{new Date(s.created_at).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-sand/15 px-2 py-1 text-xs font-bold uppercase text-sand">{SOURCES[s.source] ?? s.source}</span>
                    </td>
                    <td className="px-4 py-3 text-ice-white">
                      {s.name || "—"}
                      {s.company && <span className="block text-muted-text">{s.company}</span>}
                    </td>
                    <td className="px-4 py-3 text-ice-white">
                      <a href={`mailto:${s.email}`} className="hover:text-sand">{s.email}</a>
                      {s.phone && <span className="block text-muted-text">{s.phone}</span>}
                    </td>
                    <td className="max-w-md px-4 py-3 text-muted-text">
                      {s.country && <span className="block">Country: {s.country}</span>}
                      {s.details && Object.entries(s.details).map(([k, v]) => (
                        <span key={k} className="block">{k.replace(/_/g, " ")}: {String(v)}</span>
                      ))}
                      {s.message && <span className="mt-1 block whitespace-pre-wrap text-ice-white">{s.message}</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
