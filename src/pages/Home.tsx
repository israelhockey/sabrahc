import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock, MapPin, Trophy, Users, Globe } from "lucide-react";
import logoImg from "@/assets/sabra-logo.png";
import arenaImg from "@/assets/hero-arena.jpg";
import puckImg from "@/assets/puck-ice.jpg";
import actionImg from "@/assets/jhc-action.png";
import playerImg from "@/assets/jhc-player.png";
import IceParticles from "@/components/IceParticles";
import AnimatedCounter from "@/components/AnimatedCounter";
import { articles } from "./NewsArticle";

const nextGame = {
  opponent: "TBA",
  date: "TBA",
  time: "TBA",
  venue: "TBA",
  league: "EIHL",
};

const newsItems = articles.slice(0, 4);

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
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse,hsl(40_55%_60%_/_0.2)_0%,transparent_60%)]" />
        </motion.div>

        <IceParticles count={40} />

        <motion.div className="container relative z-10 px-4" style={{ opacity }}>
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={logoImg} alt="Sabra HC Crest" className="w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain drop-shadow-2xl" />
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-[0.8] tracking-tight">
                <span className="text-gold-gradient">SABRA</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-48 md:w-72 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent my-3"
            />

            <motion.h2
              className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground tracking-[0.15em] leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              HOCKEY CLUB
            </motion.h2>

            <motion.p
              className="mt-5 text-xs md:text-sm tracking-[0.5em] text-primary/80 font-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              BORN IN THE DESERT · ISRAEL'S FIRST PROFESSIONAL HOCKEY CLUB
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Link
                to="/about"
                className="group relative px-12 py-4 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right overflow-hidden"
              >
                <span className="relative z-10">OUR STORY</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold-light to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/schedule"
                className="px-12 py-4 font-heading text-sm font-semibold tracking-wider border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all gold-border-glow"
              >
                2026-27 SEASON
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-background" style={{ clipPath: "polygon(0 70%, 100% 0, 100% 100%, 0 100%)" }} />

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-muted-foreground tracking-[0.3em] font-heading">SCROLL</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
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
                  <span className="font-heading text-lg tracking-wider text-foreground">SHC</span>
                </div>
                <span className="font-display text-2xl text-primary">VS</span>
                <span className="font-heading text-lg tracking-wider text-foreground">{nextGame.opponent}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {nextGame.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {nextGame.time}</span>
                <span className="hidden sm:flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {nextGame.venue}</span>
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
                  to={`/news/${item.slug}`}
                  className="block glass-card-hover rounded-sm overflow-hidden h-full group"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <span className="absolute bottom-2 left-3 inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base tracking-wider text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
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
                  Sabra HC is being created to elevate Israeli hockey from grassroots passion to international professional competition.
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
