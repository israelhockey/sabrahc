import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

const FinalCTASection = () => {
  const handleShare = async () => {
    const data = {
      title: "Jerusalem HC — Israel's First Professional Hockey Club",
      text: "Help launch Israel's first professional hockey club. Become a founding member!",
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section className="py-24 md:py-32 bg-arena-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsla(40,49%,54%,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="container px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Join The Founding Members of{" "}
            <span className="text-gold-gradient">Jerusalem HC</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
            Help launch Israel's first professional hockey club and be part of history.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#membership"
              className="px-8 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              Become a Founding Member
            </a>
            <button
              onClick={handleShare}
              className="px-8 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share the Campaign
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
