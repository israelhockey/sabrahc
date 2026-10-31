/**
 * Start a silent background video, the way phones need it.
 *
 * iPhones only autoplay a video that is really muted (React doesn't write the
 * `muted` attribute, so we set it by hand), and Low Power Mode or data saver can
 * still refuse. When play() is refused we try again on the visitor's first touch,
 * scroll or return to the tab, so the film starts as soon as the phone allows it.
 */
export function playSilently(v: HTMLVideoElement): () => void {
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");

  const events = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
  const retry = () => {
    v.play().then(cleanup, () => {});
  };
  const onVisible = () => document.visibilityState === "visible" && retry();
  function cleanup() {
    events.forEach((e) => window.removeEventListener(e, retry));
    document.removeEventListener("visibilitychange", onVisible);
  }

  v.play().catch(() => {
    events.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    document.addEventListener("visibilitychange", onVisible);
  });
  return cleanup;
}
