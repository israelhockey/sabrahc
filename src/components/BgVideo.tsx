import { useEffect, useRef } from "react";

const prefersStill = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

type Props = {
  /** File name without extension, in /public/media (we ship .webm, .mp4 and a .jpg still). */
  name: string;
  className?: string;
  loop?: boolean;
};

/**
 * A silent background clip that only plays while it's on screen.
 * Visitors who ask their device for reduced motion get the still image instead.
 */
const BgVideo = ({ name, className = "", loop = true }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const still = prefersStill();

  useEffect(() => {
    const v = ref.current;
    if (!v || still || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  if (still) return <img src={`/media/${name}.jpg`} alt="" aria-hidden="true" className={className} />;
  return (
    <video ref={ref} aria-hidden="true" className={className} poster={`/media/${name}.jpg`} muted playsInline loop={loop} preload="metadata">
      <source src={`/media/${name}.webm`} type="video/webm" />
      <source src={`/media/${name}.mp4`} type="video/mp4" />
    </video>
  );
};

export default BgVideo;
