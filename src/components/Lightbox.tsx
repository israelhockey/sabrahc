import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PHOTO_CATS, src, type Photo } from "@/data/gallery";

/** Full-screen photo viewer: arrows or swipe-free buttons to move, Escape to close. */
const Lightbox = ({ list, index, onClose, onMove }: { list: Photo[]; index: number; onClose: () => void; onMove: (i: number) => void }) => {
  const p = list[index];
  const go = (d: number) => onMove((index + d + list.length) % list.length);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  });

  if (!p) return null;
  const cat = PHOTO_CATS.find((c) => c.key === p.cat);
  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[80] flex flex-col bg-black/95" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 text-sm text-[#D9E3DC]" onClick={(e) => e.stopPropagation()}>
        <span>
          <span className="font-bold text-sand">{cat?.label}</span> · Israel Selects · {index + 1} / {list.length}
        </span>
        <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-11 w-11 items-center justify-center hover:text-sand">
          <X className="h-7 w-7" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16">
        <img src={src(p.id)} alt={`${cat?.label ?? "Photo"} from an Israel Selects game`} className="max-h-full max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
        <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))} className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-night/80 text-ice-white hover:bg-sand hover:text-night">
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))} className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-night/80 text-ice-white hover:bg-sand hover:text-night">
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
