import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { sortedArticles, formatDate, type Article } from "@/data/news";

const cats = ["All", "Club", "Team", "Signings", "Games", "Partners"] as const;

/** Rough reading time from the article blocks. */
const minutes = (a: Article) => {
  const words = JSON.stringify(a.body).split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

const Meta = ({ a }: { a: Article }) => (
  <p className="label flex flex-wrap items-center gap-x-2 text-[11px] text-muted-text">
    <span className="rounded bg-sand px-2 py-0.5 font-black text-night">{a.category}</span>
    <span>{formatDate(a.date)}</span>
    <span aria-hidden="true">·</span>
    <span>{minutes(a)} min read</span>
  </p>
);

const Img = ({ a, className = "" }: { a: Article; className?: string }) => (
  <div className={`overflow-hidden bg-night-deep ${className}`}>
    <img src={a.image} alt="" loading="lazy" className={`h-full w-full ${a.imageFit === "contain" ? "object-contain p-8" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`} />
  </div>
);

const News = () => {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const used = new Set(sortedArticles.map((a) => a.category));
  const [lead, ...others] = sortedArticles;
  const side = others.slice(0, 2);
  const list = (cat === "All" ? sortedArticles : sortedArticles.filter((a) => a.category === cat));

  return (
    <>
      <PageHero compact he="חדשות" eyebrow="Sabra HC" title="News" intro="Signings, games, partners and the story of the club, from the tour and from home." />

      {lead && (
        <section className="bg-night pt-12" aria-labelledby="top-title">
          <div className="container-site grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <h2 id="top-title" className="sr-only">
              Top stories
            </h2>
            <Link to={`/news/${lead.slug}`} className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded border border-line">
              <Img a={lead} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/70 to-transparent" />
              <div className="relative p-6 sm:p-8">
                <Meta a={lead} />
                <p className="mt-3 max-w-2xl font-display text-3xl font-black uppercase leading-[1] group-hover:text-sand sm:text-4xl">{lead.title}</p>
                <p className="mt-3 max-w-2xl text-[#D9E3DC]">{lead.excerpt}</p>
              </div>
            </Link>
            <div className="grid gap-4">
              {side.map((a) => (
                <Link key={a.slug} to={`/news/${a.slug}`} className="group grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] overflow-hidden rounded border border-line bg-night-2 hover:border-sand">
                  <Img a={a} className="h-full min-h-[160px]" />
                  <div className="flex flex-col p-4">
                    <Meta a={a} />
                    <p className="mt-2 font-display text-lg font-black uppercase leading-tight group-hover:text-sand">{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-night py-14" aria-labelledby="all-title">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <h2 id="all-title" className="font-display text-3xl font-black uppercase">
              All stories
            </h2>
            <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter news">
              {cats
                .filter((c) => c === "All" || used.has(c as Article["category"]))
                .map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={cat === c}
                    onClick={() => setCat(c)}
                    className={`rounded px-3 py-1.5 text-sm font-bold ${cat === c ? "bg-sand text-night" : "text-ice-white hover:text-sand"}`}
                  >
                    {c}
                  </button>
                ))}
            </div>
          </div>
          <ol className="divide-y divide-line">
            {list.map((a) => (
              <li key={a.slug}>
                <Link to={`/news/${a.slug}`} className="group grid items-center gap-5 py-5 sm:grid-cols-[220px_minmax(0,1fr)]">
                  <Img a={a} className="aspect-[16/9] rounded" />
                  <div>
                    <Meta a={a} />
                    <p className="mt-2 font-display text-2xl font-black uppercase leading-tight group-hover:text-sand">{a.title}</p>
                    <p className="mt-1 max-w-3xl text-[#D9E3DC]">{a.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default News;
