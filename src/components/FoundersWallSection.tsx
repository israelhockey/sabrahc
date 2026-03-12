import { motion } from "framer-motion";
import { FOUNDING_MEMBERS } from "@/lib/campaign";

const FoundersWallSection = () => (
  <section id="founders" className="py-24 md:py-32 bg-navy-dark relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsla(40,49%,54%,0.05)_0%,transparent_60%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">FOUNDERS WALL</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          Our Founding Members
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          These are the people making history. Your name will appear here when you join.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
        {FOUNDING_MEMBERS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="p-3 rounded-lg border border-border bg-card/30 text-center hover:border-primary/40 transition-colors"
          >
            <p className="text-xs font-heading font-semibold text-primary">#{String(m.id).padStart(3, "0")}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">{m.name}</p>
          </motion.div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`empty-${i}`} className="p-3 rounded-lg border border-dashed border-border/50 text-center opacity-40">
            <p className="text-xs font-heading text-muted-foreground">Your Name?</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FoundersWallSection;
