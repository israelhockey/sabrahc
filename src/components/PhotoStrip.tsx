import { Link } from "react-router-dom";
import { thumb } from "@/data/gallery";

/** A row of real photos from the Selects years, linking to the full wall. */
const PhotoStrip = ({ ids, caption, className = "" }: { ids: string[]; caption: string; className?: string }) => (
  <figure className={className}>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {ids.map((id) => (
        <Link key={id} to="/gallery" className="group block overflow-hidden rounded bg-night-2" aria-label="Open the photo wall">
          <img src={thumb(id)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
      ))}
    </div>
    <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-text">
      <span>{caption}</span>
      <Link to="/gallery" className="font-bold text-sand hover:text-sand-soft">
        See all photos →
      </Link>
    </figcaption>
  </figure>
);

export default PhotoStrip;
