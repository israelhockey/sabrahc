import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lightbox from "@/components/Lightbox";
import { club } from "@/data/club";
import { PHOTO_CATS, photos, thumb, type Photo, type PhotoCat } from "@/data/gallery";

/** "All" view: take one photo from each category in turn, so the wall is a mix. */
const mixed: Photo[] = (() => {
  const groups = PHOTO_CATS.map((c) => photos.filter((p) => p.cat === c.key));
  const out: Photo[] = [];
  for (let i = 0; out.length < photos.length; i++) for (const g of groups) if (g[i]) out.push(g[i]);
  return out;
})();

/** The full photo wall: every photo from the Selects years, filterable, opens full screen. */
const Gallery = () => {
  const [params, setParams] = useSearchParams();
  const cat = (params.get("c") as PhotoCat | null) ?? null;
  const list = cat ? photos.filter((p) => p.cat === cat) : mixed;
  const [open, setOpen] = useState<number | null>(null);
  const count = (k: PhotoCat) => photos.filter((p) => p.cat === k).length;

  return (
    <>
      <PageHero
        compact
        he="מהיציע"
        eyebrow="The Tifo Wall"
        title="From the stands"
        intro="Three seasons of Israel Selects on tour: the games, the fans, the kids and the Shabbat tables. Sabra HC's photos join the wall as this season goes."
      />

      <section className="bg-night py-10 lg:py-14" aria-label="Photos">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter photos">
            <button
              role="tab"
              aria-selected={!cat}
              onClick={() => setParams({})}
              className={`rounded px-3.5 py-2 text-sm font-bold ${!cat ? "bg-sand text-night" : "bg-night-2 text-ice-white hover:text-sand"}`}
            >
              All <span className="tabular opacity-70">{photos.length}</span>
            </button>
            {PHOTO_CATS.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={cat === c.key}
                onClick={() => setParams({ c: c.key })}
                className={`rounded px-3.5 py-2 text-sm font-bold ${cat === c.key ? "bg-sand text-night" : "bg-night-2 text-ice-white hover:text-sand"}`}
              >
                {c.label} <span className="tabular opacity-70">{count(c.key)}</span>
              </button>
            ))}
          </div>

          <ul className="columns-2 gap-2 sm:columns-3 lg:columns-4 [&>li]:mb-2">
            {list.map((p, i) => (
              <li key={p.id} className="break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded bg-night-2" aria-label={`Open photo ${i + 1}`}>
                  <img
                    src={thumb(p.id)}
                    alt=""
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-4 rounded border-2 border-dashed border-sand/60 bg-night-deep p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl font-bold uppercase">Were you there?</p>
              <p className="mt-1 text-[#D9E3DC]">Send us your photos from a game and we'll add the best ones to the wall.</p>
            </div>
            <a href={`mailto:${club.email}?subject=${encodeURIComponent("Photo for the Tifo Wall")}`} className="btn-primary">
              Send your photo
            </a>
          </div>
        </div>
      </section>

      {open !== null && <Lightbox list={list} index={open} onClose={() => setOpen(null)} onMove={setOpen} />}
    </>
  );
};

export default Gallery;
