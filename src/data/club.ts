// Central club data. Update this file to change what the site shows.
// Empty lists show tasteful "coming soon" states on the site.

import rdpLogo from "@/assets/rdp-logo.webp";

export const club = {
  name: "Sabra HC",
  fullName: "Sabra Hockey Club",
  tagline: "Born in the Desert. Built for the Ice.",
  league: "Israel National Hockey League (INHL)",
  leagueShort: "INHL",
  season: "2026–27",
  email: "info@sabrahc.com",
  // Add the club's real social accounts here, e.g. { label: "Instagram", href: "https://instagram.com/..." }
  socials: [] as { label: string; href: string }[],
  // Game 001 faceoff, Israel time, e.g. "2026-11-19T20:00:00+02:00". null = "date announced soon".
  openerDate: null as string | null,
  openerArenaId: "one-ice",
  // Set when games stream live; the Watch Live buttons link here.
  streamUrl: null as string | null,
};

export type First = {
  title: string;
  // Filled in when it happens.
  date?: string; // e.g. "19 Nov 2026"
  detail?: string; // e.g. "Daniel Cohen · assists Levi, Mizrahi · P2 12:34"
  pending: string; // what will be recorded
};

// The club's firsts, unlocked live through the season.
export const firsts: First[] = [
  { title: "First game", pending: "Game 001" },
  { title: "First goal", pending: "Scorer · assists · time" },
  { title: "First win", pending: "Opponent · score" },
  { title: "First shutout", pending: "Goalie · saves" },
  { title: "First sell-out", pending: "Arena · attendance" },
  { title: "First Sabra Series game", pending: "vs Israeli all-stars" },
  { title: "First European club in Israel", pending: "Target: summer 2027" },
  { title: "First title", pending: "INHL champions" },
];

export type Episode = { ep: string; title: string; shot: string; videoUrl?: string; released?: string };

// The Founding Season docuseries. Add videoUrl + released when an episode goes live.
export const episodes: Episode[] = [
  { ep: "EP 01", title: "Building a club from zero", shot: "Empty rink at dawn" },
  { ep: "EP 02", title: "The lion and the cactus", shot: "Crest design desk" },
  { ep: "EP 03", title: "Try-outs", shot: "First skate" },
  { ep: "EP 04", title: "Game 001", shot: "Locker room" },
];

export type Arena = {
  id: string;
  name: string;
  city: string;
  capacity: string;
  note: string;
  mapUrl?: string;
};

export const arenas: Arena[] = [
  {
    id: "one-ice",
    name: "One Ice Arena",
    city: "Near Netanya",
    capacity: "Up to 2,000 seats",
    note: "Our main venue for the biggest games of the season.",
  },
  {
    id: "blue-ice",
    name: "Blue Ice Arena",
    city: "Ashdod",
    capacity: "About 500 seats",
    note: "An intimate rink with fans right on top of the action.",
  },
];

export type Competition = "INHL" | "Sabra Series" | "International" | "Continental Cup";

export type Game = {
  id: string;
  date: string; // ISO, Israel time e.g. "2026-11-20T20:00:00+02:00"
  competition: Competition;
  home: boolean;
  opponent: string;
  arenaId?: string;
  ticketUrl?: string;
  priceFromNis?: number;
  status: "scheduled" | "final" | "postponed";
  sabraScore?: number;
  opponentScore?: number;
  result?: "W" | "L" | "OTL" | "SOL" | "OTW" | "SOW";
  preview?: string;
  recapSlug?: string;
};

// Add games here as they are confirmed. Nothing is shown until a game exists.
export const games: Game[] = [];

export type JourneyStop = { seasons: string; club: string; league: string; note?: string };

export type Player = {
  slug: string; // e.g. "daniel-cohen"
  number: number;
  firstName: string;
  lastName: string;
  position: "Forward" | "Defence" | "Goalie";
  tag: "Israeli" | "Aliyah" | "International" | "U20";
  hometown?: string;
  birthYear?: number;
  shoots?: "L" | "R";
  captain?: "C" | "A";
  photo?: string;
  eliteProspectsUrl?: string;
  lastClub?: string;
  quote?: string; // why they chose Sabra, in their words
  journey?: JourneyStop[];
};

// Roster reveal coming soon — add players here.
export const players: Player[] = [];

export type StaffMember = { name: string; role: string; photo?: string; bio?: string };

export const staff: StaffMember[] = [];

export type Partner = { name: string; tier: "Founding Partner" | "Premier" | "Official" | "Supporter"; logo?: string; url?: string };

export const partners: Partner[] = [
  { name: "RDP Sports Management", tier: "Founding Partner", logo: rdpLogo },
];

export const roadToEurope = [
  {
    season: "2026–27",
    title: "Win Israel",
    body: "Win the Israeli championship and launch the Sabra Series, our own games against an Israeli all-star selection.",
    gate: "The Israeli title",
  },
  {
    season: "2027–28",
    title: "Europe comes to Israel",
    body: "The first European pro clubs to play in Israel, starting in summer 2027. As Israeli champions, a place in the IIHF Continental Cup.",
    gate: "Visits funded by partners",
  },
  {
    season: "2028–29",
    title: "Build",
    body: "More European games every season, bigger partners, and defending the title at home.",
    gate: "Crowds and partners for a league budget",
  },
  {
    season: "By 2031",
    title: "A European league",
    body: "Sabra HC in a European league while still competing at home, the way Israel's top basketball and football clubs do.",
    gate: "League admission",
  },
];
