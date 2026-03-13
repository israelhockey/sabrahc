import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import logoImg from "@/assets/jhc-logo.png";

const games = [
  { id: 1, date: "Oct 18", time: "19:30", opponent: "Ferencváros TC", location: "Canada Centre, Metula", type: "Home", league: "EIHL" },
  { id: 2, date: "Oct 25", time: "20:00", opponent: "ASC Corona Brașov", location: "Brașov, Romania", type: "Away", league: "EIHL" },
  { id: 3, date: "Nov 1", time: "19:00", opponent: "HC Csíkszereda", location: "Canada Centre, Metula", type: "Home", league: "EIHL" },
  { id: 4, date: "Nov 8", time: "18:00", opponent: "MAC Budapest", location: "Budapest, Hungary", type: "Away", league: "EIHL" },
  { id: 5, date: "Nov 15", time: "19:30", opponent: "Maccabi Metula", location: "Canada Centre, Metula", type: "Home", league: "INHL" },
  { id: 6, date: "Nov 22", time: "20:00", opponent: "HC Galați", location: "Galați, Romania", type: "Away", league: "EIHL" },
  { id: 7, date: "Nov 29", time: "19:30", opponent: "Bat Yam HC", location: "Canada Centre, Metula", type: "Home", league: "INHL" },
  { id: 8, date: "Dec 6", time: "18:30", opponent: "Ferencváros TC", location: "Budapest, Hungary", type: "Away", league: "EIHL" },
  { id: 9, date: "Dec 13", time: "19:30", opponent: "Haifa HC", location: "Canada Centre, Metula", type: "Home", league: "INHL" },
  { id: 10, date: "Dec 20", time: "19:00", opponent: "ASC Corona Brașov", location: "Canada Centre, Metula", type: "Home", league: "EIHL" },
];

const Schedule = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Schedule</span>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">2025–26 SCHEDULE</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Follow Jerusalem HC through the EIHL and INHL seasons.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="space-y-3">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col md:flex-row items-center gap-4 md:gap-0 p-5 rounded-sm border transition-all hover:border-primary/30 ${
                game.type === "Home" ? "glass-card" : "bg-card/50 border-border"
              }`}
            >
              {/* Date */}
              <div className="w-full md:w-28 text-center md:text-left">
                <p className="font-display text-xl text-foreground">{game.date}</p>
                <p className="text-xs text-muted-foreground">{game.time}</p>
              </div>

              {/* League badge */}
              <div className="w-full md:w-20">
                <span className={`inline-block px-3 py-1 text-[10px] font-heading tracking-wider ${
                  game.league === "EIHL" ? "text-primary bg-primary/10 border border-primary/20" : "text-foreground bg-secondary border border-border"
                }`}>
                  {game.league}
                </span>
              </div>

              {/* Matchup */}
              <div className="flex-1 flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <img src={logoImg} alt="" className="w-6 h-6 object-contain" />
                  <span className="font-heading text-sm tracking-wider text-foreground">JHC</span>
                </div>
                <span className="font-display text-lg text-primary">VS</span>
                <span className="font-heading text-sm tracking-wider text-foreground">{game.opponent}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary" />
                {game.location}
              </div>

              {/* Home/Away badge */}
              <div className="w-full md:w-20 text-center md:text-right">
                <span className={`inline-block px-3 py-1 text-[10px] font-heading tracking-wider ${
                  game.type === "Home" ? "text-primary-foreground bg-primary" : "text-muted-foreground bg-muted"
                }`}>
                  {game.type.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Schedule;
