import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Target, Heart, Globe, Trophy, Star, Shield,
  Users, Plane, MapPin, Calendar, Swords, Flag, Medal,
  ArrowRight, Sparkles,
} from "lucide-react";
import logoImg from "@/assets/sabra-logo.png";
import jerseysImg from "@/assets/sabra-jerseys.png";
import puckImg from "@/assets/puck-ice.jpg";
import arenaImg from "@/assets/hero-arena.jpg";
import actionImg from "@/assets/jhc-action.png";
import playerImg from "@/assets/jhc-player.png";
import AnimatedCounter from "@/components/AnimatedCounter";
import IceParticles from "@/components/IceParticles";

/* ── data ── */
const pillars = [
  {
    icon: Globe,
    title: "Aliyah Through Hockey",
    desc: "Jewish hockey players from around the world can make aliyah and build their lives in Israel while playing professionally. No other sport offers this pathway at this level.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Users,
    title: "A Gateway for All Athletes",
    desc: "Just like basketball and soccer bring international players to Israel, Sabra HC will attract talent from around the world — giving non-Jewish players a chance to experience Israeli culture, live in Israel, and compete at the professional level.",
    accent: "from-accent/15 to-accent/5",
  },
  {
    icon: Heart,
    title: "Growing Israeli Youth Hockey",
    desc: "We're building a development pipeline so local Israeli kids don't have to leave the country to play competitive hockey. U20 talent will have a direct path into the professional system.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Federation-Operated",
    desc: "Sabra HC is not owned by any single person. The club is operated by the Israel Ice Hockey Federation and exists solely to grow the sport at every level — from grassroots to international competition.",
    accent: "from-accent/15 to-accent/5",
  },
];

const timeline = [
  { year: "1986", title: "Hockey Arrives in Israel", desc: "Ice hockey begins in Israel with recreational leagues and the formation of the national federation.", icon: Flag },
  { year: "2002", title: "IIHF Membership", desc: "Israel becomes a full member of the International Ice Hockey Federation, competing in Division III tournaments.", icon: Globe },
  { year: "2018", title: "Canada Israel Hockey School", desc: "The CIHS launches in Israel, bringing North American coaching and development to Israeli youth players.", icon: Star },
  { year: "2024", title: "The Vision is Born", desc: "The concept for Sabra HC is formalized — Israel's first fully professional hockey club.", icon: Sparkles },
  { year: "2025", title: "Club Founded", desc: "Sabra HC officially launches. The Founding 500 membership opens. Brand, roster, and arena negotiations begin.", icon: Trophy },
  { year: "2025-26", title: "Inaugural Season", desc: "Sabra HC competes in the EIHL and INHL — professional hockey on Israeli ice, against European competition.", icon: Swords },
  { year: "2026+", title: "Growth & Legacy", desc: "Youth academies across Israel, a dedicated arena, deeper European integration, and a model for emerging hockey nations.", icon: Medal },
];

const whyNow = [
  { value: "40+", label: "Years of Hockey in Israel" },
  { value: "3", label: "Ice Arenas Nationwide" },
  { value: "6", label: "European Nations in League" },
  { value: "500", label: "Founding Members Goal" },
];

const teamColors = [
  { name: "Navy Blue", hex: "#0B1F3B", desc: "The deep desert night sky", border: "border-[#0B1F3B]" },
  { name: "Gold", hex: "#C8A44D", desc: "The golden sand of Israel", border: "border-primary" },
  { name: "White", hex: "#FFFFFF", desc: "The ice we play on", border: "border-foreground/20" },
];

