import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { sortedArticles, formatDate, type Article } from "@/data/news";

const cats = ["All", "Club", "Team", "Signings", "Games", "Partners"] as const;

const News = () => {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = sortedArticles.filter((a) => cat === "All" || a.category === cat);
  const used = new Set(sortedArticles.map((a) => a.category));

  return (
    <>
      <PageHero eyebrow="Sabra HC" title="News" intro="Signings, games, partners and everything happening at the club." />
      <section className="bg-night py-16">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter news">
            {cats.filter((c) => c === "All" || used.has(c as Article["category"])).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`min-h-[44px] rounded-md px-5 font-display text-lg font-bold uppercase ${
                  cat === c ? "bg-sand text-night" : "border border-line text-ice-white hover:border-sand"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <Link key={a.slug} to={`/news/${a.slug}`} className="card-lift group overflow-hidden rounded-lg border border-line bg-night-2">
                <div className="aspect-[16/9] overflow-hidden bg-night">
                  <img src={a.image} alt="" className={`h-full w-full ${a.imageFit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`} />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">
                    {a.category} · {formatDate(a.date)}
                  </p>
                  <h2 className="mt-2 text-3xl font-black leading-tight text-ice-white">{a.title}</h2>
                  <p className="mt-2 text-muted-text">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
