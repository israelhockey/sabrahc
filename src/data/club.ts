// Central club data. Update this file to change what the site shows.
// Empty lists show "coming soon" states on the site.

import rdpLogo from "@/assets/rdp-logo.webp";

export const club = {
  name: "Sabra HC",
  fullName: "Sabra Hockey Club",
  tagline: "Born in the Desert. Built for the Ice.",
  league: "Mountain Hockey League (MHL)",
  leagueShort: "MHL",
  season: "2026–27",
  seasonName: "The North American Tour",
  formerName: "Israel Selects",
  email: "info@sabrahc.com",
  // Add the club's real social accounts here, e.g. { label: "Instagram", href: "https://instagram.com/..." }
  socials: [] as { label: string; href: string }[],
  // Official MHL stats page for the team.
  statsUrl: "https://www.mountainhockeyleague.co/stats#/2626/team/730005/stats",
  // Set when games stream live; the Watch Live buttons link here.
  streamUrl: null as string | null,
};

export type First = {
  title: string;
  // Filled in when it happens.
  date?: string; // e.g. "24 Oct 2026"
  detail?: string;
  pending: string; // what will be recorded
};

// The club's firsts, unlocked through the seasons.
export const firsts: First[] = [
  { title: "First game", date: "24 Oct 2026", detail: "vs Mansfield Barracudas · W 5–3", pending: "Game 001" },
  { title: "First goal", date: "24 Oct 2026", detail: "Chris Blake (PP) · assist Jackson Reimer", pending: "Scorer · assists" },
  { title: "First win", date: "24 Oct 2026", detail: "5–3 vs Mansfield Barracudas", pending: "Opponent · score" },
  { title: "First shutout", pending: "Goalie · saves" },
  { title: "First weekend sweep", pending: "Two wins, one weekend" },
  { title: "First tour stop in Canada", pending: "City · date" },
  { title: "First game in Israel", pending: "Year 2 · 2027–28" },
  { title: "First European club in Israel", pending: "Target: 2027–28" },
];

export type Episode = { ep: string; title: string; shot: string; videoUrl?: string; released?: string };

// The tour docuseries. Add videoUrl + released when an episode goes live.
export const episodes: Episode[] = [
  { ep: "EP 01", title: "From Selects to Sabra", shot: "New crest in the locker room" },
  { ep: "EP 02", title: "Weekend one", shot: "Third-period comeback" },
  { ep: "EP 03", title: "The lion and the cactus", shot: "Crest design desk" },
  { ep: "EP 04", title: "On the road", shot: "Team travel at night" },
];

/* ---------- The tour ---------- */

export type TourStop = {
  id: string;
  label: string; // e.g. "Weekend 1"
  city?: string; // host city, once confirmed
  region?: string; // state / province
  country?: "USA" | "Canada";
  dates: string; // e.g. "Oct 24–25, 2026"
  opponent?: string;
  status: "played" | "next" | "planned";
  record?: string; // e.g. "1–1"
  note?: string;
};

export const tourStops: TourStop[] = [
  {
    id: "w1-mansfield",
    label: "Weekend 1",
    dates: "Oct 24–25, 2026",
    opponent: "Mansfield Barracudas",
    city: "Mansfield",
    region: "TX",
    country: "USA",
    status: "played",
    record: "1–1",
    note: "A 5–3 win, then a 7–6 loss after a four-goal third period.",
  },
];

// Cities with large Jewish communities the tour is planning to visit (not booked dates).
export type Market = { city: string; region: string; country: "USA" | "Canada"; lat: number; lon: number; mhl: boolean };

export const targetMarkets: Market[] = [
  { city: "New York", region: "NY", country: "USA", lat: 40.71, lon: -74.0, mhl: true },
  { city: "Boston", region: "MA", country: "USA", lat: 42.36, lon: -71.06, mhl: true },
  { city: "Toronto", region: "ON", country: "Canada", lat: 43.65, lon: -79.38, mhl: false },
  { city: "Montreal", region: "QC", country: "Canada", lat: 45.5, lon: -73.57, mhl: false },
  { city: "Chicago", region: "IL", country: "USA", lat: 41.88, lon: -87.63, mhl: true },
  { city: "South Florida", region: "FL", country: "USA", lat: 26.12, lon: -80.14, mhl: true },
  { city: "Tampa", region: "FL", country: "USA", lat: 27.95, lon: -82.46, mhl: true },
  { city: "Denver", region: "CO", country: "USA", lat: 39.74, lon: -104.99, mhl: true },
  { city: "Phoenix", region: "AZ", country: "USA", lat: 33.45, lon: -112.07, mhl: true },
  { city: "Las Vegas", region: "NV", country: "USA", lat: 36.17, lon: -115.14, mhl: true },
  { city: "Los Angeles", region: "CA", country: "USA", lat: 34.05, lon: -118.24, mhl: true },
  { city: "San Diego", region: "CA", country: "USA", lat: 32.72, lon: -117.16, mhl: true },
  { city: "Vancouver", region: "BC", country: "Canada", lat: 49.28, lon: -123.12, mhl: true },
];

