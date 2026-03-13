import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock, MapPin, Trophy, Users, Globe } from "lucide-react";
import logoImg from "@/assets/jhc-logo.png";
import arenaImg from "@/assets/arena-hero.jpg";
import puckImg from "@/assets/puck-ice.jpg";
import IceParticles from "@/components/IceParticles";
import AnimatedCounter from "@/components/AnimatedCounter";

const nextGame = {
  opponent: "Ferencváros TC",
  date: "OCT 18, 2025",
  time: "19:30",
  venue: "Canada Centre, Metula",
  league: "EIHL",
};

const newsItems = [
  { id: 1, title: "Jerusalem HC Signs Forward Alon Eizenman", category: "ROSTER", date: "Mar 10, 2025" },
  { id: 2, title: "Pre-Season Training Camp Dates Announced", category: "TEAM NEWS", date: "Mar 8, 2025" },
  { id: 3, title: "Partnership with EIHL Confirmed for 2025-26", category: "LEAGUE", date: "Mar 5, 2025" },
  { id: 4, title: "Jersey Reveal: Home & Away Unveiled", category: "MERCH", date: "Mar 2, 2025" },
];

const stats = [
  { value: 40, suffix: "+", label: "Years of Hockey in Israel", icon: Trophy },
  { value: 20, suffix: "+", label: "Home Games Per Season", icon: Calendar },
  { value: 6, suffix: "", label: "European Nations", icon: Globe },
  { value: 500, suffix: "", label: "Founding Members Goal", icon: Users },
];

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={arenaImg} alt="" className="w-full h-[130%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        <IceParticles count={30} />

        <motion.div className="container relative z-10 text-center px-4" style={{ opacity }}>
          <motion.img
            src={logoImg}
            alt="Jerusalem HC Crest"
            className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mx-auto mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.h1
            className="font-display text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-gold-gradient">JERUSALEM</span>
            <br />
            <span className="text-foreground">HOCKEY CLUB</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-sm md:text-base tracking-[0.4em] text-primary font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ISRAEL'S FIRST PROFESSIONAL HOCKEY CLUB
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/about"
              className="px-10 py-4 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right"
            >
              OUR STORY
            </Link>
            <Link
              to="/roster"
              className="px-10 py-4 font-heading text-sm font-semibold tracking-wider border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              MEET THE TEAM
            </Link>
          </motion.div>
        </motion.div>

        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* ========== NEXT GAME BAR ========== */}
      <section className="relative z-10 -mt-12">
        <div className="container">
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground">
              <Calendar size={14} />
              <span className="font-heading text-xs tracking-wider font-semibold">NEXT GAME</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="" className="w-10 h-10 object-contain" />
                  <span className="font-heading text-lg tracking-wider text-foreground">JHC</span>
                </div>
                <span className="font-display text-2xl text-primary">VS</span>
                <span className="font-heading text-lg tracking-wider text-foreground">{nextGame.opponent}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {nextGame.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {nextGame.time}</span>
                <span className="flex items-center gap-1.5 hidden sm:flex"><MapPin size={14} className="text-primary" /> {nextGame.venue}</span>
              </div>
              <Link
                to="/schedule"
                className="px-6 py-2 font-heading text-xs tracking-wider font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right"
              >
                FULL SCHEDULE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWS PREVIEW ========== */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">LATEST</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground">NEWS & UPDATES</h2>
            </div>
            <Link to="/news" className="hidden md:flex items-center gap-1 text-sm text-primary hover:text-gold-light transition-colors font-heading tracking-wider">
              ALL NEWS <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/news"
                  className="block glass-card-hover rounded-sm p-6 h-full"
                >
                  <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-4">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-base tracking-wider text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link to="/news" className="md:hidden flex items-center justify-center gap-1 mt-6 text-sm text-primary font-heading tracking-wider">
            ALL NEWS <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ========== VISION / STORY TEASER ========== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img src={puckImg} alt="Hockey puck on ice" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />

          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <p className="text-primary font-heading text-sm tracking-[0.3em] mb-4">THE VISION</p>
                <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[0.95] mb-6">
                  BUILDING THE FUTURE<br />
                  <span className="text-gold-gradient">OF ISRAELI HOCKEY</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Jerusalem HC is being created to elevate Israeli hockey from grassroots passion to international professional competition.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 font-heading text-sm tracking-wider font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right"
                >
                  READ OUR STORY <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-sm p-6 lg:p-8 text-center"
              >
                <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  className="text-4xl md:text-5xl font-display text-gold-gradient block"
                  duration={1.5}
                />
                <p className="text-xs text-muted-foreground tracking-wider mt-2 font-heading">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOUNDERS CTA ========== */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="container text-center relative z-10">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-4">FOUNDING MEMBERSHIP</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            BE PART OF <span className="text-gold-gradient">HISTORY</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            Join the exclusive group of founding members who are making Israel's first professional hockey club a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/founders"
              className="px-10 py-4 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow clip-angle-right"
            >
              BECOME A FOUNDER
            </Link>
            <Link
              to="/fans"
              className="px-10 py-4 font-heading text-sm font-semibold tracking-wider border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              FAN ZONE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
