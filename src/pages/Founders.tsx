import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Check,
  ShieldCheck,
  Plane,
  Star,
  Users,
  Globe,
  Heart,
  Trophy,
  Shirt,
  Gift,
  Tv,
  Tag,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { CAMPAIGN } from "@/lib/campaign";
import AnimatedCounter from "@/components/AnimatedCounter";
import IceParticles from "@/components/IceParticles";
import logoImg from "@/assets/sabra-logo.png";

/* ─── benefit cards with icons ─── */
const benefits = [
  { icon: Shirt, title: "Founders Edition Jersey", desc: "Exclusive limited-run jersey only available to the founding 500. Never sold again." },
  { icon: Gift, title: "Founders Merch Pack", desc: "Official scarf, hat, and enamel pin — all Founders Edition exclusives." },
  { icon: Tv, title: "Digital Season Ticket", desc: "Full access to every game broadcast, replay, and behind-the-scenes content worldwide." },
  { icon: Tag, title: "20% Merch Discount", desc: "Lifetime discount on all Sabra HC merchandise as a founding member." },
  { icon: MapPin, title: "Founders Wall — Forever", desc: "Your name permanently displayed at the arena on the Sabra HC Founders Wall for all of history." },
];

const reasons = [
  { icon: Globe, title: "A Pathway to Israel", desc: "Sabra HC creates a real professional route for Jewish hockey players worldwide to make aliyah and build their lives in Israel while competing at the highest level. Play pro hockey. Live in Israel. Both at the same time." },
  { icon: Heart, title: "Growing the Sport Locally", desc: "You're not just supporting a team — you're building a development pipeline for local Israeli youth and ensuring the next generation has a real future in hockey. Every shekel goes back into the sport." },
  { icon: Trophy, title: "A Fully Professional Club", desc: "All players are professionals. The team operates as a fully professional organization in every aspect — coaching, training, travel, competition, and player development. No shortcuts." },
  { icon: Users, title: "Federation-Operated", desc: "Sabra HC is not owned by any one person. It is operated by the Israel Ice Hockey Federation and exists solely to grow Israeli hockey at every level — from youth programs to international competition." },
];

const faqs = [
  { q: "What exactly do I get as a founding member?", a: "You receive a limited-edition Founders jersey (never sold again), a merch pack, digital season ticket for all broadcasts, 20% lifetime merch discount, entry into the VIP Israel trip giveaway, and your name permanently on the Founders Wall at the arena." },
  { q: "Is this annual or one-time?", a: `The founding membership is $${CAMPAIGN.membershipPrice}/year. Your annual contribution directly funds professional hockey operations in Israel — player salaries, arena costs, equipment, travel, and youth development. You can also split each year into ${CAMPAIGN.installmentCount} payments of $${CAMPAIGN.installmentPrice}.` },
  { q: "Who owns Sabra HC?", a: "No single person owns Sabra HC. The club is operated by the Israel Ice Hockey Federation and exists to grow Israeli hockey at every level. All funds go directly into building the sport — from youth programs to professional competition." },
  { q: "Is this a donation or an investment?", a: "This is a founding membership. You're becoming one of the original 500 supporters who make professional hockey in Israel possible — with exclusive perks, permanent recognition, and the knowledge that you're building something historic." },
  { q: "I'm a hockey player — can I try out?", a: "Absolutely. Sabra HC fields a fully professional roster and is actively recruiting. If you're a Jewish hockey player interested in making aliyah and playing professionally in Israel, reach out to us directly." },
  { q: "How will my money be used?", a: "Founding membership funds go directly toward club operations — professional player salaries, arena operations, equipment, international travel for competition, coaching staff, and youth development programs across Israel." },
  { q: "Will there be more than 500 founding members?", a: "Each year is capped at 500 founding members. Once all spots for the year are filled, registration closes and the VIP trip raffle is drawn. A new cycle opens the following season." },
  { q: "Are all players professionals?", a: "Yes. Sabra HC operates as a fully professional team in every aspect — all players are paid professionals, with full-time coaching staff, professional training facilities, and competitive international schedules." },
];

