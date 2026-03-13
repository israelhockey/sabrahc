import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ChevronRight } from "lucide-react";

const positions = ["ALL", "FORWARDS", "DEFENSE", "GOALIES"] as const;

const players = [
  { id: 1, name: "Alon Eizenman", number: "19", position: "Forward", country: "🇮🇱", height: "5'11\"", weight: "185 lbs", shoots: "R" },
  { id: 2, name: "Daniel Goldberg", number: "7", position: "Defense", country: "🇮🇱", height: "6'1\"", weight: "195 lbs", shoots: "L" },
  { id: 3, name: "Yonatan Levy", number: "91", position: "Forward", country: "🇮🇱", height: "5'10\"", weight: "178 lbs", shoots: "L" },
  { id: 4, name: "Maxim Petrov", number: "44", position: "Defense", country: "🇷🇺", height: "6'3\"", weight: "210 lbs", shoots: "R" },
  { id: 5, name: "Noam Shapira", number: "30", position: "Goalie", country: "🇮🇱", height: "6'0\"", weight: "190 lbs", shoots: "L" },
  { id: 6, name: "Tomáš Novák", number: "12", position: "Forward", country: "🇨🇿", height: "5'11\"", weight: "182 lbs", shoots: "R" },
  { id: 7, name: "Adam Cohen", number: "22", position: "Defense", country: "🇮🇱", height: "6'2\"", weight: "200 lbs", shoots: "R" },
  { id: 8, name: "Erik Johansson", number: "17", position: "Forward", country: "🇸🇪", height: "6'0\"", weight: "188 lbs", shoots: "L" },
  { id: 9, name: "Omer Katz", number: "88", position: "Forward", country: "🇮🇱", height: "5'9\"", weight: "175 lbs", shoots: "R" },
  { id: 10, name: "Bence Tóth", number: "35", position: "Goalie", country: "🇭🇺", height: "6'1\"", weight: "195 lbs", shoots: "L" },
  { id: 11, name: "Liam Rosenberg", number: "4", position: "Defense", country: "🇨🇦", height: "6'0\"", weight: "198 lbs", shoots: "L" },
  { id: 12, name: "Matei Ionescu", number: "27", position: "Forward", country: "🇷🇴", height: "5'11\"", weight: "180 lbs", shoots: "R" },
];

import { useState } from "react";

const Roster = () => {
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL"
    ? players
    : players.filter((p) => {
        if (filter === "FORWARDS") return p.position === "Forward";
        if (filter === "DEFENSE") return p.position === "Defense";
        if (filter === "GOALIES") return p.position === "Goalie";
        return true;
      });

  return (
    <>
      {/* Page Hero */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary">Roster</span>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-display text-5xl md:text-7xl text-foreground">TEAM ROSTER</h1>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Meet the players representing Jerusalem HC in the 2025–26 season.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container">
          <div className="flex gap-2 flex-wrap">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={`px-5 py-2 text-xs font-heading tracking-wider transition-all ${
                  filter === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Player Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover rounded-sm overflow-hidden group"
              >
                {/* Player number strip */}
                <div className="h-24 bg-secondary/50 flex items-center justify-center relative">
                  <span className="font-display text-6xl text-primary/20">{player.number}</span>
                  <span className="absolute top-3 left-4 text-2xl">{player.country}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-display text-xl text-foreground tracking-wide">{player.name}</p>
                      <p className="text-xs text-primary font-heading tracking-wider">{player.position}</p>
                    </div>
                    <span className="font-display text-3xl text-primary/30">#{player.number}</span>
                  </div>
                  <div className="section-divider my-3" />
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      <p className="text-[10px] text-primary/60 font-heading">HT</p>
                      <p>{player.height}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary/60 font-heading">WT</p>
                      <p>{player.weight}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary/60 font-heading">SHOOTS</p>
                      <p>{player.shoots}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Roster;
