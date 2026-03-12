import { motion } from "framer-motion";

const colors = [
  { name: "Navy Blue", hex: "#0B1F3B", tw: "bg-navy" },
  { name: "Gold", hex: "#C8A44D", tw: "bg-primary" },
  { name: "White", hex: "#FFFFFF", tw: "bg-foreground" },
];

const TeamIdentitySection = () => (
  <section id="identity" className="py-24 md:py-32 bg-navy-dark relative overflow-hidden">
    {/* Subtle glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,hsla(40,49%,54%,0.06)_0%,transparent_70%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">TEAM IDENTITY</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          The Lion of Jerusalem
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Jerseys / Logo placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex gap-6 justify-center"
        >
          {/* Home Jersey */}
          <div className="w-40 h-56 md:w-52 md:h-72 rounded-lg gold-border-glow bg-navy flex flex-col items-center justify-center">
            <span className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">JHC</span>
            <span className="text-xs text-muted-foreground tracking-wider">HOME</span>
          </div>
          {/* Away Jersey */}
          <div className="w-40 h-56 md:w-52 md:h-72 rounded-lg border border-border bg-secondary flex flex-col items-center justify-center">
            <span className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">JHC</span>
            <span className="text-xs text-muted-foreground tracking-wider">AWAY</span>
          </div>
        </motion.div>

        {/* Text + palette */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            The club identity is built around the Lion of Jerusalem, representing strength, resilience, and pride.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
            The crest integrates Jerusalem's historic stone walls with a modern professional hockey identity.
          </p>

          {/* Color palette */}
          <div className="flex gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-lg ${c.tw} border border-border`} />
                <span className="text-xs text-muted-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground/60 font-mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TeamIdentitySection;
