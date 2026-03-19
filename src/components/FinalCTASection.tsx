import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import IceParticles from "./IceParticles";
import logoImg from "@/assets/sabra-logo.png";

const FinalCTASection = () => {
  const handleShare = async () => {
    const data = {
       title: "Sabra HC — The Flagship Hockey Club in Israel",
       text: "Help launch the flagship hockey club in Israel. Become a founding member!",
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
    <section className="py-28 md:py-40 bg-arena-glow relative overflow-hidden">
      <IceParticles count={25} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsla(45,90%,50%,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="container px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={logoImg}
            alt="Sabra HC"
            className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto mb-8 opacity-40"
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
          />

          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            Born in the Desert
            <br />
            <span className="text-gold-gradient">Built for the Ice</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
            Be part of history. Join the movement to bring professional hockey to Israel — and create a pathway for Jewish athletes to play at the highest level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#membership"
              className="px-10 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              Become a Founding Member
            </a>
            <button
              onClick={handleShare}
              className="px-10 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded-full border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share The Mission
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