/* ---------- Games ---------- */

export type Competition = "MHL" | "Tour exhibition" | "Israeli league" | "Sabra Series" | "International";

export type GoalEvent = {
  period: 1 | 2 | 3 | 4;
  clock: string; // game clock as shown on the sheet (time remaining), e.g. "01:30"
  scorer: string;
  assists: string[];
  strength?: "PP" | "SH" | "EN" | "PP EN";
};

export type Game = {
  id: string;
  date: string; // ISO with offset, e.g. "2026-10-24T19:00:00-05:00"
  tz: string; // IANA zone used to show the local faceoff time
  competition: Competition;
  home: boolean;
  opponent: string;
  opponentLogo?: string; // hosted on the opponent's own site
  opponentUrl?: string;
  city?: string;
  venue?: string;
  ticketUrl?: string;
  status: "scheduled" | "final" | "postponed";
  sabraScore?: number;
  opponentScore?: number;
  result?: "W" | "L" | "OTL" | "SOL" | "OTW" | "SOW";
  periods?: { us: number[]; them: number[] };
  shots?: { us: number; them: number };
  goals?: GoalEvent[];
  goalie?: { name: string; saves: number; shotsAgainst: number };
  lineup?: string[]; // player names who dressed
  preview?: string;
  recapSlug?: string;
  sheetNote?: string;
};

const MANSFIELD_LOGO = "https://assets.cdn.filesafe.space/udZTEYaqeLnoartnO3G1/media/680abe7d3ea396cce1f2fdf6.png";

const lineupG1 = [
  "Alec Elinoff", "Bailey Trexler", "Chris Blake", "Chris Sidner", "Daniel Barraza", "Dylan Hamilton", "Isaac Levy",
  "Jac Lynn", "Jackson Reimer", "Jake Nawy", "Joey Finfer", "Josh Messica", "Kieran Reimer", "Lucas Stauber",
  "Mason Martin", "Owen Wiebe", "Richie Hayward", "Sawyer Stinchfield", "Ziv Zukier",
];
const lineupG2 = [
  "Alec Elinoff", "Bailey Trexler", "Chris Blake", "Chris Sidner", "Daniel Barraza", "Dylan Hamilton", "Isaac Levy",
  "Jac Lynn", "Jackson Reimer", "Jake Nawy", "Joey Finfer", "Josh Messica", "Kieran Reimer", "Lucas Sawyer",
  "Lucas Stauber", "Mason Martin", "Owen Wiebe", "Sawyer Stinchfield",
];

// Results from the official MHL game sheets (HockeyShift). Games 201 and 202 were played under the team's former name, Israel Selects.
export const games: Game[] = [
  {
    id: "2026-10-24-mansfield",
    date: "2026-10-24T19:00:00-05:00",
    tz: "America/Chicago",
    competition: "MHL",
    home: false,
    opponent: "Mansfield Barracudas",
    opponentLogo: MANSFIELD_LOGO,
    opponentUrl: "https://mansfieldbarracudashockey.com/",
    city: "Mansfield, TX",
    venue: "Children's Health StarCenter",
    status: "final",
    sabraScore: 5,
    opponentScore: 3,
    result: "W",
    periods: { us: [1, 1, 3], them: [0, 1, 2] },
    shots: { us: 44, them: 57 },
    goalie: { name: "Josh Messica", saves: 54, shotsAgainst: 57 },
    goals: [
      { period: 1, clock: "01:30", scorer: "Chris Blake", assists: ["Jackson Reimer"], strength: "PP" },
      { period: 2, clock: "18:28", scorer: "Dylan Hamilton", assists: ["Lucas Stauber"] },
      { period: 3, clock: "07:16", scorer: "Isaac Levy", assists: ["Kieran Reimer", "Joey Finfer"], strength: "PP" },
      { period: 3, clock: "04:59", scorer: "Owen Wiebe", assists: ["Lucas Stauber"] },
      { period: 3, clock: "00:22", scorer: "Dylan Hamilton", assists: ["Jake Nawy"], strength: "EN" },
    ],
    lineup: lineupG1,
    recapSlug: "israel-selects-become-sabra-hc",
    sheetNote: "MHL game #201",
  },
  {
    id: "2026-10-25-mansfield",
    date: "2026-10-25T14:30:00-05:00",
    tz: "America/Chicago",
    competition: "MHL",
    home: false,
    opponent: "Mansfield Barracudas",
    opponentLogo: MANSFIELD_LOGO,
    opponentUrl: "https://mansfieldbarracudashockey.com/",
    city: "Mansfield, TX",
    venue: "Children's Health StarCenter",
    status: "final",
    sabraScore: 6,
    opponentScore: 7,
    result: "L",
    periods: { us: [0, 2, 4], them: [2, 5, 0] },
    shots: { us: 45, them: 53 },
    goalie: { name: "Josh Messica", saves: 46, shotsAgainst: 53 },
    goals: [
      { period: 2, clock: "17:59", scorer: "Jac Lynn", assists: [] },
      { period: 2, clock: "02:08", scorer: "Daniel Barraza", assists: [] },
      { period: 3, clock: "12:52", scorer: "Dylan Hamilton", assists: ["Mason Martin", "Sawyer Stinchfield"] },
      { period: 3, clock: "10:25", scorer: "Kieran Reimer", assists: ["Jackson Reimer", "Sawyer Stinchfield"] },
      { period: 3, clock: "07:03", scorer: "Kieran Reimer", assists: ["Mason Martin", "Jackson Reimer"], strength: "PP" },
      { period: 3, clock: "02:00", scorer: "Jackson Reimer", assists: ["Lucas Sawyer", "Kieran Reimer"] },
    ],
    lineup: lineupG2,
    recapSlug: "israel-selects-become-sabra-hc",
    sheetNote: "MHL game #202",
  },
];

