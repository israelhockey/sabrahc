import { motion } from "framer-motion";

const GameExperienceSection = () => (
  <section className="py-24 md:py-32 bg-ice-texture relative overflow-hidden">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">GAME EXPERIENCE</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          Elite Hockey in Jerusalem
        </h2>
      </motion.div>

      {/* Image placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {["Arena Atmosphere", "International Opponents", "Fans & Community"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-video rounded-lg border border-border bg-card/40 flex items-center justify-center"
          >
            <span className="text-sm text-muted-foreground font-heading">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
      >
        Jerusalem HC games will feature professional game production, international opponents, and a high-energy arena experience bringing elite hockey to Israel.
      </motion.p>
    </div>
  </section>
);

export default GameExperienceSection;
