import { motion } from "framer-motion";
import { Globe2, Shield, Swords, Plane } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import actionImg from "@/assets/hockey-action.jpg";

const blocks = [
  { icon: Globe2, count: 20, suffix: "+", label: "International Games", desc: "vs European professional teams" },
  { icon: Shield, count: 10, suffix: "+", label: "INHL League Games", desc: "Israel's top domestic league" },
  { icon: Swords, count: 5, suffix: "+", label: "Local Rivalry Games", desc: "Additional domestic fixtures" },
  { icon: Plane, count: 5, suffix: "+", label: "International Road Trips", desc: "Away games across Europe" },
];

const SeasonPlanSection = () => (
  <section id="season" className="relative overflow-hidden">
    {/* Parallax image banner */}
    <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
      <img
        src={actionImg}
        alt="Hockey action"
        className="w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">2026 SEASON</p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            <AnimatedCounter target={40} suffix="+" className="text-gold-gradient" /> Games
          </h2>
          <p className="text-muted-foreground text-lg mt-2">Per Season</p>
        </motion.div>
      </div>
    </div>

    {/* Cards */}
    <div className="py-20 md:py-28">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {blocks.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover rounded-xl p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <b.icon className="w-7 h-7 text-primary" />
              </div>
              <AnimatedCounter
                target={b.count}
                suffix={b.suffix}
                className="text-3xl font-heading font-bold text-foreground block"
              />
              <p className="font-heading text-sm font-semibold text-foreground mt-2 mb-1">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
        >
          Jerusalem HC will begin as an independent professional team with the goal of joining a European league in the future, competing full-time against the best clubs on the continent.
        </motion.p>
      </div>
    </div>

    <div className="section-divider" />
  </section>
);

export default SeasonPlanSection;
