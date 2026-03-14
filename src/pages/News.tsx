import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Newspaper, ChevronRight } from "lucide-react";
import { articles } from "./NewsArticle";

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
          <Link key={article.id} to={`/news/${article.slug}`} className="block">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-sm overflow-hidden mb-8 group cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="md:flex">
                <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:hidden" />
                </div>
                <div className="p-8 lg:p-12 md:w-3/5">
                  <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-4">
                    {article.category}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">{article.title}</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground/60">{article.date}</p>
                    <span className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Read article <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        ))}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.filter(a => !a.featured).map((article, i) => (
            <Link key={article.id} to={`/news/${article.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover rounded-sm overflow-hidden cursor-pointer h-full group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base tracking-wider text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground/60">{article.date}</p>
                    <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default News;
