import { games, arenas, type Game } from "@/data/club";

export const formatGameDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Jerusalem",
  });

export const formatGameTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" });

export const arenaFor = (g: Game) => arenas.find((a) => a.id === g.arenaId);

export const upcomingGames = () =>
  games
    .filter((g) => g.status === "scheduled" && new Date(g.date) > new Date())
    .sort((a, b) => a.date.localeCompare(b.date));

export const finalGames = () =>
  games.filter((g) => g.status === "final").sort((a, b) => b.date.localeCompare(a.date));

export const seasonRecord = () => {
  const finals = finalGames();
  const w = finals.filter((g) => g.result === "W" || g.result === "OTW" || g.result === "SOW").length;
  const l = finals.filter((g) => g.result === "L").length;
  const otl = finals.filter((g) => g.result === "OTL" || g.result === "SOL").length;
  const gf = finals.reduce((s, g) => s + (g.sabraScore ?? 0), 0);
  const ga = finals.reduce((s, g) => s + (g.opponentScore ?? 0), 0);
  return { w, l, otl, gf, ga, played: finals.length };
};
