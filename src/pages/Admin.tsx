import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Download, Users, Mail, Heart, Filter } from "lucide-react";

type Signup = {
  id: string;
  name: string | null;
  email: string;
  source: string;
  created_at: string;
};

const sourceLabels: Record<string, { label: string; icon: typeof Users }> = {
  founders: { label: "Founders", icon: Heart },
  fans: { label: "Fan Zone", icon: Users },
  newsletter: { label: "Newsletter", icon: Mail },
};

const Admin = () => {
  const [key, setKey] = useState(() => localStorage.getItem("sabra_admin_key") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSignups = async (adminKey: string, source = "all") => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ key: adminKey });
      if (source !== "all") params.set("source", source);

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const url = `https://${projectId}.supabase.co/functions/v1/admin-signups?${params.toString()}`;
      
      const res = await fetch(url, {
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Invalid admin key");
          setAuthenticated(false);
          return;
        }
        throw new Error("Failed to fetch");
      }

      const result = await res.json();
      setSignups(result);
      setAuthenticated(true);
      localStorage.setItem("sabra_admin_key", adminKey);
    } catch {
      setError("Failed to load signups");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSignups(key);
  };

  useEffect(() => {
    if (authenticated) {
      fetchSignups(key, filter);
    }
  }, [filter]);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Source", "Date"];
    const rows = signups.map((s) => [
      s.name || "",
      s.email,
      s.source,
      new Date(s.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sabra-signups-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="glass-card rounded-sm p-8 max-w-sm w-full mx-4">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h1 className="font-heading text-lg tracking-wider text-foreground">ADMIN ACCESS</h1>
          </div>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors mb-3"
          />
          {error && <p className="text-destructive text-xs mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-heading text-sm tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            {loading ? "CHECKING..." : "ENTER"}
          </button>
        </form>
      </div>
    );
  }

  const counts = {
    all: signups.length,
    founders: signups.filter((s) => s.source === "founders").length,
    fans: signups.filter((s) => s.source === "fans").length,
    newsletter: signups.filter((s) => s.source === "newsletter").length,
  };

  const filtered = filter === "all" ? signups : signups.filter((s) => s.source === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h1 className="font-heading text-lg tracking-wider text-foreground">SABRA HC — SIGNUPS</h1>
            </div>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-heading tracking-wider border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              EXPORT CSV
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(["all", "founders", "fans", "newsletter"] as const).map((src) => {
            const info = src === "all"
              ? { label: "Total", icon: Filter }
              : sourceLabels[src];
            const Icon = info.icon;
            return (
              <button
                key={src}
                onClick={() => setFilter(src)}
                className={`p-4 rounded-sm border transition-all text-left ${
                  filter === src
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <Icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-2xl font-display text-foreground">{counts[src]}</p>
                <p className="text-xs text-muted-foreground font-heading tracking-wider">{info.label.toUpperCase()}</p>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="glass-card rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-heading tracking-wider text-muted-foreground">NAME</th>
                  <th className="text-left px-4 py-3 text-xs font-heading tracking-wider text-muted-foreground">EMAIL</th>
                  <th className="text-left px-4 py-3 text-xs font-heading tracking-wider text-muted-foreground">SOURCE</th>
                  <th className="text-left px-4 py-3 text-xs font-heading tracking-wider text-muted-foreground">DATE</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground text-sm">
                      No signups yet
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground">{s.name || "—"}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{s.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-heading tracking-wider px-2 py-1 rounded bg-primary/10 text-primary">
                          {s.source.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