/* ── page ── */
const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ════════ CINEMATIC HERO ════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={arenaImg} alt="" className="w-full h-[130%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <IceParticles count={30} />

        <motion.div className="container relative z-10 text-center px-4" style={{ opacity: heroOpacity }}>
          <motion.img
            src={logoImg}
            alt="Sabra HC"
            className="w-32 h-32 md:w-44 md:h-44 object-contain mx-auto mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.4, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-primary font-heading text-xs md:text-sm tracking-[0.5em] mb-4 font-semibold">
              OUR STORY
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tight">
              <span className="text-gold-gradient">BORN IN</span>
            </h1>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground tracking-[0.1em] mt-2">
              THE DESERT
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="w-48 md:w-72 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-6"
          />

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Israel's first fully professional hockey club — a pathway for Jewish athletes worldwide,
            a home for international talent, and the foundation of a hockey culture that will last forever.
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-14 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] text-muted-foreground tracking-[0.3em] font-heading">DISCOVER</span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-background" style={{ clipPath: "polygon(0 70%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* ════════ WHY THIS TEAM EXISTS ════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,hsla(40,90%,50%,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,hsla(130,50%,40%,0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE BEGINNING</p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-[0.9]">
                WHY SABRA HC<br />
                <span className="text-gold-gradient">EXISTS</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-foreground text-lg font-medium">
                  For over 40 years, hockey has been growing in Israel. Local leagues, national teams, passionate fans — the foundation is there. What's been missing is the professional level.
                </p>
                <p>
                  Israel built world-class professional leagues in soccer and basketball. International players come from around the world to compete here. Those leagues changed the culture. They proved that Israel can sustain professional sports at the highest level.
                </p>
                <p>
                  Hockey is next. And Sabra HC is the team that's going to make it happen.
                </p>
                <p>
                  This isn't a concept or a dream — it's an active operation. The roster is forming. The arenas are booked. The league schedule is set. Professional hockey in Israel is happening, and it starts now.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-border">
                <img src={puckImg} alt="Hockey puck on Israeli ice" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-5xl text-gold-gradient mb-1">
                    <AnimatedCounter target={40} suffix="+" className="" />
                  </p>
                  <p className="text-xs text-foreground/80 font-heading tracking-wider">YEARS OF HOCKEY IN ISRAEL</p>
                </div>
              </div>
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-4 md:-right-8 glass-card rounded-xl p-5 border border-primary/25"
              >
                <Trophy className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading text-sm tracking-wider text-foreground">FIRST PRO CLUB</p>
                <p className="text-xs text-muted-foreground">In Israeli Hockey History</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ THE PATHWAY — 4 PILLARS ════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE MISSION</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              MORE THAN A TEAM<br />
              <span className="text-gold-gradient">A MOVEMENT</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Sabra HC exists to create pathways — for Jewish athletes to make aliyah, for international players to experience Israel, for local youth to grow, and for hockey to thrive at the professional level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className={`glass-card-hover rounded-xl p-8 md:p-10 h-full bg-gradient-to-br ${p.accent}`}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3 tracking-wider">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ THE ALIYAH PATHWAY — FULL WIDTH IMMERSIVE ════════ */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
          <img src={actionImg} alt="Hockey action" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE PATHWAY</p>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[0.9] mb-6">
                  COME TO ISRAEL<br />
                  <span className="text-gold-gradient">PLAY PRO HOCKEY</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed max-w-xl">
                  <p>
                    For Jewish hockey players, Sabra HC is the <span className="text-foreground font-semibold">first real professional pathway to Israel</span>. Make aliyah. Live in Israel. Play the sport you love — at the highest level.
                  </p>
                  <p>
                    And just like Israeli basketball and soccer attract international stars from around the world, Sabra HC will bring <span className="text-foreground font-semibold">non-Jewish players to Israel too</span> — giving them the chance to experience Israeli culture, live in the country, and compete professionally. Hockey becomes a bridge.
                  </p>
                  <p className="text-foreground font-medium text-lg">
                    You have to start somewhere. We're starting here.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  <div className="glass-card rounded-lg px-5 py-3 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-primary" />
                    <span className="text-xs font-heading tracking-wider text-foreground">ALIYAH ROUTE</span>
                  </div>
                  <div className="glass-card rounded-lg px-5 py-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-xs font-heading tracking-wider text-foreground">INTERNATIONAL IMPORTS</span>
                  </div>
                  <div className="glass-card rounded-lg px-5 py-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-xs font-heading tracking-wider text-foreground">LOCAL U20 DEVELOPMENT</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FULLY PROFESSIONAL ════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(40,90%,50%,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl overflow-hidden">
                  <img src={playerImg} alt="Professional player" className="w-full aspect-[3/4] object-cover" />
                </div>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl overflow-hidden">
                    <img src={jerseysImg} alt="Sabra HC jerseys" className="w-full aspect-square object-cover" />
                  </div>
                  <div className="glass-card rounded-xl p-6 text-center">
                    <p className="font-display text-4xl text-gold-gradient">100%</p>
                    <p className="text-xs text-muted-foreground font-heading tracking-wider mt-1">PROFESSIONAL</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE STANDARD</p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-[0.9]">
                A FULLY<br />
                <span className="text-gold-gradient">PROFESSIONAL</span><br />
                OPERATION
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Every player on the roster is a <span className="text-foreground font-semibold">paid professional</span>. The coaching staff works full-time. Training follows international standards. Travel and competition are fully funded.
                </p>
                <p>
                  Sabra HC doesn't cut corners. The team operates as a fully professional organization in every aspect — from scouting and player development to game-day operations and international scheduling.
                </p>
                <p>
                  The roster blends <span className="text-foreground font-semibold">15-17 Israeli players</span>, <span className="text-foreground font-semibold">3-5 international imports</span>, and <span className="text-foreground font-semibold">5 local U20 development players</span> — building the present and the future at the same time.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { num: "20+", label: "Home Games" },
                  { num: "6", label: "European Nations" },
                  { num: "2", label: "Pro Leagues" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-lg p-4 text-center">
                    <p className="font-display text-2xl text-gold-gradient">{s.num}</p>
                    <p className="text-[10px] text-muted-foreground tracking-wider font-heading mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ TIMELINE ════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsla(130,50%,40%,0.04)_0%,transparent_40%)] pointer-events-none" />

        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE JOURNEY</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground">
              FROM GRASSROOTS<br />
              <span className="text-gold-gradient">TO GLORY</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 relative group"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center z-10 group-hover:border-primary group-hover:bg-primary/20 transition-all cursor-default"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  {i < timeline.length - 1 && (
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-primary/30 to-border" />
                  )}
                </div>

                <div className="pb-12">
                  <p className="font-display text-2xl md:text-3xl text-primary">{item.year}</p>
                  <h3 className="font-heading text-lg tracking-wider text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ STATS BAR ════════ */}
      <section className="py-20 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {whyNow.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 lg:p-8 text-center group hover:border-primary/30 transition-all"
              >
                <p className="font-display text-4xl md:text-5xl text-gold-gradient">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-wider mt-2 font-heading">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ IDENTITY & BRANDING ════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE IDENTITY</p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-[0.9]">
                THE <span className="text-gold-gradient">SABRA</span> LION
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  The Sabra — a cactus fruit native to Israel — is tough and thorny on the outside, sweet and soft on the inside. It's the perfect symbol for Israeli identity and Israeli athletes.
                </p>
                <p>
                  Our crest features a fierce lion with a <span className="text-foreground font-semibold">cactus mane</span>, crossed hockey sticks, and the Star of David. It's modern professional hockey branding rooted in Israeli culture. The motto: <span className="text-primary font-semibold">#BornInTheDesert</span>.
                </p>
              </div>

              <h3 className="font-heading text-sm tracking-wider text-foreground mt-10 mb-5">TEAM COLORS</h3>
              <div className="flex gap-6">
                {teamColors.map((c) => (
                  <motion.div
                    key={c.name}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-2 cursor-default"
                  >
                    <div
                      className={`w-16 h-16 rounded-xl border-2 ${c.border} shadow-lg`}
                      style={{ background: c.hex }}
                    />
                    <span className="text-xs text-foreground font-heading tracking-wider">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass-card rounded-xl p-8 flex items-center justify-center aspect-square"
                >
                  <img src={logoImg} alt="Sabra HC Crest" className="w-full max-w-[200px] object-contain drop-shadow-2xl" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass-card rounded-xl overflow-hidden aspect-square"
                >
                  <img src={jerseysImg} alt="Sabra HC Jerseys" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              {/* Floating hashtag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-card rounded-full px-8 py-3 border border-primary/30"
              >
                <p className="font-heading text-sm tracking-[0.2em] text-primary font-semibold">#BORNINTHEDESERT</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ CTA — JOIN THE MOVEMENT ════════ */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <IceParticles count={20} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.08)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={logoImg}
              alt=""
              className="w-20 h-20 object-contain mx-auto mb-6 opacity-50"
            />
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
              THE STORY IS<br />
              <span className="text-gold-gradient">JUST BEGINNING</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
              500 founding members. One mission. The first chapter of professional hockey in Israel is being written right now — and you can be part of it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/founders"
                className="group relative px-12 py-5 font-heading text-base font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  BECOME A FOUNDER <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/schedule"
                className="px-12 py-5 font-heading text-base font-semibold tracking-wider rounded-full border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
              >
                VIEW SCHEDULE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
