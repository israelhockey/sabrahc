import { motion } from "framer-motion";
import { CAMPAIGN } from "@/lib/campaign";
import { Check, ShieldCheck } from "lucide-react";

const benefits = [
  "Official Founders Edition Jerusalem HC jersey",
  "Founders merchandise pack (scarf, hat, pin)",
  "Digital season ticket access to all broadcasts and replays",
  "Exclusive behind-the-scenes team content",
  "Entry into VIP trip giveaway to Jerusalem",
  "20% discount on team merchandise",
  "Name permanently displayed on the Jerusalem HC Founders Wall",
];

const MembershipSection = () => (
  <section id="membership" className="py-24 md:py-32 bg-navy-dark relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(40,49%,54%,0.04)_0%,transparent_60%)] pointer-events-none" />

    <div className="container px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">FOUNDING MEMBERSHIP</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          Become a Founding Member
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
          className="rounded-xl gold-border-glow bg-card/80 backdrop-blur-sm p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-5xl font-heading font-bold text-gold-gradient">${CAMPAIGN.membershipPrice}</p>
            <p className="text-muted-foreground text-sm mt-1">One-time contribution</p>
            <p className="text-muted-foreground text-xs mt-1">
              or {CAMPAIGN.installmentCount} payments of ${CAMPAIGN.installmentPrice}
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>

          {/* Payment buttons */}
          <div className="space-y-3">
            <button className="w-full py-4 rounded-lg font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow">
              Pay ${CAMPAIGN.membershipPrice} — One Time
            </button>
            <button className="w-full py-4 rounded-lg font-heading text-sm font-semibold tracking-wider border border-primary/40 text-foreground hover:bg-primary/10 transition-all">
              Pay {CAMPAIGN.installmentCount}x ${CAMPAIGN.installmentPrice} — Installments
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MembershipSection;
