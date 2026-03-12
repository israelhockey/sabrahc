import { motion } from "framer-motion";
import { Plane, Hotel, Ticket, Users, Star } from "lucide-react";

const perks = [
  { icon: Plane, text: "Round-trip flights for two" },
  { icon: Hotel, text: "Hotel accommodation in Jerusalem" },
  { icon: Ticket, text: "VIP access to 3 home games" },
  { icon: Users, text: "Meet players and coaching staff" },
  { icon: Star, text: "Behind-the-scenes team experience" },
];

const VIPGiveawaySection = () => (
  <section id="giveaway" className="py-24 md:py-32 bg-ice-texture">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">EXCLUSIVE GIVEAWAY</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          VIP Trip to Israel for Two
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
          All founding members are automatically entered into the draw for an all-expenses-paid VIP trip to Jerusalem.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl mx-auto rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm p-8 md:p-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {perks.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-foreground">{p.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default VIPGiveawaySection;
