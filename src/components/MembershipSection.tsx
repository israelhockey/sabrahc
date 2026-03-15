import { motion } from "framer-motion";
import { CAMPAIGN } from "@/lib/campaign";
import { Check, ShieldCheck } from "lucide-react";

const benefits = [
  "Official Founders Edition Sabra HC jersey",
  "Founders merchandise pack (scarf, hat, pin)",
  "Digital season ticket access to all broadcasts and replays",
  "Exclusive behind-the-scenes team content",
  "Entry into VIP trip giveaway to Israel",
  "20% discount on team merchandise",
  "Name permanently displayed on the Sabra HC Founders Wall",
];

const MembershipSection = () => (
  <section id="membership" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(40,49%,54%,0.06)_0%,transparent_50%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">FOUNDING MEMBERSHIP</p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          Be Part of <span className="text-gold-gradient">History</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
          We are inviting {CAMPAIGN.goalMembers} founding members to help launch Israel's first professional hockey team.
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl relative group"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/40 via-primary/10 to-primary/40 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          
          <div className="relative glass-card rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-6xl font-heading font-bold text-gold-gradient">${CAMPAIGN.membershipPrice}</p>
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

            <div className="space-y-3">
              <button className="w-full py-4 rounded-xl font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow">
                Pay ${CAMPAIGN.membershipPrice} — One Time
              </button>
              <button className="w-full py-4 rounded-xl font-heading text-sm font-semibold tracking-wider border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all">
                Pay {CAMPAIGN.installmentCount}× ${CAMPAIGN.installmentPrice} — Installments
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MembershipSection;