const Founders = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const spotsLeft = CAMPAIGN.goalMembers - CAMPAIGN.currentMembers;
  const pct = (CAMPAIGN.currentMembers / CAMPAIGN.goalMembers) * 100;

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <IceParticles count={35} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />

        <motion.div className="container relative z-10 text-center px-4 py-32" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.img
            src={logoImg}
            alt="Sabra HC"
            className="w-28 h-28 md:w-36 md:h-36 object-contain mx-auto mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-primary font-heading text-xs md:text-sm tracking-[0.5em] mb-4 font-semibold">
              ONLY {spotsLeft} SPOTS REMAINING
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-foreground mb-6">
              BE ONE OF THE
              <br />
              <span className="text-gold-gradient">FIRST 500</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Sabra HC is Israel's first fully professional hockey club — a pathway for Jewish athletes to make aliyah and play at the highest level. Your annual founding membership directly supports and grows professional hockey in Israel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <a
              href="#join"
              className="px-12 py-5 font-heading text-base font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              BECOME A FOUNDER — ${CAMPAIGN.membershipPrice}
            </a>
            <a
              href="#why"
              className="px-12 py-5 font-heading text-base font-semibold tracking-wider rounded-full border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              WHY JOIN?
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="mt-16"
          >
            <ChevronDown className="mx-auto text-primary" size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════ LIVE PROGRESS ════════ */}
      <section className="py-16 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <p className="text-xs text-primary font-heading tracking-wider mb-2">FOUNDERS JOINED</p>
                <div className="flex items-baseline justify-center gap-2">
                  <AnimatedCounter target={CAMPAIGN.currentMembers} className="font-display text-6xl text-gold-gradient" />
                  <span className="text-muted-foreground text-xl">/ {CAMPAIGN.goalMembers}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-dark via-primary to-gold-light rounded-full relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full shadow-lg" />
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">{spotsLeft}</span> spots remaining this season
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-primary font-heading tracking-wider mb-2">RAISED SO FAR</p>
                <p className="font-display text-5xl text-foreground">
                  $<AnimatedCounter target={CAMPAIGN.raisedAmount} className="text-gold-gradient" />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ WHY BECOME A FOUNDER ════════ */}
      <section id="why" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsla(130,50%,40%,0.04)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsla(45,90%,50%,0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">THE MISSION</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              THIS ISN'T JUST A TEAM
              <br />
              <span className="text-gold-gradient">IT'S A MOVEMENT</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Israel built world-class professional leagues in soccer and basketball. Now it's hockey's turn. Sabra HC is operated by the Israel Ice Hockey Federation — not owned by any individual — and exists to grow the sport at every level. Your founding membership creates a professional pathway for Jewish athletes to make aliyah, compete at the highest level, and inspire the next generation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover rounded-xl p-8 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 tracking-wider">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ WHAT YOU GET ════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">FOUNDING MEMBER PERKS</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
              HERE'S WHAT <span className="text-gold-gradient">YOU GET</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every founding member receives the full package — exclusive gear, access, and permanent recognition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card-hover rounded-xl p-7 group text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <b.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2 tracking-wider">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── VIP TRIP GIVEAWAY — FULL SPOTLIGHT ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 max-w-5xl mx-auto relative"
          >
            {/* Outer animated glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, hsla(40,90%,50%,0.3), hsla(130,50%,40%,0.15), hsla(40,90%,50%,0.3))" }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative rounded-3xl overflow-hidden border border-primary/30">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsla(40,90%,50%,0.15)_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,hsla(130,50%,40%,0.08)_0%,transparent_50%)]" />
              {/* Subtle sparkle grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="relative grid grid-cols-1 md:grid-cols-5 items-stretch">
                {/* Left — dramatic visual (2 cols) */}
                <div className="md:col-span-2 relative flex flex-col items-center justify-center py-16 px-8">
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute w-44 h-44 rounded-full border border-dashed border-primary/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-56 h-56 rounded-full border border-dashed border-primary/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Icon with pulsing glow */}
                  <motion.div
                    animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-4 ring-primary/20 shadow-[0_0_60px_hsla(40,90%,50%,0.3)]">
                      <Plane className="w-14 h-14 text-primary drop-shadow-lg" />
                    </div>
                  </motion.div>

                  <motion.p
                    className="font-display text-2xl md:text-3xl text-gold-gradient mt-8 text-center"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✦ GRAND PRIZE ✦
                  </motion.p>
                  <p className="font-heading text-xs tracking-[0.3em] text-primary/70 mt-2">EVERY FOUNDER IS ENTERED</p>
                </div>

                {/* Right — content (3 cols) */}
                <div className="md:col-span-3 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
                  <p className="font-heading text-xs tracking-[0.4em] text-primary font-semibold mb-3">EXCLUSIVE FOUNDING MEMBER GIVEAWAY</p>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[0.9] mb-6">
                    WIN A VIP TRIP<br />
                    <span className="text-gold-gradient">FOR TWO TO ISRAEL</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                    Every founding member is <span className="text-foreground font-semibold">automatically entered</span> to win the ultimate hockey experience — an all-expenses-paid trip for two to Israel to watch Sabra HC play live.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: Plane, text: "Round-trip flights for two" },
                      { icon: Star, text: "Luxury hotel stay" },
                      { icon: Trophy, text: "VIP behind-the-bench seats" },
                      { icon: Users, text: "Private player meet & greets" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 bg-primary/5 border border-primary/15 rounded-lg px-4 py-3">
                        <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground/90 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/25">
                    <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
                    <p className="text-sm font-heading tracking-wider text-foreground">
                      INCLUDED FREE WITH EVERY <span className="text-primary font-bold">$600</span> FOUNDING MEMBERSHIP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ SOCIAL PROOF / URGENCY ════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-heading text-sm tracking-[0.4em] mb-4 font-semibold">WHY NOW?</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6 leading-tight">
                THE WINDOW IS
                <br />
                <span className="text-gold-gradient">CLOSING</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  The founding membership is capped at <span className="text-foreground font-semibold">500 members per year</span>. Once every spot for the season is taken, registration closes and the VIP Israel trip raffle is drawn. Don't wait — spots fill fast and you don't want to miss this year's draw.
                </p>
                <p>
                  Your annual membership funds a fully professional operation — paid players, full-time coaching staff, international travel, and youth development across Israel. The club is federation-operated, meaning every dollar goes into growing the sport, not lining anyone's pockets.
                </p>
                <p>
                  The first season is being built right now. The roster of professional players is forming. The arena is booked. The jerseys are being produced. Every founding member who joins today is part of the foundation that makes this real.
                </p>
                <p className="text-foreground font-medium text-lg">
                  This is your chance to be part of something that has never existed before.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: 500, label: "TOTAL SPOTS", suffix: "" },
                { value: spotsLeft, label: "REMAINING", suffix: "" },
                { value: CAMPAIGN.currentMembers, label: "FOUNDERS JOINED", suffix: "" },
                { value: 1, label: "FIRST PRO CLUB", suffix: "st" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    className="text-3xl md:text-4xl font-heading font-bold text-gold-gradient block"
                  />
                  <p className="text-[10px] text-muted-foreground tracking-widest mt-2 font-heading">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ PRICING CTA ════════ */}
      <section id="join" className="py-24 md:py-36 relative overflow-hidden">
        <IceParticles count={20} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.08)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
              JOIN THE <span className="text-gold-gradient">FOUNDERS</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Annual membership. Professional hockey. Permanent legacy.
            </p>
          </motion.div>

          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-[2px] bg-gradient-to-b from-primary/50 via-primary/15 to-primary/50 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

              <div className="relative glass-card rounded-2xl p-10 md:p-12">
                <div className="text-center mb-10">
                  <p className="font-display text-7xl md:text-8xl text-gold-gradient">${CAMPAIGN.membershipPrice}</p>
                  <p className="text-muted-foreground text-sm mt-3">Annual founding membership</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    or {CAMPAIGN.installmentCount} easy payments of ${CAMPAIGN.installmentPrice}/year
                  </p>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Founders Edition jersey (never sold again)",
                    "Exclusive merch pack (scarf, hat, pin)",
                    "Digital season ticket — all games, all replays",
                    "20% lifetime merchandise discount",
                    "VIP Israel trip giveaway entry",
                    "Name on the Founders Wall — forever",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button className="w-full py-5 rounded-xl font-heading text-base font-bold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow">
                    PAY ${CAMPAIGN.membershipPrice}/YEAR — JOIN NOW
                  </button>
                  <button className="w-full py-5 rounded-xl font-heading text-sm font-semibold tracking-wider border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all">
                    PAY {CAMPAIGN.installmentCount}× ${CAMPAIGN.installmentPrice}/YEAR — INSTALLMENTS
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              Only <span className="text-primary font-bold">{spotsLeft}</span> of {CAMPAIGN.goalMembers} founding spots remaining.
              <br />
              <span className="text-xs">This program will never reopen once all spots are claimed.</span>
            </motion.p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ FAQ ════════ */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              FREQUENTLY <span className="text-gold-gradient">ASKED</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full glass-card rounded-xl p-5 text-left flex items-center justify-between gap-4 hover:border-primary/30 transition-colors"
                >
                  <span className="font-heading text-sm tracking-wider text-foreground">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pt-2 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FINAL PUSH ════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={logoImg}
              alt="Sabra HC"
              className="w-20 h-20 object-contain mx-auto mb-6 opacity-50"
            />
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
              Born in the Desert
              <br />
              <span className="text-gold-gradient">Built by the Founders</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
              500 people will be remembered forever as the ones who made professional hockey in Israel a reality. Will you be one of them?
            </p>
            <a
              href="#join"
              className="inline-block px-14 py-5 font-heading text-base font-bold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              BECOME A FOUNDER
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Founders;
