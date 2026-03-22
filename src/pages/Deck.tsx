import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Trophy, Users, Globe, Target, TrendingUp, Shield, Shirt,
  Tv, Building2, Calendar, UserCheck, DollarSign, BarChart3,
  Rocket, Star, Heart, ChevronRight, MapPin, Ticket, ShoppingBag,
  Award, Plane, Check
} from "lucide-react";
import logoImg from "@/assets/sabra-logo.png";
import arenaImg from "@/assets/hero-arena.jpg";
import jerseysImg from "@/assets/sabra-jerseys.png";
import actionImg from "@/assets/jhc-action.png";
import playerImg from "@/assets/jhc-player.png";
import arenaMockup from "@/assets/arena-mockup.png";

/* ── helpers ── */
const Section = ({
  id, children, className = "",
}: {
  id: string; children: React.ReactNode; className?: string;
}) => (
  <section id={id} className={`relative ${className}`}>
    {children}
  </section>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-primary font-heading text-xs tracking-[0.45em] mb-3 font-semibold">{children}</p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[0.9] mb-6">{children}</h2>
);

const GlassCard = ({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`glass-card rounded-xl p-6 md:p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const StatBox = ({
  value, label, icon: Icon, delay = 0,
}: {
  value: string; label: string; icon: React.ElementType; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="glass-card rounded-xl p-6 text-center group hover:border-primary/30 transition-colors"
  >
    <Icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
    <p className="font-display text-3xl md:text-4xl text-gold-gradient">{value}</p>
    <p className="text-[11px] text-muted-foreground tracking-wider mt-1 font-heading">{label}</p>
  </motion.div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3 text-primary" />
        </div>
        {item}
      </li>
    ))}
  </ul>
);

/* ── table of contents items ── */
const tocItems = [
  "Executive Summary", "Why Hockey in Israel", "Market Opportunity",
  "Club Identity", "Arena & Game Experience", "Season Format",
  "Player Development", "Business Model", "Sabra HC Booster Club",
  "Financial Plan", "Operating Budget", "Growth Strategy",
  "Strategic Impact", "Why Sponsor", "The Vision", "Join the Founders",
];

/* ────────────────────────────── DECK PAGE ────────────────────────────── */

const Deck = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Layered radial gradients instead of photo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1000px] bg-[radial-gradient(ellipse_at_center,hsla(40,55%,50%,0.12)_0%,transparent_55%)]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse,hsla(40,50%,45%,0.06)_0%,transparent_60%)]" />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,hsla(130,40%,35%,0.04)_0%,transparent_60%)]" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Animated gold line accents */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-transparent via-primary/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />

        <motion.div className="container relative z-10 px-4 text-center" style={{ opacity: heroOpacity }}>
          <motion.img
            src={logoImg}
            alt="Sabra HC"
            className="w-28 h-28 md:w-40 md:h-40 object-contain mx-auto mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.4, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-primary font-heading text-xs tracking-[0.5em] mb-4 font-semibold">FOUNDING SPONSOR DECK</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tight">
              <span className="text-gold-gradient">SABRA</span>
            </h1>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground tracking-[0.12em] mt-2">
              HOCKEY CLUB
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 space-y-2"
          >
            <p className="text-primary font-heading text-xs md:text-sm tracking-[0.3em] font-semibold">
              "SABRA" — NATIVE ISRAELI
            </p>
            <p className="text-muted-foreground text-sm md:text-base font-light italic">
              The Flagship Hockey Club in Israel
            </p>
            <p className="text-gold-gradient font-heading text-base md:text-lg tracking-[0.15em] italic mt-2">
              Born in the Desert. Built for the Ice.
            </p>
            <p className="text-muted-foreground/60 text-xs tracking-[0.3em] font-heading mt-1">
              SABRA HC · ISRAEL · FOUNDED 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-64 md:w-96 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-primary/80 font-heading text-sm tracking-[0.3em] mt-8"
          >
            BUILDING THE FUTURE OF ISRAELI HOCKEY
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* ════════════ TABLE OF CONTENTS ════════════ */}
      <Section id="toc" className="py-10 md:py-14">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <GlassCard className="!p-5 md:!p-7">
              <SectionLabel>CONTENTS</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 mt-4">
                {tocItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-2 py-1.5 group cursor-default"
                  >
                    <span className="font-display text-xs text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[11px] text-foreground/70 font-heading tracking-wider group-hover:text-primary transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* ════════════ 01 — EXECUTIVE SUMMARY ════════════ */}
      <Section id="s1" className="py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(40_49%_54%_/_0.04)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionLabel>01 — EXECUTIVE SUMMARY</SectionLabel>
              <SectionTitle>
                THE FLAGSHIP <span className="text-gold-gradient">HOCKEY CLUB</span> IN ISRAEL
              </SectionTitle>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                Sabra HC is launching the flagship professional hockey club in Israel. The club will compete internationally while serving as the premier development platform for Israeli players.
              </p>
              <BulletList
                items={[
                  "Build a sustainable professional hockey organization in Israel",
                  "Elevate Israeli players to international competition",
                  "Establish Sabra HC as a global hockey brand",
                  "Join a European professional league within 3–5 years",
                ]}
              />
              <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/15">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Initial funding will support the club's first two seasons while the organization builds revenue and league partnerships.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              <StatBox value="1ST" label="PRO CLUB IN ISRAEL" icon={Trophy} delay={0} />
              <StatBox value="40" label="GAMES PER SEASON" icon={Calendar} delay={0.1} />
              <StatBox value="500" label="FOUNDING MEMBERS" icon={Users} delay={0.2} />
              <StatBox value="3-5" label="YR LEAGUE TIMELINE" icon={Target} delay={0.3} />
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 02 — WHY HOCKEY IN ISRAEL ════════════ */}
      <Section id="s2" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>02 — WHY HOCKEY IN ISRAEL</SectionLabel>
              <SectionTitle>
                A SPORT ON THE <span className="text-gold-gradient">RISE</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              <StatBox value="2,000+" label="REGISTERED PLAYERS" icon={Users} delay={0} />
              <StatBox value="7" label="DOMESTIC LEAGUES" icon={Trophy} delay={0.1} />
              <StatBox value="4" label="NATIONAL TEAMS" icon={Shield} delay={0.2} />
              <StatBox value="∞" label="GROWTH POTENTIAL" icon={TrendingUp} delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="font-heading text-lg tracking-wider text-foreground mb-4">Current Ecosystem</h3>
                <BulletList
                  items={[
                    "Over 2,000 registered players across the country",
                    "7 domestic leagues at various levels",
                    "4 national teams competing internationally",
                    "Growing youth participation year over year",
                    "Increasing global Jewish hockey community",
                    "The IEHL has surged in popularity over the last 5 years — dozens of international players relocate to Israel each season to compete",
                    "Fan attendance and engagement in the IEHL continues to grow year after year, building a passionate hockey culture",
                  ]}
                />
              </GlassCard>
              <GlassCard delay={0.15}>
                <h3 className="font-heading text-lg tracking-wider text-foreground mb-4">The Gap</h3>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-4">
                  <p className="text-foreground font-heading tracking-wider text-sm">
                    Israel currently lacks a professional club capable of competing internationally.
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground font-heading tracking-wider text-lg">Sabra HC fills this gap.</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 03 — MARKET OPPORTUNITY ════════════ */}
      <Section id="s3" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>03 — MARKET OPPORTUNITY</SectionLabel>
              <SectionTitle>
                UNIQUE SPORTS <span className="text-gold-gradient">MARKET</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <GlassCard>
                <h3 className="font-heading text-lg tracking-wider text-foreground mb-4">Key Factors</h3>
                <BulletList
                  items={[
                    "Global visibility of Israel as a sports and culture destination",
                    "Strong government support for sports development",
                    "Growing youth hockey participation across Israel",
                    "Untapped professional sports market with massive potential",
                  ]}
                />
              </GlassCard>
              <GlassCard delay={0.15}>
                <h3 className="font-heading text-lg tracking-wider text-foreground mb-4">Sabra HC Will Serve As</h3>
                <div className="space-y-4">
                  {[
                    { icon: Globe, text: "Israel's flagship professional hockey team" },
                    { icon: Star, text: "A global Jewish hockey brand" },
                    { icon: TrendingUp, text: "A development pipeline for national teams" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/90 font-heading tracking-wider">{text}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 04 — CLUB IDENTITY ════════════ */}
      <Section id="s4" className="py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel>04 — CLUB IDENTITY</SectionLabel>
              <SectionTitle>
                THE <span className="text-gold-gradient">SABRA</span> LION
              </SectionTitle>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Sabra HC represents the spirit of Israel — tough on the outside, sweet on the inside. Born in the desert, built for the ice.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img src={jerseysImg} alt="Sabra HC jerseys" className="relative w-full rounded-xl border border-border shadow-2xl" />
              </motion.div>

              <div className="space-y-6">
                <GlassCard>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg tracking-wider text-foreground">Symbol: The Sabra Lion</h3>
                  </div>
                  <BulletList
                    items={[
                      "Lion of Judah symbolism — strength and resilience",
                      "Sabra cactus mane — tough on the outside, sweet on the inside",
                      "European professional hockey aesthetic",
                    ]}
                  />
                </GlassCard>
                <GlassCard delay={0.1}>
                  <h3 className="font-heading text-lg tracking-wider text-foreground mb-5">Team Colors</h3>
                  <div className="flex gap-6">
                    {[
                      { name: "Navy Blue", hex: "#0B1F3B", tw: "bg-background" },
                      { name: "Gold", hex: "#C8A44D", tw: "bg-primary" },
                      { name: "White", hex: "#FFFFFF", tw: "bg-foreground" },
                    ].map((c) => (
                      <div key={c.name} className="flex flex-col items-center gap-2">
                        <div className={`w-14 h-14 rounded-xl ${c.tw} border border-border shadow-lg`} />
                        <span className="text-[11px] text-muted-foreground font-heading tracking-wider">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 05 — ARENA & GAME EXPERIENCE ════════════ */}
      <Section id="s5" className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>05 — ARENA & GAME EXPERIENCE</SectionLabel>
              <SectionTitle>
                TWO WORLD-CLASS <span className="text-gold-gradient">ARENAS</span>
              </SectionTitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden mb-10 group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src={arenaMockup} alt="Sabra HC arena mockup" className="relative w-full rounded-xl border border-border shadow-2xl" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                <p className="font-heading text-xs tracking-[0.3em] text-primary">ARENA CONCEPT MOCKUP</p>
                <p className="text-sm text-foreground/80 mt-1">Sabra HC home game — full branding, packed stands, world-class atmosphere</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <GlassCard>
                <div className="flex items-center gap-3 mb-5">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-heading text-lg tracking-wider text-foreground">One Ice Arena</h3>
                    <p className="text-xs text-muted-foreground">Primary Venue · Near Netanya · Capacity: 2,000</p>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary font-heading tracking-wider">★ MOST GAMES PLAYED HERE</p>
                </div>
                <BulletList
                  items={[
                    "Israel's largest ice arena — 2,000 seat capacity",
                    "Full broadcast and streaming capability",
                    "Professional-grade facilities for international competition",
                    "Fan-focused game day atmosphere",
                  ]}
                />
              </GlassCard>
              <GlassCard delay={0.15}>
                <div className="flex items-center gap-3 mb-5">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-heading text-lg tracking-wider text-foreground">Blue Ice Arena</h3>
                    <p className="text-xs text-muted-foreground">Ashdod, Israel · Capacity: 750</p>
                  </div>
                </div>
                <BulletList
                  items={[
                    "One-side seating configuration with 750 seats",
                    "Intimate atmosphere with fans right on top of the action",
                    "Located in Ashdod, Israel",
                    "Will host at least 10 games during the season",
                  ]}
                />
                <div className="mt-5 p-4 rounded-lg bg-primary/5 border border-primary/15">
                  <p className="text-sm text-foreground/80 italic">
                    "A packed, high-energy arena where fans are close to the action."
                  </p>
                </div>
              </GlassCard>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <StatBox value="2,000" label="ONE ICE CAPACITY" icon={Users} />
              <StatBox value="750" label="BLUE ICE CAPACITY" icon={Building2} delay={0.1} />
              <StatBox value="LIVE" label="BROADCAST READY" icon={Tv} delay={0.2} />
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 06 — SEASON FORMAT ════════════ */}
      <Section id="s6" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>06 — SEASON FORMAT</SectionLabel>
              <SectionTitle>
                <span className="text-gold-gradient">40</span> GAME SEASON
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "International Games",
                  count: "20",
                  desc: "Home games vs European teams",
                  detail: "Romania · Hungary · Poland · Russia · Alps Hockey League",
                  icon: Globe,
                },
                {
                  title: "Domestic League",
                  count: "10",
                  desc: "Israeli National Hockey League",
                  detail: "Competing in the INHL domestic schedule",
                  icon: Trophy,
                },
                {
                  title: "Additional Games",
                  count: "10",
                  desc: "Exhibition matches",
                  detail: "Games vs Israeli clubs & special events",
                  icon: Calendar,
                },
              ].map((item, i) => (
                <GlassCard key={item.title} delay={i * 0.1}>
                  <item.icon className="w-6 h-6 text-primary mb-3" />
                  <p className="font-display text-5xl text-gold-gradient mb-1">{item.count}</p>
                  <h3 className="font-heading text-base tracking-wider text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{item.detail}</p>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="border-primary/25 !bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base tracking-wider text-foreground mb-2">HISTORIC INTERNATIONAL MATCHUPS</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For the <span className="text-primary font-semibold">first time ever</span>, professional hockey teams from Romania, Hungary, Poland, Russia, and other European nations will travel to Israel to compete. Sabra HC will bring international hockey to Israeli ice — creating landmark sporting events and putting Israeli hockey on the global map.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 07 — PLAYER DEVELOPMENT ════════════ */}
      <Section id="s7" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionLabel>07 — PLAYER DEVELOPMENT</SectionLabel>
              <SectionTitle>
                BUILDING <span className="text-gold-gradient">CHAMPIONS</span>
              </SectionTitle>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Israeli Players", count: "15–17", desc: "Core local talent" },
                  { label: "Imports", count: "3–5", desc: "Experienced international professionals" },
                  { label: "Development Players", count: "5", desc: "Local U20 future stars" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 glass-card rounded-lg p-4">
                    <p className="font-display text-3xl text-gold-gradient w-20 text-center">{item.count}</p>
                    <div>
                      <p className="font-heading text-sm tracking-wider text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <BulletList
                items={[
                  "Raise the level of Israeli hockey overall",
                  "Provide development opportunities for young Israeli players",
                  "Build a competitive professional roster",
                  "Pipeline for Israel's national teams",
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-b from-primary/15 via-transparent to-primary/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src={playerImg} alt="Sabra HC player" className="relative w-full max-w-md mx-auto rounded-xl border border-border shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 08 — BUSINESS MODEL ════════════ */}
      <Section id="s8" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>08 — BUSINESS MODEL</SectionLabel>
              <SectionTitle>
                REVENUE <span className="text-gold-gradient">STREAMS</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Ticket, title: "Ticket Sales", desc: "20 home games · 500–1,000 seats per game" },
                { icon: ShoppingBag, title: "Merchandise", desc: "Team jerseys · Fan apparel · Online store" },
                { icon: Tv, title: "Digital Broadcasting", desc: "Season streaming pass · International fans" },
                { icon: Building2, title: "Corporate Sponsorships", desc: "Local Israeli businesses · International Jewish brands" },
                { icon: Star, title: "Special Events", desc: "International tournaments · Fan experiences" },
                { icon: Globe, title: "Global Community", desc: "Diaspora engagement · Digital memberships" },
              ].map((item, i) => (
                <GlassCard key={item.title} delay={i * 0.08} className="group hover:border-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 09 — SABRA HC BOOSTER CLUB ════════════ */}
      <Section id="s9" className="py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionLabel>09 — SABRA HC BOOSTER CLUB</SectionLabel>
              <SectionTitle>
                BE PART OF <span className="text-gold-gradient">HISTORY</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <GlassCard className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold-light to-primary" />
                  <div className="text-center mb-8 pt-4">
                    <p className="text-muted-foreground text-xs tracking-widest font-heading mb-2">SABRA HC BOOSTER CLUB — INAUGURAL SEASON</p>
                    <p className="font-display text-6xl text-gold-gradient">$299</p>
                    <p className="text-muted-foreground text-xs mt-1">One-time contribution</p>
                  </div>
                  <CheckList
                    items={[
                      "Official Sabra HC Founders Edition jersey",
                      "Founders merchandise pack (scarf, hat, pin)",
                      "Digital season pass — all broadcasts & replays",
                      "Exclusive behind-the-scenes team content",
                      "20% discount on all team merchandise",
                      "Name on the permanent Founders Wall",
                    ]}
                  />
                </GlassCard>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <StatBox value="500" label="BOOSTER CLUB MEMBERS GOAL" icon={Users} />
                <StatBox value="$299" label="MEMBERSHIP PRICE" icon={DollarSign} delay={0.1} />
                <GlassCard delay={0.2} className="relative overflow-hidden !border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold-light to-primary" />
                  <div className="relative text-center pt-2">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                      <Award className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl text-gold-gradient mb-1">GRAND PRIZE</h3>
                    <p className="font-heading text-xs tracking-widest text-primary/80 mb-3">EVERY MEMBER IS ENTERED</p>
                    <div className="bg-background/50 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm text-foreground font-heading tracking-wider leading-relaxed">
                        ✈️ VIP trip for two to Israel
                      </p>
                      <p className="text-sm text-foreground font-heading tracking-wider leading-relaxed mt-1">
                        🏒 Attend three Sabra HC home games
                      </p>
                      <p className="text-sm text-foreground font-heading tracking-wider leading-relaxed mt-1">
                        🏨 Flights, hotel & VIP access included
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-3 tracking-wider">ALL-EXPENSES-PAID EXPERIENCE</p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 10 — FINANCIAL PLAN ════════════ */}
      <Section id="s10" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>10 — FINANCIAL PLAN</SectionLabel>
              <SectionTitle>
                INITIAL CAPITAL <span className="text-gold-gradient">TARGET</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard>
                <div className="text-center mb-8">
                  <p className="font-display text-6xl md:text-7xl text-gold-gradient">₪600K</p>
                  <p className="text-muted-foreground text-sm mt-2">Initial capital to support first two seasons</p>
                </div>
                <h3 className="font-heading text-sm tracking-wider text-foreground mb-4">FUNDING SOURCES</h3>
                <BulletList
                  items={[
                    "Booster club membership program",
                    "Corporate sponsorships",
                    "Government sports funding",
                    "Ticket revenue",
                    "Merchandise sales",
                  ]}
                />
              </GlassCard>
              <div className="space-y-4">
                <GlassCard delay={0.15}>
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-6">SPONSORSHIP REVENUE</h3>
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-6 text-center mb-6">
                    <p className="font-display text-4xl text-gold-gradient">₪50–100K</p>
                    <p className="text-xs text-muted-foreground mt-1">Annually</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Corporate sponsorships from local and international brands will generate additional revenue beyond the initial capital target.
                  </p>
                </GlassCard>
                <GlassCard delay={0.25}>
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-6">OTHER REVENUE</h3>
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-6 text-center mb-6">
                    <p className="font-display text-4xl text-gold-gradient">₪50–100K</p>
                    <p className="text-xs text-muted-foreground mt-1">Annually</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Additional revenue from ticket sales, merchandise, digital broadcasting, and other sources will provide consistent annual support for the club's operations.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 11 — OPERATING BUDGET ════════════ */}
      <Section id="s11" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>11 — OPERATING BUDGET</SectionLabel>
              <SectionTitle>
                ANNUAL <span className="text-gold-gradient">EXPENSES</span>
              </SectionTitle>
            </motion.div>

            <GlassCard>
              <div className="space-y-4 mb-8">
                {[
                  { label: "👥 Player Expenses", amount: "₪50,000–100,000", pct: 7 },
                  { label: "🇮🇱 Israel Hockey Development (National Team, Camps, Learn to Play Program, etc.)", amount: "₪250,000", pct: 19 },
                  { label: "🏠 Housing (Imports)", amount: "₪90,000", pct: 7 },
                  { label: "🧠 Staff", amount: "₪123,000", pct: 9 },
                  { label: "✈️ Travel", amount: "₪200,000", pct: 15 },
                  { label: "🧊 Ice (Games)", amount: "₪200,000", pct: 15 },
                  { label: "🏒 Practices", amount: "₪175,000", pct: 13 },
                  { label: "🥅 Equipment", amount: "₪90,000", pct: 7 },
                  { label: "📣 Marketing", amount: "₪75,000", pct: 6 },
                  { label: "⚙️ Misc", amount: "₪50,000", pct: 4 },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground font-heading tracking-wider">{item.label}</span>
                      <span className="text-sm text-primary font-heading">{item.amount}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <span className="font-heading text-base tracking-wider text-foreground">🔴 TOTAL EXPENSES</span>
                <span className="font-display text-3xl text-gold-gradient">₪1,303,000–1,353,000</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 12 — GROWTH STRATEGY ════════════ */}
      <Section id="s12" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>12 — GROWTH STRATEGY</SectionLabel>
              <SectionTitle>
                EUROPEAN LEAGUE <span className="text-gold-gradient">PATHWAY</span>
              </SectionTitle>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-primary/10" />
              {[
                { year: "YEAR 1", title: "Foundation", desc: "Independent schedule vs European clubs. Establish operations and brand.", side: "left" },
                { year: "YEAR 2", title: "Expansion", desc: "Expanded international schedule. Deeper league relationships. Compete in the IIHF Continental Cup.", side: "right" },
                { year: "YEAR 3–5", title: "League Entry", desc: "Apply to join a European professional league.", side: "left" },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-center mb-12 ${
                    item.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 -ml-[7px] md:-ml-2 rounded-full bg-primary border-2 border-background shadow-lg gold-glow z-10" />
                  <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                    <GlassCard>
                      <p className="font-display text-2xl text-gold-gradient mb-1">{item.year}</p>
                      <h3 className="font-heading text-base tracking-wider text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </div>

            <GlassCard className="mt-4">
              <h3 className="font-heading text-sm tracking-wider text-foreground mb-3">TARGET LEAGUES</h3>
              <div className="flex flex-wrap gap-3">
                {["Alps Hockey League", "Romanian Liga Nationala", "Hungarian Erste Liga"].map((league) => (
                  <span key={league} className="px-4 py-2 rounded-full text-xs font-heading tracking-wider border border-primary/25 text-foreground bg-primary/5">
                    {league}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 13 — STRATEGIC IMPACT ════════════ */}
      <Section id="s13" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <SectionLabel>13 — STRATEGIC IMPACT</SectionLabel>
              <SectionTitle>
                ELEVATING ISRAELI <span className="text-gold-gradient">HOCKEY</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { icon: TrendingUp, text: "Raise the national level of play" },
                { icon: Heart, text: "Keep Israeli players in the country" },
                { icon: Globe, text: "Increase international exposure" },
                { icon: Users, text: "Strengthen national team development" },
              ].map((item, i) => (
                <GlassCard key={item.text} delay={i * 0.1} className="flex flex-col items-center text-center">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-foreground font-heading tracking-wider">{item.text}</p>
                </GlassCard>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground mt-10 max-w-lg mx-auto leading-relaxed"
            >
              This project represents the next stage in the growth of Israeli hockey.
            </motion.p>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 14 — WHY SPONSOR ════════════ */}
      <Section id="s14" className="py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(40_49%_54%_/_0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionLabel>14 — WHY SPONSOR</SectionLabel>
              <SectionTitle>
                A UNIQUE <span className="text-gold-gradient">OPPORTUNITY</span>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Trophy, text: "The flagship hockey club in Israel" },
                { icon: Globe, text: "Strong global brand potential" },
                { icon: TrendingUp, text: "Growing sport domestically" },
                { icon: Users, text: "International audience engagement" },
                { icon: DollarSign, text: "Relatively low operating costs" },
                { icon: Star, text: "Sports, culture & global visibility" },
              ].map((item, i) => (
                <GlassCard key={item.text} delay={i * 0.08} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-heading tracking-wider leading-snug pt-2">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ════════════ 15 — THE VISION ════════════ */}
      <Section id="s15" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={actionImg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>15 — THE VISION</SectionLabel>
            <SectionTitle>
              THE FLAGSHIP HOCKEY CLUB <span className="text-gold-gradient">IN ISRAEL</span>
            </SectionTitle>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Sabra HC will become the flagship hockey club in Israel. The organization will build a sustainable professional team
              capable of competing internationally while developing the next generation of Israeli hockey players.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ════════════ 16 — JOIN THE FOUNDERS ════════════ */}
      <Section id="s16" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <motion.img
              src={logoImg}
              alt="Sabra HC"
              className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto mb-8 drop-shadow-2xl"
            />
            <SectionLabel>16 — JOIN THE FOUNDERS</SectionLabel>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.85] mb-6">
              SABRA HC IS<br />
              <span className="text-gold-gradient">MORE THAN A TEAM</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg mb-10 leading-relaxed">
              It is the future of Israeli hockey. Join us as a founding supporter and help build the flagship hockey club in Israel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/founders"
                className="group relative px-12 py-5 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all clip-angle-right overflow-hidden gold-glow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  BECOME A FOUNDER <ChevronRight size={16} />
                </span>
              </Link>
              <a
                href="mailto:info@sabrahc.com"
                className="px-12 py-5 font-heading text-sm font-semibold tracking-wider border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all gold-border-glow"
              >
                CONTACT US
              </a>
            </div>

            <p className="text-muted-foreground/50 text-xs tracking-[0.3em] font-heading mt-12">
              SABRA HC · EST. 2026 · THE FLAGSHIP HOCKEY CLUB IN ISRAEL
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Deck;
