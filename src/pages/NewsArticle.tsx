import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Calendar, Clock } from "lucide-react";

import newsAnnouncement from "@/assets/news-announcement.jpg";
import newsSigning from "@/assets/news-signing.jpg";
import newsTraining from "@/assets/news-training.jpg";
import newsLeague from "@/assets/news-league.jpg";
import newsJerseys from "@/assets/news-jerseys.jpg";
import newsArena from "@/assets/news-arena.jpg";
import newsYouth from "@/assets/news-youth.jpg";

const articles = [
  {
    id: 0,
    slug: "introducing-sabra-hockey-club",
    title: "Introducing Sabra Hockey Club: Born in the Desert, Built for the Ice",
    excerpt: "Israel's first professional hockey club is here. Sabra HC is more than a team — it's a movement to elevate Israeli hockey, create pathways for Jewish athletes worldwide, and build a lasting legacy on the ice.",
    category: "ANNOUNCEMENT",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: newsAnnouncement,
    body: [
      "Today marks a historic moment for the sport of ice hockey in the State of Israel. After decades of grassroots passion, international competition, and the tireless dedication of players, coaches, and families who kept the dream alive — we are proud to officially introduce Sabra Hockey Club, Israel's first professional ice hockey organization.",

      "This is not just the birth of a hockey team. This is the beginning of a new era.",

      "For over 40 years, Israeli hockey has existed in the margins — a sport played by passionate athletes who traveled abroad to pursue their dreams, competed on the international stage under the Israeli flag, and returned home to a country that had no professional league to offer them. Talented players were forced to leave Israel to develop their careers, and many never came back. The pipeline led outward, and the talent drain was real.",

      "Sabra HC was created to reverse that trajectory. To give Israeli hockey players a reason to stay. To build something professional, competitive, and enduring right here at home.",

      "The name 'Sabra' was chosen with deep intention. In Hebrew, a Sabra — צבר — refers to a native-born Israeli, derived from the sabra cactus fruit: tough and thorny on the outside, sweet and soft on the inside. It's the perfect metaphor for the Israeli spirit, and it captures exactly what this club is about. We are resilient. We are proud. And we are ready to compete.",

      "\"The Sabra identity is woven into everything we do,\" said the club's founding team. \"From the name to the crest to the culture we're building — this club is a reflection of Israel itself. Tough, determined, and full of heart.\"",

      "At the center of our crest stands the Lion of Judah — an ancient symbol of strength, courage, and leadership that has represented the Jewish people for millennia. The lion is not just a mascot; it is a declaration. It says that we are here, we are fierce, and we will not be outworked. The shield that frames the lion represents protection and unity, and the gold and navy colorway connects the club to both royalty and the deep blue of the Mediterranean that borders our homeland.",

      "Every element of the crest was designed to tell a story. The cactus motifs that appear throughout our branding are a direct nod to the Sabra spirit — born in the harshest conditions, thriving against all odds. The Star of David, subtly integrated into the design, anchors the club to its Jewish and Israeli roots. This is a crest meant to be worn with pride, whether you're on the ice in Budapest or watching from a living room in Tel Aviv.",

      "But Sabra HC is about far more than symbolism. At its core, this club exists to solve a real problem: the absence of a professional hockey infrastructure in Israel.",

      "For years, Israeli players who wanted to pursue hockey at the highest level had only one option — leave the country. Move to Canada, the United States, or Europe. Train in foreign systems, play for foreign clubs, and hope for a shot. Many of these athletes are Israeli-born. Many are Jewish players from the diaspora who dream of connecting to Israel. Until now, there was no professional pathway that kept them here or brought them home.",

      "Sabra HC changes that. We are building an independent professional club that operates under the Israel Ice Hockey Federation. Rather than joining an existing league, Sabra HC will chart its own course — hosting and traveling to face professional teams from Romania, Hungary, Poland, and beyond in a 40+ game season of international and domestic competition. Our roster will feature 15-17 Israeli players, 3-5 international imports, and 5 local U20 development players — a structure designed to be both competitive and developmental. The long-term vision is clear: 3-5 years of building as an independent professional organization before applying to join an established European league.",

      "\"We want to be the club that young Israeli players dream of playing for,\" said the front office. \"And we want to be the club that Jewish athletes around the world see as their bridge to Israel. Hockey can be the vehicle for Aliyah, for connection, for belonging.\"",

      "This vision extends beyond current players. Sabra HC is establishing a formal development foundation — a structured pipeline that takes young Israeli players from their first skating lessons to professional competition. Through partnerships with the Israeli Ice Hockey Federation, we will run youth camps, coaching clinics, scouting networks, and junior development programs that create a clear pathway from grassroots to the professional roster.",

      "The development program is not an afterthought. It is the foundation of everything we're building. A professional club without youth development is a short-term project. We are building for generations.",

      "For Jewish hockey players around the world — in North America, Europe, and beyond — Sabra HC represents something unprecedented: a professional hockey club in Israel that can facilitate Aliyah through sport. Players can pursue their athletic careers while building a life in Israel, contributing to the country's sporting landscape, and connecting to their heritage in the most tangible way possible.",

      "For non-Jewish international players, Sabra HC offers a unique professional opportunity — the chance to compete at a high level while experiencing life in one of the world's most dynamic countries. Israel's professional sports landscape has proven this model works. Basketball and soccer clubs like Maccabi Tel Aviv and Hapoel have attracted international talent for decades. Now hockey joins that tradition.",

      "Our home will be the One Ice Arena near Netanya — Israel's largest ice facility, currently undergoing upgrades to meet European professional standards — with additional games hosted at the Blue Ice Arena in Ashdod. Together, these venues give the club geographic reach across Israel and the capacity to build a true fan culture from day one.",

      "\"The atmosphere we want to create is unlike anything Israeli hockey has seen,\" said the club. \"We want packed stands, we want energy, we want families and kids and die-hard fans who live and breathe this team. We want to build a hockey culture in Israel that rivals what you see in Prague, Helsinki, or Montreal.\"",

      "The inaugural 2026-27 season will kick off in September 2026 and run through March 2027. While the journey is just beginning, the ambition is clear: compete immediately, develop relentlessly, and build something that lasts. This is not a vanity project. This is not a one-season experiment. Sabra HC is being built with the operational rigor of a professional sports organization — a full-time coaching staff, professional training facilities, structured competition, and the administrative backbone to sustain long-term growth.",

      "We are calling on fans, supporters, and believers in this vision to join us from the ground floor. Our Founding Membership program offers exclusive access, recognition, and the chance to say you were there from the very beginning. History is being written, and every founding member's name will be part of it.",

      "To the Israeli hockey community that has fought for this moment for four decades — this is for you. To the players who left home because there was nowhere to play — we're building your home. To the young kids lacing up skates for the first time in Metula, Holon, or Bat Yam — your dream just got a whole lot closer.",

      "Born in the desert. Built for the ice. Welcome to Sabra Hockey Club.",
    ],
    featured: true,
  },
  {
    id: 1,
    slug: "sabra-hc-signs-alon-eizenman",
    title: "Sabra HC Signs Forward Alon Eizenman as First Roster Addition",
    excerpt: "The 24-year-old Israeli forward becomes the first officially signed player for the inaugural Sabra HC roster, bringing national team experience and a scoring touch.",
    category: "ROSTER",
    date: "March 10, 2025",
    readTime: "4 min read",
    image: newsSigning,
    body: [
      "Sabra Hockey Club is proud to announce the signing of forward Alon Eizenman, marking the club's first official roster addition ahead of its inaugural 2026-27 season.",
      "The 24-year-old Israeli forward brings a wealth of experience from his time with the Israeli national team, where he's been a consistent contributor in international competition. Known for his speed, vision, and finishing ability, Eizenman represents the caliber of player Sabra HC aims to build around.",
      "\"This is a historic moment for the club,\" said the Sabra HC front office. \"Alon embodies the spirit of what we're building — a player with deep roots in Israeli hockey who has the talent and drive to compete at the European level.\"",
      "Eizenman expressed his excitement about joining the project from the ground floor: \"To be the first player signed by Sabra HC is an incredible honor. I believe in the vision of this club and I want to be part of something special. We're going to put Israeli hockey on the map.\"",
      "The forward is expected to be a key piece of the roster as the club prepares for its debut season, competing against international teams from Romania, Hungary, Poland, and more.",
      "Additional roster announcements are expected in the coming weeks as the club continues to build a competitive squad for the upcoming season."
    ],
    featured: false,
  },
  {
    id: 2,
    slug: "pre-season-training-camp-august-2025",
    title: "Pre-Season Training Camp Dates Announced for August 2025",
    excerpt: "The club has announced a three-week training camp at the One Ice Arena near Netanya, beginning August 15th.",
    category: "TEAM NEWS",
    date: "March 8, 2025",
    readTime: "3 min read",
    image: newsTraining,
    body: [
      "Sabra HC has officially announced that its inaugural pre-season training camp will take place at the One Ice Arena near Netanya, beginning August 15th, 2025.",
      "The three-week camp will serve as the club's primary preparation period ahead of the 2025-26 EIHL season. Players will undergo fitness testing, tactical sessions, and intra-squad scrimmages to build chemistry and establish the team's playing identity.",
      "\"Training camp is where the real work begins,\" said the coaching staff. \"We'll use these three weeks to evaluate talent, build systems, and create the culture that will define Sabra HC.\"",
      "The One Ice Arena near Netanya, Israel's largest ice facility, is currently undergoing upgrades to meet European professional standards. The renovations are expected to be completed well in advance of the camp's start date.",
      "Fans will have the opportunity to attend select open practices during the camp period. Details on public access and fan events will be announced closer to the date.",
      "Players who have been extended invitations to camp are expected to arrive by August 13th for medical evaluations and orientation."
    ],
    featured: false,
  },
  {
    id: 3,
    slug: "eihl-partnership-confirmed",
    title: "Partnership with European Interleague Hockey League Confirmed",
    excerpt: "Sabra HC will compete in the EIHL alongside teams from Romania, Hungary, and Serbia in its debut 2025-26 season.",
    category: "LEAGUE",
    date: "March 5, 2025",
    readTime: "3 min read",
    image: newsLeague,
    body: [
      "Sabra Hockey Club has officially confirmed its participation in the European Interleague Hockey League (EIHL) for the 2025-26 season, marking a landmark moment for Israeli professional hockey.",
      "The EIHL features clubs from across Central and Eastern Europe, including teams from Romania, Hungary, and Serbia. Sabra HC will be the first Israeli club to compete in the league, opening new doors for the sport in the region.",
      "\"Joining the EIHL gives our players the chance to compete against quality European opposition on a regular basis,\" said the club's management. \"This is exactly the kind of platform Israeli hockey needs to grow.\"",
      "The league schedule is expected to feature home and away matchups, with Sabra HC hosting games at both the One Ice Arena near Netanya and the Blue Ice Arena in Ashdod.",
      "Travel logistics and game scheduling are currently being finalized with league officials. The full 2025-26 season schedule is expected to be released by June 2025.",
      "This partnership represents a significant step in Sabra HC's mission to elevate Israeli hockey to a professional, internationally competitive level."
    ],
    featured: false,
  },
  {
    id: 4,
    slug: "jersey-reveal-navy-gold",
    title: "Jersey Reveal: Navy & Gold Home Kit Unveiled",
    excerpt: "The official Sabra HC jerseys feature the Sabra Lion crest and a design inspired by the desert spirit of Israel.",
    category: "MERCH",
    date: "March 2, 2025",
    readTime: "3 min read",
    image: newsJerseys,
    body: [
      "Sabra HC has unveiled its official home jersey for the inaugural 2025-26 season, and the response from the hockey community has been overwhelmingly positive.",
      "The home jersey features a deep navy base with gold and white accents, prominently displaying the Sabra Lion crest at the center. The cactus shoulder patches and Star of David details connect the team to its Israeli roots.",
      "\"Our jerseys tell a story,\" said the design team. \"Every element — from the Sabra lion crest to the cactus patches — connects the player wearing it to the spirit of Israel. Born in the desert, tough on the outside, sweet on the inside. That's the Sabra identity.\"",
      "The jersey features 'Born in the Desert' stitched inside the collar, a nod to the team's motto and the Sabra spirit that defines Israeli culture.",
      "Both jerseys are constructed with performance-grade materials suitable for professional play, and replica versions will be available for fans through the club's official merchandise store.",
      "Pre-orders for replica jerseys are expected to open in the coming weeks, with founding members receiving priority access and exclusive pricing."
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "one-ice-arena-upgrades",
    title: "One Ice Arena Upgrades Underway for Pro Hockey Standards",
    excerpt: "Renovations to Israel's primary ice rink near Netanya are set to bring the facility up to European professional hockey standards.",
    category: "FACILITY",
    date: "February 26, 2025",
    readTime: "3 min read",
    image: newsArena,
    body: [
      "Significant renovations are underway at the One Ice Arena near Netanya, Israel's premier ice sports facility, to prepare it for professional-level hockey competition.",
      "The upgrades include improvements to the ice surface quality, enhanced lighting systems, updated player facilities including locker rooms and training areas, and expanded seating capacity to better accommodate game-day crowds.",
      "\"The One Ice Arena has been a cornerstone of Israeli ice sports,\" said facility management. \"These upgrades ensure it can serve as a proper home venue for professional hockey at the European level.\"",
      "The renovation project is being coordinated with Sabra HC's timeline, with all major work expected to be completed before the club's August 2025 pre-season training camp.",
      "Additional improvements to fan amenities, including concession areas and merchandise retail space, are also part of the renovation plan.",
      "The One Ice Arena will serve as one of two home venues for Sabra HC, alongside the Blue Ice Arena in Ashdod, giving the club geographic reach across Israel."
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "youth-development-partnership",
    title: "Youth Development Partnership Announced with Israeli Ice Hockey Federation",
    excerpt: "Sabra HC and the IIHF Israel branch will collaborate on youth camps, scouting, and player development pipelines.",
    category: "DEVELOPMENT",
    date: "February 20, 2025",
    readTime: "4 min read",
    image: newsYouth,
    body: [
      "Sabra HC has announced a formal partnership with the Israeli Ice Hockey Federation to establish a comprehensive youth development program aimed at growing the next generation of Israeli hockey talent.",
      "The partnership will encompass youth training camps, scouting programs across Israel, and the creation of a structured player development pipeline from grassroots to professional level.",
      "\"Developing local talent is at the core of our mission,\" said Sabra HC's management. \"We don't just want to field a competitive team — we want to build a sustainable hockey culture in Israel that produces players for decades to come.\"",
      "Initial programs will include summer hockey camps for youth aged 8-16, coaching clinics for local instructors, and a formalized scouting network to identify and nurture promising young players.",
      "The Federation expressed enthusiasm about the collaboration: \"Having a professional club invested in youth development changes everything. It gives young Israeli players a tangible goal — a professional team they can aspire to play for.\"",
      "Long-term plans include the establishment of a Sabra HC junior team that would compete in regional youth leagues, providing a clear pathway from development programs to the professional roster."
    ],
    featured: false,
  },
];

export { articles };

const NewsArticle = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/news" replace />;

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      {/* Hero image header */}
      <section className="relative pt-0 overflow-hidden">
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left z-10"
          />
        </div>

        <div className="container relative z-10 -mt-32 md:-mt-40 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/news" className="hover:text-foreground transition-colors">News</Link>
            <ChevronRight size={12} />
            <span className="text-primary">{article.category}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to News
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-5"
          >
            <span className="inline-block px-4 py-1.5 text-[10px] font-heading tracking-[0.2em] text-primary bg-primary/10 border border-primary/30 rounded-sm backdrop-blur-sm">
              {article.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-primary/60" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-primary/60" />
                {article.readTime}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-4xl"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            {article.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-16 h-0.5 bg-primary mb-10"
            />

            {article.body.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`text-muted-foreground leading-[1.9] mb-6 ${
                  i === 0
                    ? "text-lg text-foreground/90 font-medium first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                    : paragraph.startsWith('"')
                    ? "border-l-2 border-primary/40 pl-6 italic text-foreground/80"
                    : ""
                }`}
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="flex items-center gap-3 mt-12 pt-8 border-t border-border/50">
              <div className="w-3 h-3 bg-primary rotate-45" />
              <span className="text-xs text-muted-foreground tracking-widest font-heading">SABRA HC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="py-12 lg:py-20 bg-card/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl text-foreground">MORE NEWS</h2>
            <div className="w-12 h-0.5 bg-primary mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherArticles.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/news/${a.slug}`}
                  className="block glass-card-hover rounded-sm overflow-hidden h-full group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-3">
                      {a.category}
                    </span>
                    <h3 className="font-heading text-sm tracking-wider text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsArticle;
