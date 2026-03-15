import { motion } from "framer-motion";
import { Plane, Hotel, Ticket, Users, Star, Gift } from "lucide-react";

const perks = [
  { icon: Plane, text: "Round-trip flights for two" },
  { icon: Hotel, text: "Hotel accommodation in Israel" },
  { icon: Ticket, text: "VIP access to 3 home games" },
  { icon: Users, text: "Meet players and coaching staff" },
  { icon: Star, text: "Behind-the-scenes team experience" },
];

const VIPGiveawaySection = () => (
  <section id="giveaway" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsla(40,49%,54%,0.05)_0%,transparent_50%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-primary" />
          </div>
          <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">EXCLUSIVE GIVEAWAY</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
            VIP Trip to <span className="text-gold-gradient">Jerusalem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            All founding members are automatically entered for an all-expenses-paid VIP trip to Jerusalem for two.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default VIPGiveawaySection;
