import { motion } from "framer-motion";
import { Zap, Globe, Users, Radio } from "lucide-react";

const features = [
  { icon: Zap, title: "Professional Production", desc: "Full game-day production with arena lighting, music, and entertainment — a complete professional sports experience." },
  { icon: Globe, title: "International Opponents", desc: "Compete against top-tier European teams from Romania, Hungary, Serbia, and beyond." },
  { icon: Users, title: "Community First", desc: "Building a passionate fan base and creating a home for hockey culture in Israel." },
  { icon: Radio, title: "Global Broadcasts", desc: "Every game streamed live for founding members worldwide with professional commentary and replays." },
];

const GameExperienceSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsla(130,50%,40%,0.06)_0%,transparent_50%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">THE EXPERIENCE</p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          Elite Hockey in <span className="text-gold-gradient">Israel</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          More than just a game — it's a world-class sports experience that will put Israeli hockey on the map.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card-hover rounded-xl p-8 md:p-10 group"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default GameExperienceSection;