/* ---------- Roster ---------- */

export type JourneyStop = { seasons: string; club: string; league: string; note?: string };

export type Player = {
  slug: string; // e.g. "daniel-cohen"
  number: number;
  firstName: string;
  lastName: string;
  position: "Forward" | "Defence" | "Goalie" | "Skater";
  tag?: "Israeli" | "Aliyah" | "International" | "U20";
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

const p = (number: number, first: string, last: string, position: Player["position"] = "Skater"): Player => ({
  slug: `${first}-${last}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  number,
  firstName: first,
  lastName: last,
  position,
});

// Roster from the October 2026 game sheets. Positions show as "Skater" until confirmed.
export const players: Player[] = [
  p(4, "Lucas", "Stauber"),
  p(5, "Jake", "Nawy"),
  p(7, "Chris", "Blake"),
  p(8, "Isaac", "Levy"),
  p(9, "Lucas", "Sawyer"),
  p(10, "Jackson", "Reimer"),
  p(11, "Daniel", "Barraza"),
  p(13, "Chris", "Sidner"),
  p(14, "Dylan", "Hamilton"),
  p(15, "Richie", "Hayward"),
  p(16, "Alec", "Elinoff"),
  p(17, "Bailey", "Trexler"),
  p(18, "Joey", "Finfer"),
  p(19, "Kieran", "Reimer"),
  p(29, "Jac", "Lynn"),
  p(30, "Josh", "Messica", "Goalie"),
  p(39, "Mason", "Martin"),
  p(39, "Ziv", "Zukier"),
  p(88, "Owen", "Wiebe"),
  p(91, "Sawyer", "Stinchfield"),
];

export type StaffMember = { name: string; role: string; photo?: string; bio?: string };

export const staff: StaffMember[] = [];

/* ---------- Partners ---------- */

export type Partner = { name: string; tier: "Presenting Partner" | "Founding Partner" | "City Partner" | "Official" | "Supporter"; logo?: string; url?: string };

// Partners who came over with the team from Israel Selects, plus RDP.
export const partners: Partner[] = [
  { name: "Lone Star Capital", tier: "Presenting Partner" },
  { name: "RDP Sports Management", tier: "Founding Partner", logo: rdpLogo },
  { name: "Roy Street Advisors", tier: "Founding Partner" },
  { name: "Straightline Management", tier: "Founding Partner" },
  { name: "Go Kosher Panama", tier: "Founding Partner" },
  { name: "Barzel Media", tier: "Founding Partner" },
];

/* ---------- The plan ---------- */

export const roadToEurope = [
  {
    season: "2026–27",
    title: "The North American Tour",
    body: "Israel's flagship team tours North America in the Mountain Hockey League, with weekend series in cities with big Jewish communities. Every stop brings the local community together.",
    gate: "A brand, fans and partners across North America",
  },
  {
    season: "2027–28",
    title: "Home to Israel",
    body: "Sabra HC plays in the Israeli league, launches the Sabra Series against an Israeli all-star selection, and brings the first European clubs to play in Israel.",
    gate: "The Israeli title",
  },
  {
    season: "2028–29",
    title: "Continental Cup",
    body: "As Israeli champions, a place in the IIHF Continental Cup, with more European visits and bigger partners.",
    gate: "Crowds and partners for a league budget",
  },
  {
    season: "By 2031",
    title: "A European league",
    body: "Sabra HC in a European league such as the Erste Liga or the Alps Hockey League, while still competing at home.",
    gate: "League admission",
  },
];
