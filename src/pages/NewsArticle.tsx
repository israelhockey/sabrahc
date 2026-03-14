import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Calendar, Clock } from "lucide-react";

import newsSigning from "@/assets/news-signing.jpg";
import newsTraining from "@/assets/news-training.jpg";
import newsLeague from "@/assets/news-league.jpg";
import newsJerseys from "@/assets/news-jerseys.jpg";
import newsArena from "@/assets/news-arena.jpg";
import newsYouth from "@/assets/news-youth.jpg";

const articles = [
  {
    id: 1,
    slug: "jerusalem-hc-signs-alon-eizenman",
    title: "Jerusalem HC Signs Forward Alon Eizenman as First Roster Addition",
    excerpt: "The 24-year-old Israeli forward becomes the first officially signed player for the inaugural Jerusalem HC roster, bringing national team experience and a scoring touch.",
    category: "ROSTER",
    date: "March 10, 2025",
    readTime: "4 min read",
    image: newsSigning,
    body: [
      "Jerusalem Hockey Club is proud to announce the signing of forward Alon Eizenman, marking the club's first official roster addition ahead of its inaugural 2025-26 season.",
      "The 24-year-old Israeli forward brings a wealth of experience from his time with the Israeli national team, where he's been a consistent contributor in international competition. Known for his speed, vision, and finishing ability, Eizenman represents the caliber of player Jerusalem HC aims to build around.",
      "\"This is a historic moment for the club,\" said the Jerusalem HC front office. \"Alon embodies the spirit of what we're building — a player with deep roots in Israeli hockey who has the talent and drive to compete at the European level.\"",
      "Eizenman expressed his excitement about joining the project from the ground floor: \"To be the first player signed by Jerusalem HC is an incredible honor. I believe in the vision of this club and I want to be part of something special. We're going to put Israeli hockey on the map.\"",
      "The forward is expected to be a key piece of the roster as the club prepares for its debut season in the European Interleague Hockey League (EIHL), competing against teams from Romania, Hungary, and Serbia.",
      "Additional roster announcements are expected in the coming weeks as the club continues to build a competitive squad for the upcoming season."
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "pre-season-training-camp-august-2025",
    title: "Pre-Season Training Camp Dates Announced for August 2025",
    excerpt: "The club has announced a three-week training camp at the Canada Centre in Metula, beginning August 15th.",
    category: "TEAM NEWS",
    date: "March 8, 2025",
    readTime: "3 min read",
    image: newsTraining,
    body: [
      "Jerusalem HC has officially announced that its inaugural pre-season training camp will take place at the Canada Centre in Metula, beginning August 15th, 2025.",
      "The three-week camp will serve as the club's primary preparation period ahead of the 2025-26 EIHL season. Players will undergo fitness testing, tactical sessions, and intra-squad scrimmages to build chemistry and establish the team's playing identity.",
      "\"Training camp is where the real work begins,\" said the coaching staff. \"We'll use these three weeks to evaluate talent, build systems, and create the culture that will define Jerusalem HC.\"",
      "The Canada Centre in Metula, Israel's premier ice facility, is currently undergoing upgrades to meet European professional standards. The renovations are expected to be completed well in advance of the camp's start date.",
      "Fans will have the opportunity to attend select open practices during the camp period. Details on public access and fan events will be announced closer to the date.",
      "Players who have been extended invitations to camp are expected to arrive in Metula by August 13th for medical evaluations and orientation."
    ],
    featured: false,
  },
  {
    id: 3,
    slug: "eihl-partnership-confirmed",
    title: "Partnership with European Interleague Hockey League Confirmed",
    excerpt: "Jerusalem HC will compete in the EIHL alongside teams from Romania, Hungary, and Serbia in its debut 2025-26 season.",
    category: "LEAGUE",
    date: "March 5, 2025",
    readTime: "3 min read",
    image: newsLeague,
    body: [
      "Jerusalem Hockey Club has officially confirmed its participation in the European Interleague Hockey League (EIHL) for the 2025-26 season, marking a landmark moment for Israeli professional hockey.",
      "The EIHL features clubs from across Central and Eastern Europe, including teams from Romania, Hungary, and Serbia. Jerusalem HC will be the first Israeli club to compete in the league, opening new doors for the sport in the region.",
      "\"Joining the EIHL gives our players the chance to compete against quality European opposition on a regular basis,\" said the club's management. \"This is exactly the kind of platform Israeli hockey needs to grow.\"",
      "The league schedule is expected to feature home and away matchups, with Jerusalem HC hosting games at both the Canada Centre in Metula and the Blue Ice Arena in Ashdod.",
      "Travel logistics and game scheduling are currently being finalized with league officials. The full 2025-26 season schedule is expected to be released by June 2025.",
      "This partnership represents a significant step in Jerusalem HC's mission to elevate Israeli hockey to a professional, internationally competitive level."
    ],
    featured: false,
  },
  {
    id: 4,
    slug: "jersey-reveal-navy-gold",
    title: "Jersey Reveal: Navy & Gold Home and Away Kits Unveiled",
    excerpt: "The official Jerusalem HC jerseys feature the Lion of Jerusalem crest and a design inspired by the city's ancient stone walls.",
    category: "MERCH",
    date: "March 2, 2025",
    readTime: "3 min read",
    image: newsJerseys,
    body: [
      "Jerusalem HC has unveiled its official home and away jerseys for the inaugural 2025-26 season, and the response from the hockey community has been overwhelmingly positive.",
      "The home jersey features a deep navy base with gold accents, prominently displaying the Lion of Jerusalem crest at the center. Subtle design elements inspired by the ancient stone walls of Jerusalem's Old City are woven into the shoulder and hem patterns.",
      "The away jersey inverts the color scheme with a clean white base, navy accents, and the same gold detailing that has become the club's signature aesthetic.",
      "\"Our jerseys tell a story,\" said the design team. \"Every element — from the lion crest to the stone wall pattern — connects the player wearing it to the 3,000-year history of Jerusalem. This isn't just sportswear. It's identity.\"",
      "Both jerseys are constructed with performance-grade materials suitable for professional play, and replica versions will be available for fans through the club's official merchandise store.",
      "Pre-orders for replica jerseys are expected to open in the coming weeks, with founding members receiving priority access and exclusive pricing."
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "canada-centre-rink-upgrades",
    title: "Canada Centre Rink Upgrades Underway for Pro Hockey Standards",
    excerpt: "Renovations to Israel's primary ice rink in Metula are set to bring the facility up to European professional hockey standards.",
    category: "FACILITY",
    date: "February 26, 2025",
    readTime: "3 min read",
    image: newsArena,
    body: [
      "Significant renovations are underway at the Canada Centre in Metula, Israel's premier ice sports facility, to prepare it for professional-level hockey competition.",
      "The upgrades include improvements to the ice surface quality, enhanced lighting systems, updated player facilities including locker rooms and training areas, and expanded seating capacity to better accommodate game-day crowds.",
      "\"The Canada Centre has been the home of Israeli ice sports for decades,\" said facility management. \"These upgrades ensure it can serve as a proper home venue for professional hockey at the European level.\"",
      "The renovation project is being coordinated with Jerusalem HC's timeline, with all major work expected to be completed before the club's August 2025 pre-season training camp.",
      "Additional improvements to fan amenities, including concession areas and merchandise retail space, are also part of the renovation plan.",
      "The Canada Centre will serve as one of two home venues for Jerusalem HC, alongside the Blue Ice Arena in Ashdod, giving the club geographic reach across Israel."
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "youth-development-partnership",
    title: "Youth Development Partnership Announced with Israeli Ice Hockey Federation",
    excerpt: "Jerusalem HC and the IIHF Israel branch will collaborate on youth camps, scouting, and player development pipelines.",
    category: "DEVELOPMENT",
    date: "February 20, 2025",
    readTime: "4 min read",
    image: newsYouth,
    body: [
      "Jerusalem HC has announced a formal partnership with the Israeli Ice Hockey Federation to establish a comprehensive youth development program aimed at growing the next generation of Israeli hockey talent.",
      "The partnership will encompass youth training camps, scouting programs across Israel, and the creation of a structured player development pipeline from grassroots to professional level.",
      "\"Developing local talent is at the core of our mission,\" said Jerusalem HC's management. \"We don't just want to field a competitive team — we want to build a sustainable hockey culture in Israel that produces players for decades to come.\"",
      "Initial programs will include summer hockey camps for youth aged 8-16, coaching clinics for local instructors, and a formalized scouting network to identify and nurture promising young players.",
      "The Federation expressed enthusiasm about the collaboration: \"Having a professional club invested in youth development changes everything. It gives young Israeli players a tangible goal — a professional team they can aspire to play for.\"",
      "Long-term plans include the establishment of a Jerusalem HC junior team that would compete in regional youth leagues, providing a clear pathway from development programs to the professional roster."
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
        {/* Full-width hero image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          
          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left z-10"
          />
        </div>

        {/* Content overlapping the image */}
        <div className="container relative z-10 -mt-32 md:-mt-40 pb-12">
          {/* Breadcrumb */}
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

          {/* Back link */}
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

          {/* Category & Meta */}
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

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-4xl"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
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
            {/* Decorative drop cap line */}
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

            {/* End mark */}
            <div className="flex items-center gap-3 mt-12 pt-8 border-t border-border/50">
              <div className="w-3 h-3 bg-primary rotate-45" />
              <span className="text-xs text-muted-foreground tracking-widest font-heading">JERUSALEM HC</span>
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
                    <p className="text-xs text-muted-foreground/60">{a.date}</p>
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
