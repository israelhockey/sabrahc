import { motion } from "framer-motion";
import { Plane, Shield, Swords, Globe2 } from "lucide-react";

const blocks = [
  { icon: Globe2, count: "20+", label: "International Games", desc: "vs European professional teams", color: "text-primary" },
  { icon: Shield, count: "10+", label: "INHL League Games", desc: "Israel's top domestic league", color: "text-foreground" },
  { icon: Swords, count: "5+", label: "Local Rivalry Games", desc: "Additional domestic fixtures", color: "text-foreground" },
  { icon: Plane, count: "5+", label: "International Road Trips", desc: "Away games across Europe", color: "text-primary" },
];

const SeasonPlanSection = () => (
  <section id="season" className="py-24 md:py-32 bg-ice-texture">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">2026 SEASON</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          Season Plan
        </h2>
        <p className="text-5xl md:text-7xl font-heading font-bold text-gold-gradient mb-2">40+</p>
        <p className="text-muted-foreground text-lg">Games Per Season</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {blocks.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-lg border border-border bg-card/50 text-center group hover:border-primary/40 transition-colors"
          >
            <b.icon className={`w-8 h-8 mx-auto mb-3 ${b.color} group-hover:scale-110 transition-transform`} />
            <p className={`text-3xl font-heading font-bold ${b.color} mb-1`}>{b.count}</p>
            <p className="font-heading text-sm font-semibold text-foreground mb-1">{b.label}</p>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        Jerusalem HC will begin as an independent professional team with the goal of joining a European league in the future, competing full-time against the best clubs on the continent.
      </motion.p>
    </div>
  </section>
);

export default SeasonPlanSection;
