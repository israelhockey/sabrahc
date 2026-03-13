import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Newspaper, ChevronRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Jerusalem HC Signs Forward Alon Eizenman as First Roster Addition",
    excerpt: "The 24-year-old Israeli forward becomes the first officially signed player for the inaugural Jerusalem HC roster, bringing national team experience and a scoring touch.",
    category: "ROSTER",
    date: "March 10, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "Pre-Season Training Camp Dates Announced for August 2025",
    excerpt: "The club has announced a three-week training camp at the Canada Centre in Metula, beginning August 15th.",
    category: "TEAM NEWS",
    date: "March 8, 2025",
    featured: false,
  },
  {
    id: 3,
    title: "Partnership with European Interleague Hockey League Confirmed",
    excerpt: "Jerusalem HC will compete in the EIHL alongside teams from Romania, Hungary, and Serbia in its debut 2025-26 season.",
    category: "LEAGUE",
    date: "March 5, 2025",
    featured: false,
  },
  {
    id: 4,
    title: "Jersey Reveal: Navy & Gold Home and Away Kits Unveiled",
    excerpt: "The official Jerusalem HC jerseys feature the Lion of Jerusalem crest and a design inspired by the city's ancient stone walls.",
    category: "MERCH",
    date: "March 2, 2025",
    featured: false,
  },
  {
    id: 5,
    title: "Canada Centre Rink Upgrades Underway for Pro Hockey Standards",
    excerpt: "Renovations to Israel's primary ice rink in Metula are set to bring the facility up to European professional hockey standards.",
    category: "FACILITY",
    date: "February 26, 2025",
    featured: false,
  },
  {
    id: 6,
    title: "Youth Development Partnership Announced with Israeli Ice Hockey Federation",
    excerpt: "Jerusalem HC and the IIHF Israel branch will collaborate on youth camps, scouting, and player development pipelines.",
    category: "DEVELOPMENT",
    date: "February 20, 2025",
    featured: false,
  },
];

const News = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">News</span>
        </div>
        <div className="flex items-center gap-4">
          <Newspaper className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">NEWS</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    <section className="py-12 lg:py-20">
      <div className="container">
        {/* Featured article */}
        {articles.filter(a => a.featured).map((article) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-sm p-8 lg:p-12 mb-8 stripe-accent"
          >
            <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-4">
              {article.category}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 leading-tight">{article.title}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">{article.excerpt}</p>
            <p className="text-xs text-muted-foreground/60">{article.date}</p>
          </motion.article>
        ))}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.filter(a => !a.featured).map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover rounded-sm p-6 cursor-pointer"
            >
              <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-4">
                {article.category}
              </span>
              <h3 className="font-heading text-base tracking-wider text-foreground mb-3 leading-snug">{article.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
              <p className="text-xs text-muted-foreground/60">{article.date}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default News;
