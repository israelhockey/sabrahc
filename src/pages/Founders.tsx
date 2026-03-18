import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { submitSignup } from "@/lib/signup";
import {
  Check,
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
  Mail,
  ArrowRight,
} from "lucide-react";
import { CAMPAIGN } from "@/lib/campaign";
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
  { q: "How many founding members will there be?", a: "The founding membership is limited to just 500 members. Once all spots are filled, registration closes. Sign up now to be the first to know when spots open." },
  { q: "Who owns Sabra HC?", a: "No single person owns Sabra HC. The club is operated by the Israel Ice Hockey Federation and exists to grow Israeli hockey at every level. All funds go directly into building the sport — from youth programs to professional competition." },
  { q: "What does my membership support?", a: "Founding membership funds go directly toward club operations — professional player salaries, arena operations, equipment, international travel for competition, coaching staff, and youth development programs across Israel." },
  { q: "I'm a hockey player — can I try out?", a: "Absolutely. Sabra HC fields a fully professional roster and is actively recruiting. If you're a Jewish hockey player interested in making aliyah and playing professionally in Israel, reach out to us directly." },
  { q: "Are all players professionals?", a: "Yes. Sabra HC operates as a fully professional team in every aspect — all players are paid professionals, with full-time coaching staff, professional training facilities, and competitive international schedules." },
];

const Founders = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interest signup state
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) return;
    try {
      await submitSignup({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        source: "founders",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

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
              LIMITED TO {CAMPAIGN.goalMembers} FOUNDING MEMBERS
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-foreground mb-6">
              BE ONE OF THE
              <br />
              <span className="text-gold-gradient">FIRST 500</span>
            </h1>
            <p className="text-primary font-heading text-xs md:text-sm tracking-[0.3em] mb-3 font-semibold">
              "SABRA" — NATIVE ISRAELI
            </p>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-3">
              Sabra HC is Israel's first community-funded professional hockey club — built by the fans, powered by the community. Be among the first 500 founding members to make history and grow Israeli hockey together.
            </p>
            <p className="text-gold-gradient font-heading text-base md:text-xl tracking-[0.15em] italic">
              Born in the Desert. Built for the Ice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-10 px-4"
          >
            <a
              href="#signup"
              className="px-8 sm:px-12 py-4 sm:py-5 font-heading text-sm sm:text-base font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow text-center"
            >
              I'M INTERESTED — SIGN ME UP
            </a>
            <a
              href="#why"
              className="px-8 sm:px-12 py-4 sm:py-5 font-heading text-sm sm:text-base font-semibold tracking-wider rounded-full border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all text-center"
            >
              LEARN MORE
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
              Israel built world-class professional leagues in soccer and basketball. Now it's hockey's turn. Sabra HC is <span className="text-foreground font-semibold">community-funded</span> and operated by the Israel Ice Hockey Federation — not owned by any individual. Every founding member is a stakeholder in growing the sport. Together, we're creating a professional pathway for Jewish athletes to make aliyah, compete at the highest level, and inspire the next generation.
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
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsla(40,90%,50%,0.15)_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,hsla(130,50%,40%,0.08)_0%,transparent_50%)]" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="relative grid grid-cols-1 md:grid-cols-5 items-stretch">
                {/* Left — dramatic visual */}
                <div className="md:col-span-2 relative flex flex-col items-center justify-center py-10 md:py-16 px-6 md:px-8">
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

                {/* Right — content */}
                <div className="md:col-span-3 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center">
                  <p className="font-heading text-xs tracking-[0.4em] text-primary font-semibold mb-3">EXCLUSIVE FOUNDING MEMBER GIVEAWAY</p>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[0.9] mb-6">
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
                      INCLUDED WITH EVERY FOUNDING MEMBERSHIP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════ INTEREST SIGNUP ════════ */}
      <section id="signup" className="py-24 md:py-36 relative overflow-hidden">
        <IceParticles count={20} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(45,90%,50%,0.08)_0%,transparent_50%)] pointer-events-none" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
              INTERESTED IN <span className="text-gold-gradient">JOINING?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Sign up below and we'll send you all the details about becoming one of the first 500 founding members when spots officially open.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 md:p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                  YOU'RE <span className="text-gold-gradient">IN</span>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thanks, {formData.firstName}! We'll be in touch with everything you need to know about becoming a founding member. Keep an eye on your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-[2px] bg-gradient-to-b from-primary/50 via-primary/15 to-primary/50 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

                <div className="relative glass-card rounded-2xl p-10 md:p-12">
                  <div className="text-center mb-8">
                    <p className="font-display text-3xl md:text-4xl text-gold-gradient">Get Early Access</p>
                    <p className="text-muted-foreground text-sm mt-3">
                      Be the first to know when founding memberships open.
                    </p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-4 py-3.5 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground/50 text-sm font-heading tracking-wider focus:outline-none focus:border-primary/50 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-4 py-3.5 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground/50 text-sm font-heading tracking-wider focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground/50 text-sm font-heading tracking-wider focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-5 rounded-xl font-heading text-base font-bold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow flex items-center justify-center gap-2 group"
                    >
                      SIGN ME UP
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <p className="text-xs text-muted-foreground/50 text-center mt-5">
                    No commitment. We'll just send you the details when it's time.
                  </p>
                </div>
              </motion.div>
            )}
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
              href="#signup"
              className="inline-block px-14 py-5 font-heading text-base font-bold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              I'M INTERESTED
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Founders;
