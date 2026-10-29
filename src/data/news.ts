import crestImage from "@/assets/sabra-crest.webp";
import newsRdpPartnership from "@/assets/news-rdp-partnership.webp";
import rdpRaduPortrait from "@/assets/rdp-radu-portrait.webp";
import rdpTeamPhoto from "@/assets/rdp-team-photo.webp";
import rdpGameAction from "@/assets/rdp-game-action.webp";

/*
  Story blocks. Mix these in any order in an article's body:
  - "plain text"                                  a paragraph (the first one becomes the big lead)
  - { type: "heading", text }                     a numbered section heading (also builds "In this story")
  - { type: "pullquote", text, by? }              a big quote
  - { type: "image", src, alt, caption? }         a framed photo
  - { type: "facts", title?, items: [[label, value]] }   an "At a glance" card (also shown in the sidebar)
  - { type: "stats", items: [[number, label]] }   big numbers in a row
  - { type: "timeline", items: [[when, what]] }   a vertical timeline
  - { type: "callout", title, text, cta?, to? }   a navy call-to-action box
*/
export type Block =
  | string
  | { type: "heading"; text: string }
  | { type: "pullquote"; text: string; by?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "facts"; title?: string; items: [string, string][] }
  | { type: "stats"; items: [string, string][] }
  | { type: "timeline"; items: [string, string][] }
  | { type: "callout"; title: string; text: string; cta?: string; to?: string };

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
    slug: "israel-selects-become-sabra-hc",
    title: "Israel Selects become Sabra HC, and the North American tour is on",
    excerpt:
      "The team that has toured North America as Israel Selects for three seasons is now Sabra HC. Weekend one is done: a 5–3 win and a 7–6 thriller against the Mansfield Barracudas.",
    category: "Club",
    date: "2026-10-29",
    image: crestImage,
    imageFit: "contain",
    featured: true,
    body: [
      "For three seasons, Israel Selects have brought Israeli and Jewish players together to play across North America. This season the team has a new name and a bigger mission: Israel Selects are now Sabra HC, Israel's flagship hockey club.",
      {
        type: "facts",
        items: [
          ["Former name", "Israel Selects"],
          ["New name", "Sabra HC"],
          ["League", "Mountain Hockey League"],
          ["Weekend one", "1 win, 1 loss"],
        ],
      },
      { type: "heading", text: "Same players, new name" },
      "Nothing about who we are has changed. The players still live across North America and join the tour weekend by weekend. What changes is what they play for: a club with a five-year plan to take Israeli hockey home and then into Europe.",
      "This season Sabra HC tours North America in the Mountain Hockey League, with weekend series in cities with big Jewish communities. Every stop is a community event, with the games, a meet-and-greet with the players and a local partner.",
      { type: "heading", text: "Weekend one: Mansfield" },
      {
        type: "stats",
        items: [
          ["5–3", "Win, Oct 24"],
          ["7–6", "Loss, Oct 25"],
          ["11", "Goals in two games"],
        ],
      },
      "The first game ended 5–3. Chris Blake scored the first goal on a power play late in the first period, set up by Jackson Reimer. Dylan Hamilton scored twice, including an empty-netter to close it out, and Isaac Levy and Owen Wiebe added goals in a three-goal third period. In goal, Josh Messica stopped 54 of 57 shots.",
      "The second game was a wild one. Mansfield led 7–2 after two periods, and the team answered with four unanswered goals in the third. Kieran Reimer scored twice, Jackson Reimer added a goal and two assists, and Dylan Hamilton scored his third of the weekend. The comeback came up one goal short, 7–6, with Messica making 46 saves.",
      { type: "heading", text: "The road from here" },
      {
        type: "timeline",
        items: [
          ["2026–27", "The North American Tour: weekend series across the US and Canada"],
          ["2027–28", "Home to Israel: the Israeli league, the Sabra Series and the first European clubs in Israel"],
          ["As champions", "The IIHF Continental Cup"],
          ["By 2031", "A place in a European league such as the Erste Liga or the Alps Hockey League"],
        ],
      },
      { type: "heading", text: "Thank you to our partners" },
      "Lone Star Capital, our presenting partner, and Roy Street Advisors, Straightline Management, Go Kosher Panama, Barzel Media and RDP Sports Management have been with this team from the start. They're the founding partners of Sabra HC.",
      "The next weekend series is being booked now. Results and stats from every game are on the schedule page, straight from the official league game sheets.",
      {
        type: "callout",
        title: "Bring Sabra HC to your city",
        text: "Local businesses and community groups can host a tour weekend, with your name on the games, the stream and the community event.",
        cta: "Become a city partner",
        to: "/partners#city-partner",
      },
    ],
  },
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
      {
        type: "facts",
        items: [
          ["Partner", "RDP Sports Management"],
          ["Based in", "Toronto, Canada"],
          ["Founder", "Radu Daniel Popescu"],
          ["Role", "Founding Partner, 2026–27"],
        ],
      },
      { type: "heading", text: "Who RDP are" },
      "Founded in 2013, RDP represents professional and amateur athletes across hockey, tennis, bobsleigh, speed skating and track and field, with more than 17 clients in 6 countries. The firm handles representation, contracts, sports marketing and public relations.",
      {
        type: "stats",
        items: [
          ["2013", "Founded"],
          ["17+", "Clients"],
          ["6", "Countries"],
        ],
      },
      { type: "image", src: rdpRaduPortrait, alt: "Radu Daniel Popescu, founder of RDP Sports Management", caption: "Radu Daniel Popescu, founder of RDP Sports Management." },
      "Popescu and his team have a long record of supporting Israeli and Jewish causes, which made the fit with Sabra HC a natural one.",
      { type: "pullquote", text: "RDP believed in what Sabra HC stands for before the first puck dropped. That is exactly the kind of partner we want to build with." },
      { type: "heading", text: "Opening doors in Europe" },
      "Through Popescu's close working relationships with clubs in Romania and Hungary, RDP is helping Sabra HC open conversations with European teams about playing in Israel, a key step on the club's road to European hockey.",
      { type: "image", src: rdpTeamPhoto, alt: "Israeli team photo on the ice", caption: "RDP's network reaches across European hockey." },
      { type: "image", src: rdpGameAction, alt: "Game action from a hockey event", caption: "RDP has deep roots in the hockey world." },
      { type: "heading", text: "On the ice and beyond" },
      "The partnership covers jersey and arena branding, events and community programs, and the club's digital channels.",
      {
        type: "callout",
        title: "Want to be on the jersey too?",
        text: "Partners who join now grow with the club from day one. Tell us about your company and we'll come back with options that fit.",
        cta: "Become a partner",
        to: "/partners",
      },
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
    body: [
      "Today we introduce Sabra Hockey Club, a new club built to be Israel's flagship team and to take Israeli hockey into European competition.",
      {
        type: "facts",
        items: [
          ["Founded", "2026"],
          ["Home", "Israel"],
          ["First season", "North American tour (MHL)"],
          ["Colours", "Navy, gold and white"],
        ],
      },
      { type: "heading", text: "Why Sabra" },
      "A sabra is the cactus fruit that is tough on the outside and sweet on the inside, and the word Israelis use for someone born here. It is how we want to play: hard to beat, and proud of where we come from.",
      { type: "heading", text: "The crest" },
      "The lion stands for strength, its mane grown from sabra cactus. The Star of David anchors the club to its home. Navy for the desert night, gold for the sand, white for the ice.",
      { type: "pullquote", text: "We want to be the club young Israeli players dream of playing for, and the club Jewish players around the world see as their way home." },
      { type: "heading", text: "The plan" },
      "Updated October 2026: our first season is a North American tour in the Mountain Hockey League, building the brand, the fan base and our partners in cities with big Jewish communities. In 2027–28 we come home to play in the Israeli league, launch the Sabra Series against an Israeli all-star selection, and bring the first European clubs to play in Israel. As Israeli champions we aim to compete in the IIHF Continental Cup, and the long-term goal is a place in a European league while still competing at home.",
      {
        type: "timeline",
        items: [
          ["2026–27", "The North American Tour in the Mountain Hockey League"],
          ["2027–28", "Home to Israel: the Israeli league, the Sabra Series and the first European clubs in Israel"],
          ["As champions", "Compete in the IIHF Continental Cup"],
          ["Long term", "A place in a European league, while still competing at home"],
        ],
      },
      { type: "heading", text: "A path home" },
      "Sabra HC gives Israel's best players a reason to stay, gives young players a club to aim for, and gives Jewish players around the world a way to build a life in Israel through hockey.",
      {
        type: "callout",
        title: "This is the first chapter",
        text: "Become a founding member and be part of every first, from the first tour stop to the first game in Israel.",
        cta: "Join the Pride",
        to: "/pride",
      },
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

const words = (a: Article) =>
  a.body.reduce((n, b) => n + (typeof b === "string" ? b : "text" in b ? b.text : "").split(/\s+/).length, a.excerpt.split(/\s+/).length);
export const readingMinutes = (a: Article) => Math.max(1, Math.round(words(a) / 200));

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
