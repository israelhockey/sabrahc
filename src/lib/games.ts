import { games, players, type Game } from "@/data/club";

const tzOf = (g?: Pick<Game, "tz">) => g?.tz ?? "America/New_York";

export const formatGameDate = (iso: string, tz = "America/New_York") =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: tz });

export const formatGameTime = (iso: string, tz = "America/New_York") =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz, timeZoneName: "short" });

export const gameDate = (g: Game) => formatGameDate(g.date, tzOf(g));
export const gameTime = (g: Game) => formatGameTime(g.date, tzOf(g));
export const gamePlace = (g: Game) => [g.venue, g.city].filter(Boolean).join(", ");

export const upcomingGames = () =>
  games
    .filter((g) => g.status === "scheduled" && new Date(g.date) > new Date())
    .sort((a, b) => a.date.localeCompare(b.date));

export const finalGames = () =>
  games.filter((g) => g.status === "final").sort((a, b) => b.date.localeCompare(a.date));

export const nextGame = () => upcomingGames()[0];
export const lastGame = () => finalGames()[0];

export const seasonRecord = () => {
  const finals = finalGames();
  const w = finals.filter((g) => g.result === "W" || g.result === "OTW" || g.result === "SOW").length;
  const l = finals.filter((g) => g.result === "L").length;
  const otl = finals.filter((g) => g.result === "OTL" || g.result === "SOL").length;
  const gf = finals.reduce((s, g) => s + (g.sabraScore ?? 0), 0);
  const ga = finals.reduce((s, g) => s + (g.opponentScore ?? 0), 0);
  return { w, l, otl, gf, ga, played: finals.length };
};

export type SkaterLine = { name: string; number?: number; gp: number; g: number; a: number; pts: number };

/** Season scoring from the game sheets: games played, goals, assists, points. */
export const skaterStats = (): SkaterLine[] => {
  const map = new Map<string, SkaterLine>();
  const get = (name: string) => {
    if (!map.has(name)) map.set(name, { name, number: players.find((p) => `${p.firstName} ${p.lastName}` === name)?.number, gp: 0, g: 0, a: 0, pts: 0 });
    return map.get(name)!;
  };
  for (const g of finalGames()) {
    for (const n of g.lineup ?? []) if (n !== g.goalie?.name) get(n).gp += 1;
    for (const goal of g.goals ?? []) {
      get(goal.scorer).g += 1;
      for (const a of goal.assists) get(a).a += 1;
    }
  }
  return [...map.values()].map((s) => ({ ...s, pts: s.g + s.a })).sort((x, y) => y.pts - x.pts || y.g - x.g || x.name.localeCompare(y.name));
};

export const goalieStats = () => {
  const map = new Map<string, { name: string; gp: number; w: number; l: number; saves: number; sa: number }>();
  for (const g of finalGames()) {
    if (!g.goalie) continue;
    const s = map.get(g.goalie.name) ?? { name: g.goalie.name, gp: 0, w: 0, l: 0, saves: 0, sa: 0 };
    s.gp += 1;
    if (g.result === "W" || g.result === "OTW" || g.result === "SOW") s.w += 1;
    else s.l += 1;
    s.saves += g.goalie.saves;
    s.sa += g.goalie.shotsAgainst;
    map.set(g.goalie.name, s);
  }
  return [...map.values()].map((s) => ({ ...s, svPct: s.sa ? (s.saves / s.sa).toFixed(3).replace(/^0/, "") : "–" }));
};

export const periodLabel = (p: number) => (p === 4 ? "OT" : ["1st", "2nd", "3rd"][p - 1]);

/* ---------- Stats page ---------- */

const isWin = (g: Game) => g.result === "W" || g.result === "OTW" || g.result === "SOW";

/** Goals in the order they were scored (the sheet clock counts down). */
const chronological = (g: Game) =>
  [...(g.goals ?? [])].sort((a, b) => a.period - b.period || b.clock.localeCompare(a.clock));

export type SkaterRow = SkaterLine & { slug?: string; position?: string; ppg: number; shg: number; gwg: number; ppa: number; pPerGp: number };

/** Full skater table: goals, assists, points, power play, game winners, points per game. */
export const skaterTable = (): SkaterRow[] => {
  const base = skaterStats();
  const extra = new Map<string, { ppg: number; shg: number; gwg: number; ppa: number }>();
  const get = (n: string) => extra.get(n) ?? (extra.set(n, { ppg: 0, shg: 0, gwg: 0, ppa: 0 }), extra.get(n)!);
  for (const g of finalGames()) {
    const goals = chronological(g);
    goals.forEach((goal, i) => {
      if (goal.strength?.startsWith("PP")) {
        get(goal.scorer).ppg += 1;
        goal.assists.forEach((a) => (get(a).ppa += 1));
      }
      if (goal.strength === "SH") get(goal.scorer).shg += 1;
      if (isWin(g) && i === (g.opponentScore ?? 0)) get(goal.scorer).gwg += 1;
    });
  }
  return base.map((s) => {
    const pl = players.find((p) => `${p.firstName} ${p.lastName}` === s.name);
    const e = extra.get(s.name) ?? { ppg: 0, shg: 0, gwg: 0, ppa: 0 };
    return { ...s, ...e, slug: pl?.slug, position: pl?.position, pPerGp: s.gp ? s.pts / s.gp : 0 };
  });
};

/** Team totals from the game sheets. */
export const teamTable = () => {
  const finals = finalGames();
  const rec = seasonRecord();
  const gp = finals.length || 1;
  const sf = finals.reduce((s, g) => s + (g.shots?.us ?? 0), 0);
  const sa = finals.reduce((s, g) => s + (g.shots?.them ?? 0), 0);
  const ppg = finals.reduce((s, g) => s + (g.goals ?? []).filter((x) => x.strength?.startsWith("PP")).length, 0);
  const byPeriod = [0, 1, 2].map((i) => ({
    for: finals.reduce((s, g) => s + (g.periods?.us[i] ?? 0), 0),
    against: finals.reduce((s, g) => s + (g.periods?.them[i] ?? 0), 0),
  }));
  return { ...rec, sf, sa, ppg, byPeriod, gfPerGp: rec.gf / gp, gaPerGp: rec.ga / gp, sfPerGp: sf / gp, saPerGp: sa / gp, shPct: sf ? rec.gf / sf : 0, svPct: sa ? 1 - rec.ga / sa : 0 };
};
