import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Link2, Check } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import { articles, sortedArticles, formatDate, readingMinutes, type Block } from "@/data/news";
import NotFound from "./NotFound";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------- reading progress ---------- */

const ReadingProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = document.getElementById("story");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="sticky top-[68px] z-40 h-1 bg-[#E3EAF0] lg:top-[76px]" aria-hidden="true">
      <div className="h-full bg-sand transition-[width] duration-150" style={{ width: `${p * 100}%` }} />
    </div>
  );
};

/* ---------- share ---------- */

const Share = ({ url, title, compact }: { url: string; title: string; compact?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const btn = "label inline-flex min-h-[40px] items-center gap-2 border border-[#C5D0DB] bg-white px-3.5 text-xs text-night transition-colors hover:border-night hover:bg-night hover:text-ice-white";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "" : "justify-center"}`}>
      <a className={btn} href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <a className={btn} href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer">
        X
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        Facebook
      </a>
      <button
        type="button"
        className={btn}
        onClick={() => {
          navigator.clipboard?.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
};

/* ---------- story blocks ---------- */

const Facts = ({ title = "At a glance", items }: { title?: string; items: [string, string][] }) => (
  <aside className="my-10 border-t-4 border-sand bg-[#F3F7FA]">
    <p className="label px-5 pt-4 text-xs text-sand-dark">{title}</p>
    <dl className="grid gap-px p-5 pt-3 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="border-b border-[#E3EAF0] py-2.5">
          <dt className="label text-[11px] text-[#5B6B85]">{k}</dt>
          <dd className="font-display text-2xl font-black uppercase leading-tight text-night">{v}</dd>
        </div>
      ))}
    </dl>
  </aside>
);

const renderBlocks = (body: Block[]) => {
  let section = 0;
  let firstPara = true;
  return body.map((b, i) => {
    if (typeof b === "string") {
      if (firstPara) {
        firstPara = false;
        return (
          <p key={i} className="mb-8 text-[22px] font-medium leading-[1.6] text-night first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:bg-night first-letter:px-3 first-letter:font-display first-letter:text-[64px] first-letter:font-black first-letter:leading-[0.9] first-letter:text-sand sm:text-2xl">
            {b}
          </p>
        );
      }
      return (
        <p key={i} className="mb-6">
          {b}
        </p>
      );
    }
    switch (b.type) {
      case "heading": {
        section += 1;
        return (
          <h2 key={i} id={slugify(b.text)} className="mb-5 mt-14 flex scroll-mt-32 items-baseline gap-4 font-display text-4xl font-black uppercase leading-[0.95] text-night sm:text-5xl">
            <span className="tabular font-cond text-lg font-extrabold tracking-[0.1em] text-sand-dark">{String(section).padStart(2, "0")}</span>
            {b.text}
          </h2>
        );
      }
      case "pullquote":
        return (
          <figure key={i} className="relative my-14 bg-night px-7 pb-8 pt-12 text-ice-white sm:-mx-10 sm:px-12">
            <span aria-hidden="true" className="absolute -top-7 left-6 font-display text-[120px] font-black leading-none text-sand sm:left-10">
              “
            </span>
            <blockquote className="font-display text-3xl font-black uppercase leading-[1.05] sm:text-4xl">{b.text}</blockquote>
            {b.by && <figcaption className="label mt-4 text-sm text-sand">{b.by}</figcaption>}
          </figure>
        );
      case "image":
        return (
          <figure key={i} className="my-10 sm:-mx-10">
            <div className="relative">
              <img src={b.src} alt={b.alt} loading="lazy" className="max-h-[620px] w-full bg-night object-cover object-[50%_20%]" />
              <span aria-hidden="true" className="absolute left-3 top-3 h-6 w-6 border-l-[3px] border-t-[3px] border-white" />
              <span aria-hidden="true" className="absolute bottom-3 right-3 h-6 w-6 border-b-[3px] border-r-[3px] border-white" />
            </div>
            {b.caption && (
              <figcaption className="mt-3 flex gap-3 text-[15px] text-[#5B6B85] sm:px-10">
                <span className="mt-2.5 h-[3px] w-6 flex-none bg-sand" aria-hidden="true" />
                {b.caption}
              </figcaption>
            )}
          </figure>
        );
      case "facts":
        return <Facts key={i} title={b.title} items={b.items} />;
      case "stats":
        return (
          <dl key={i} className="my-10 grid grid-cols-3 border-y-4 border-night">
            {b.items.map(([n, l], k) => (
              <div key={l} className={`py-5 text-center ${k ? "border-l border-[#E3EAF0]" : ""}`}>
                <dd className="tabular font-display text-5xl font-black leading-none text-night sm:text-6xl">{n}</dd>
                <dt className="label mt-1.5 text-xs text-sand-dark">{l}</dt>
              </div>
            ))}
          </dl>
        );
      case "timeline":
        return (
          <ol key={i} className="relative my-10 ml-2 border-l-4 border-[#E3EAF0]">
            {b.items.map(([when, what], k) => (
              <li key={when} className="relative pb-7 pl-8 last:pb-0">
                <span aria-hidden="true" className={`absolute -left-[14px] top-1 h-6 w-6 rounded-full border-4 border-white ${k === 0 ? "bg-sand" : "bg-night"}`} />
                <p className="label text-xs text-sand-dark">{when}</p>
                <p className="font-display text-2xl font-black uppercase leading-tight text-night">{what}</p>
              </li>
            ))}
          </ol>
        );
      case "callout":
        return (
          <aside key={i} className="my-12 grid items-center gap-5 bg-sand p-7 text-night sm:-mx-10 sm:grid-cols-[1fr_auto] sm:p-10">
            <div>
              <p className="font-display text-4xl font-black uppercase leading-[0.95]">{b.title}</p>
              <p className="mt-2 text-lg font-medium">{b.text}</p>
            </div>
            {b.cta && b.to && (
              <Link to={b.to} className="btn-dark">
                {b.cta} <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </aside>
        );
    }
  });
};

/* ---------- page ---------- */

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
  const idx = sortedArticles.findIndex((a) => a.slug === article.slug);
  const more = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const headings = article.body.filter((b): b is { type: "heading"; text: string } => typeof b !== "string" && b.type === "heading");
  const mins = readingMinutes(article);
  const next = sortedArticles[idx + 1] ?? sortedArticles[0];

  return (
    <div className="bg-white text-[#2B3A55]">
      <ReadingProgress />
      <article>
        {/* header */}
        <header className="ice-bg relative overflow-hidden border-b border-[#E3EAF0]">
          <div className="container-site max-w-5xl pb-10 pt-10 lg:pb-14 lg:pt-14">
            <Link to="/news" className="label inline-flex items-center gap-2 text-sm text-night hover:text-sand-dark">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="tag-sand">{article.category}</span>
              <span className="label text-xs text-[#5B6B85]">{formatDate(article.date)}</span>
              <span className="label inline-flex items-center gap-1.5 text-xs text-[#5B6B85]">
                <Clock className="h-3.5 w-3.5" /> {mins} min read
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.9] text-night text-balance sm:text-7xl lg:text-[88px]">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#3B4A63] sm:text-2xl">{article.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#D5DEE6] pt-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-night">
                  <img src={crest} alt="" className="h-9 w-9 object-contain" />
                </span>
                <div>
                  <p className="font-display text-lg font-black uppercase leading-none text-night">Sabra HC</p>
                  <p className="label text-[11px] text-[#5B6B85]">Club newsroom</p>
                </div>
              </div>
              <Share url={url} title={article.title} compact />
            </div>
          </div>
        </header>

        {/* lead image */}
        <div className="bg-night">
          <div className="container-site max-w-6xl py-0">
            <div className="relative">
              <img
                src={article.image}
                alt=""
                className={`aspect-[16/8] w-full ${article.imageFit === "contain" ? "object-contain p-10" : "object-cover"}`}
              />
              <span aria-hidden="true" className="absolute left-4 top-4 h-7 w-7 border-l-[3px] border-t-[3px] border-white" />
              <span aria-hidden="true" className="absolute bottom-4 right-4 h-7 w-7 border-b-[3px] border-r-[3px] border-white" />
            </div>
          </div>
        </div>

        {/* body */}
        <div id="story" className="container-site grid max-w-6xl gap-12 py-14 lg:grid-cols-[1fr_300px] lg:py-20">
          <div className="mx-auto w-full max-w-[680px] text-[19px] leading-[1.75]">{renderBlocks(article.body)}</div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              {headings.length > 1 && (
                <nav aria-label="In this story" className="border-t-4 border-night bg-[#F3F7FA] p-5">
                  <p className="label text-xs text-[#5B6B85]">In this story</p>
                  <ol className="mt-3 space-y-2.5">
                    {headings.map((h, k) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`} className="flex gap-3 font-display text-lg font-black uppercase leading-tight text-night hover:text-sand-dark">
                          <span className="tabular font-cond text-sm text-sand-dark">{String(k + 1).padStart(2, "0")}</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="bg-night p-5 text-ice-white">
                <p className="font-display text-2xl font-black uppercase leading-none">Never miss a first</p>
                <p className="mt-2 text-sm text-[#C9D6E6]">Game 001, signings and the uniform reveal, straight to your inbox.</p>
                <a href="#newsletter-title" className="btn-primary mt-4 w-full text-base">
                  Sign up
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* end of story */}
        <div className="border-t border-[#E3EAF0] bg-[#F3F7FA] py-10">
          <div className="container-site max-w-3xl text-center">
            <img src={crest} alt="" className="mx-auto h-14 w-14 object-contain" />
            <p className="label mt-3 text-sm text-night">Enjoyed this? Share it with the Pride</p>
            <div className="mt-4">
              <Share url={url} title={article.title} />
            </div>
          </div>
        </div>
      </article>

      {/* next story */}
      {next && next.slug !== article.slug && (
        <Link to={`/news/${next.slug}`} className="group relative block overflow-hidden bg-night">
          <img src={next.image} alt="" className={`absolute inset-0 h-full w-full opacity-35 transition-transform duration-700 group-hover:scale-105 ${next.imageFit === "contain" ? "object-contain" : "object-cover"}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-transparent" />
          <div className="container-site relative py-16 lg:py-20">
            <p className="label text-sm text-sand">Up next</p>
            <p className="mt-2 max-w-3xl font-display text-4xl font-black uppercase leading-[0.92] text-ice-white group-hover:text-sand sm:text-6xl">{next.title}</p>
            <p className="label mt-4 inline-flex items-center gap-2 text-sm text-ice">
              Read the story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </div>
        </Link>
      )}

      {more.length > 1 && (
        <section className="bg-white py-16" aria-labelledby="more-news">
          <div className="container-site">
            <div className="mb-6 flex items-end justify-between">
              <h2 id="more-news" className="font-display text-5xl font-black uppercase text-night">
                More news
              </h2>
              <Link to="/news" className="label border-b-[3px] border-sand pb-1 text-sm text-night">
                All news
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((a) => (
                <Link key={a.slug} to={`/news/${a.slug}`} className="group block border border-[#E3EAF0] bg-white transition-shadow hover:shadow-[0_20px_40px_-25px_rgba(6,13,26,0.5)]">
                  <div className="aspect-[16/9] overflow-hidden bg-night">
                    <img src={a.image} alt="" className={`h-full w-full ${a.imageFit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 group-hover:scale-105`} />
                  </div>
                  <div className="p-5">
                    <p className="label text-xs text-sand-dark">
                      {a.category} · {formatDate(a.date)}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-black uppercase leading-tight text-night group-hover:text-sand-dark">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsArticle;
