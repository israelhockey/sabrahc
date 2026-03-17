import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Film } from "lucide-react";
import heroArenaImg from "@/assets/hero-arena.jpg";

const Media = () => (
  <>
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroArenaImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Media</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-heading text-xs tracking-[0.3em] text-primary mb-3">SABRA HC</p>
          <h1 className="font-display text-6xl md:text-8xl text-foreground leading-[0.9] mb-4">
            MEDIA<br />
            <span className="text-gold-gradient">CENTER</span>
          </h1>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    <section className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center py-16"
        >
          <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center mb-8">
            <Film className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">COMING SOON</h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Highlights, live broadcasts, photo galleries, and press materials — your all-access pass to Sabra Hockey Club.
          </p>
          <span className="inline-block mt-8 px-5 py-2 text-xs font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
            STAY TUNED
          </span>
        </motion.div>
      </div>
    </section>
  </>
);

export default Media;
