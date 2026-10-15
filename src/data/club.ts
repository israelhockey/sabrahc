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
};

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

export type Player = {
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
