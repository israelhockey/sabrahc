import { motion } from "framer-motion";
import { useState } from "react";
import jerseysImg from "@/assets/sabra-jerseys.png";
import logoImg from "@/assets/sabra-logo.png";

const colors = [
  { name: "Navy Blue", hex: "#0B1F3B", tw: "bg-navy" },
  { name: "Gold", hex: "#EAB308", tw: "bg-primary" },
  { name: "Green", hex: "#3D9952", tw: "bg-accent" },
  { name: "White", hex: "#FFFFFF", tw: "bg-foreground" },
];

const TeamIdentitySection = () => {
  const [activeTab, setActiveTab] = useState<"jerseys" | "logo">("jerseys");

  return (
    <section id="identity" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,hsla(40,49%,54%,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,hsla(200,60%,50%,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">TEAM IDENTITY</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
            The <span className="text-gold-gradient">Sabra</span> Lion
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg">
            The club identity is built around the Sabra Lion — tough on the outside, sweet on the inside. Born in the desert, built for the ice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-3 mb-6 justify-center lg:justify-start">
              {(["jerseys", "logo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-heading text-sm tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {tab === "jerseys" ? "Jerseys" : "Crest"}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={activeTab === "jerseys" ? jerseysImg : logoImg}
                alt={activeTab === "jerseys" ? "Sabra HC jerseys" : "Sabra HC crest"}
                className="relative w-full max-w-lg mx-auto rounded-xl border border-border shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-xl p-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">The Crest</h3>
              <p className="text-muted-foreground leading-relaxed">
                The crest features a fierce Sabra lion with a cactus mane, representing the Israeli spirit — tough and resilient on the outside, warm and passionate on the inside. 
                Crossed hockey sticks and the Star of David complete a modern professional hockey identity rooted in Israeli culture.
              </p>
            </div>

            <div className="glass-card rounded-xl p-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Team Colors</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Navy Blue and Gold — representing the deep desert night sky and the golden sands of Israel.
              </p>
              <div className="flex gap-6">
                {colors.map((c) => (
                  <motion.div
                    key={c.name}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-2 cursor-default"
                  >
                    <div className={`w-16 h-16 rounded-xl ${c.tw} border border-border shadow-lg`} />
                    <span className="text-xs text-muted-foreground font-medium">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground/50 font-mono">{c.hex}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
};

export default TeamIdentitySection;
