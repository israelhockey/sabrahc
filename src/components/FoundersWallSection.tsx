import { motion } from "framer-motion";
import { FOUNDING_MEMBERS, CAMPAIGN } from "@/lib/campaign";
import AnimatedCounter from "./AnimatedCounter";

const FoundersWallSection = () => (
  <section id="founders" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsla(40,49%,54%,0.04)_0%,transparent_60%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">FOUNDERS WALL</p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          The People Making <span className="text-gold-gradient">History</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
          <AnimatedCounter target={CAMPAIGN.currentMembers} className="text-primary font-bold" /> of{" "}
          <span className="text-foreground font-semibold">{CAMPAIGN.goalMembers}</span> founding members joined.
          Your name will appear here when you join.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
        {FOUNDING_MEMBERS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            whileHover={{ scale: 1.05, borderColor: "hsla(40,49%,54%,0.5)" }}
            className="glass-card rounded-lg p-4 text-center cursor-default"
          >
            <p className="text-xs font-heading font-semibold text-primary">#{String(m.id).padStart(3, "0")}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">{m.name}</p>
          </motion.div>
        ))}

        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`empty-${i}`}
            whileHover={{ scale: 1.05, borderColor: "hsla(40,49%,54%,0.3)" }}
            className="p-4 rounded-lg border border-dashed border-border/50 text-center opacity-50 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <p className="text-xs font-heading text-primary/60">Your Name?</p>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default FoundersWallSection;
