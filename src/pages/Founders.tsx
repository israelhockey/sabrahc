import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Crown, Trophy, Check, ShieldCheck } from "lucide-react";
import { FOUNDING_MEMBERS, CAMPAIGN } from "@/lib/campaign";
import AnimatedCounter from "@/components/AnimatedCounter";

const benefits = [
  "Official Founders Edition Jerusalem HC jersey",
  "Founders merchandise pack (scarf, hat, pin)",
  "Digital season ticket access to all broadcasts and replays",
  "Exclusive behind-the-scenes team content",
  "Entry into VIP trip giveaway to Jerusalem",
  "20% discount on team merchandise",
  "Name permanently displayed on the Founders Wall",
];

const Founders = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Founders</span>
        </div>
        <div className="flex items-center gap-4">
          <Crown className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">FOUNDERS WALL</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          The people making history — be one of the first {CAMPAIGN.goalMembers} founding members.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    {/* Progress */}
    <section className="py-12">
      <div className="container">
        <div className="glass-card rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-primary font-heading tracking-wider mb-1">FOUNDING MEMBERS</p>
            <div className="flex items-baseline gap-2">
              <AnimatedCounter target={CAMPAIGN.currentMembers} className="font-display text-5xl text-gold-gradient" />
              <span className="text-muted-foreground text-lg">/ {CAMPAIGN.goalMembers}</span>
            </div>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(CAMPAIGN.currentMembers / CAMPAIGN.goalMembers) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold-dark via-primary to-gold-light rounded-full"
              />
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-primary font-heading tracking-wider mb-1">RAISED</p>
            <p className="font-display text-3xl text-foreground">
              ${CAMPAIGN.raisedAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Wall */}
    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {FOUNDING_MEMBERS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="glass-card rounded-sm p-4 text-center hover:border-primary/30 transition-colors"
            >
              <p className="text-xs font-display text-primary">#{String(m.id).padStart(3, "0")}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">{m.name}</p>
            </motion.div>
          ))}

          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={`empty-${i}`}
              className="p-4 rounded-sm border border-dashed border-border/50 text-center opacity-50 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <p className="text-xs font-display text-primary/60">YOUR NAME?</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Join CTA */}
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/40 via-primary/10 to-primary/40 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative glass-card rounded-sm p-8 md:p-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="font-display text-2xl text-foreground">FOUNDING MEMBERSHIP</h3>
              </div>

              <div className="text-center mb-8">
                <p className="font-display text-6xl text-gold-gradient">${CAMPAIGN.membershipPrice}</p>
                <p className="text-muted-foreground text-sm mt-2">One-time contribution</p>
                <p className="text-muted-foreground text-xs mt-1">
                  or {CAMPAIGN.installmentCount} payments of ${CAMPAIGN.installmentPrice}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow clip-angle-right">
                BECOME A FOUNDER — ${CAMPAIGN.membershipPrice}
              </button>

              <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Founders;
