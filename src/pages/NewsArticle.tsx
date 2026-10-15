import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Link2 } from "lucide-react";
import { articles, sortedArticles, formatDate } from "@/data/news";
import NotFound from "./NotFound";

const NewsArticle = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) document.title = `${article.title} — Sabra HC`;
    return () => {
      document.title = "Sabra HC — Israel's Flagship Hockey Club";
    };
  }, [article]);

  if (!article) return <NotFound />;
  const url = `https://sabrahc.com/news/${article.slug}`;
  const more = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-night pb-10 pt-[150px] lg:pt-[180px]">
          <div className="container-site max-w-4xl">
            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-ice hover:text-sand">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <p className="eyebrow mt-6">
              {article.category} · {formatDate(article.date)}
            </p>
            <h1 className="mt-3 text-5xl font-black leading-[0.95] text-ice-white sm:text-6xl lg:text-7xl text-balance">{article.title}</h1>
            <p className="mt-5 text-xl text-muted-text">{article.excerpt}</p>
          </div>
        </header>
        <div className="bg-night">
          <div className="container-site max-w-5xl">
            <img
              src={article.image}
              alt=""
              className={`aspect-[16/9] w-full rounded-lg bg-night-2 ${article.imageFit === "contain" ? "object-contain p-10" : "object-cover"}`}
            />
          </div>
        </div>
        <div className="bg-night pb-16 pt-12">
          <div className="container-site max-w-[68ch] text-lg leading-relaxed text-[#C9D6E6]">
            {article.body.map((b, i) => {
              if (typeof b === "string") return <p key={i} className="mb-6">{b}</p>;
              if (b.type === "heading") return <h2 key={i} className="mb-4 mt-10 text-4xl font-black text-ice-white">{b.text}</h2>;
              if (b.type === "pullquote")
                return (
                  <blockquote key={i} className="my-10 border-l-4 border-sand pl-6 font-display text-3xl font-bold uppercase leading-tight text-ice-white">
                    “{b.text}”
                  </blockquote>
                );
              return (
                <figure key={i} className="my-8">
                  <img src={b.src} alt={b.alt} className="w-full rounded-lg" />
                  {b.caption && <figcaption className="mt-2 text-sm text-muted-text">{b.caption}</figcaption>}
                </figure>
              );
            })}
            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-muted-text">Share</span>
              <a className="btn-outline min-h-[40px] px-4 text-sm" href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + url)}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn-outline min-h-[40px] px-4 text-sm" href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer">
                X
              </a>
              <a className="btn-outline min-h-[40px] px-4 text-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <button type="button" className="btn-outline min-h-[40px] px-4 text-sm" onClick={() => navigator.clipboard?.writeText(url)}>
                <Link2 className="h-4 w-4" /> Copy link
              </button>
            </div>
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="border-t border-line bg-night-2 py-16">
          <div className="container-site">
            <h2 className="text-4xl font-black text-ice-white">More news</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {more.map((a) => (
                <Link key={a.slug} to={`/news/${a.slug}`} className="card-lift rounded-lg border border-line bg-night p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">{formatDate(a.date)}</p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-ice-white">{a.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NewsArticle;
