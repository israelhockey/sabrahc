import crestImage from "@/assets/sabra-crest.webp";
import newsRdpPartnership from "@/assets/news-rdp-partnership.webp";
import rdpRaduPortrait from "@/assets/rdp-radu-portrait.webp";
import rdpTeamPhoto from "@/assets/rdp-team-photo.webp";
import rdpGameAction from "@/assets/rdp-game-action.webp";

export type Block =
  | string
  | { type: "heading"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Club" | "Team" | "Signings" | "Games" | "Partners";
  date: string; // ISO date
  image: string;
  imageFit?: "cover" | "contain";
  featured?: boolean;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "rdp-sports-management-founding-partner",
    title: "RDP Sports Management becomes Sabra HC's founding partner",
    excerpt:
      "Toronto-based RDP Sports Management signs on as the club's first partner for the 2026–27 season, bringing a network that reaches into Romanian and Hungarian hockey.",
    category: "Partners",
    date: "2026-04-10",
    image: newsRdpPartnership,
    body: [
      "Sabra Hockey Club has signed its first partner ahead of the 2026–27 season. RDP Sports Management, a Toronto-based athlete representation and sports marketing firm led by founder Radu Daniel Popescu, joins as the club's founding partner.",
      { type: "heading", text: "Who RDP are" },
      "Founded in 2013, RDP represents professional and amateur athletes across hockey, tennis, bobsleigh, speed skating and track and field, with more than 17 clients in 6 countries. The firm handles representation, contracts, sports marketing and public relations.",
      { type: "image", src: rdpRaduPortrait, alt: "Radu Daniel Popescu, founder of RDP Sports Management", caption: "Radu Daniel Popescu, founder of RDP Sports Management." },
      "Popescu and his team have a long record of supporting Israeli and Jewish causes, which made the fit with Sabra HC a natural one.",
      { type: "pullquote", text: "RDP believed in what Sabra HC stands for before the first puck dropped. That is exactly the kind of partner we want to build with." },
      { type: "heading", text: "Opening doors in Europe" },
      "Through Popescu's close working relationships with clubs in Romania and Hungary, RDP is helping Sabra HC open conversations with European teams about playing in Israel, a key step on the club's road to European hockey.",
      { type: "image", src: rdpTeamPhoto, alt: "Israeli team photo on the ice", caption: "RDP's network reaches across European hockey." },
      { type: "image", src: rdpGameAction, alt: "Game action from a hockey event", caption: "RDP has deep roots in the hockey world." },
      { type: "heading", text: "On the ice and beyond" },
      "The partnership covers jersey and arena branding, events and community programs, and the club's digital channels.",
      "For partnership enquiries, contact Sabra HC at info@sabrahc.com.",
    ],
  },
  {
    slug: "introducing-sabra-hockey-club",
    title: "Introducing Sabra Hockey Club: born in the desert, built for the ice",
    excerpt:
      "Israel's new flagship hockey club launches with a clear goal: win at home, then take Israeli hockey into European competition.",
    category: "Club",
    date: "2026-03-15",
    image: crestImage,
    imageFit: "contain",
    featured: true,
    body: [
      "Today we introduce Sabra Hockey Club, a new club built to be Israel's flagship team and to take Israeli hockey into European competition.",
      { type: "heading", text: "Why Sabra" },
      "A sabra is the cactus fruit that is tough on the outside and sweet on the inside, and the word Israelis use for someone born here. It is how we want to play: hard to beat, and proud of where we come from.",
      { type: "heading", text: "The crest" },
      "The lion stands for strength, its mane grown from sabra cactus. The Star of David anchors the club to its home. Navy for the desert night, gold for the sand, white for the ice.",
      { type: "pullquote", text: "We want to be the club young Israeli players dream of playing for, and the club Jewish players around the world see as their way home." },
      { type: "heading", text: "The plan" },
      "Our first goal is the Israeli championship. Alongside the league, we are launching the Sabra Series, our own games against an Israeli all-star selection. From summer 2027 we plan to bring European pro clubs to play in Israel for the first time, and as Israeli champions we aim to compete in the IIHF Continental Cup. The long-term goal is a place in a European league while still competing at home.",
      { type: "heading", text: "A path home" },
      "Sabra HC gives Israel's best players a reason to stay, gives young players a club to aim for, and gives Jewish players around the world a way to build a life in Israel through hockey.",
      "This is the first chapter. Join the Pride and follow every step at sabrahc.com.",
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
