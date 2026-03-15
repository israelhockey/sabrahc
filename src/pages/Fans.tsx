import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Gift, Shirt, Ticket, Star, Users } from "lucide-react";
import { CAMPAIGN } from "@/lib/campaign";
import { Check, ShieldCheck } from "lucide-react";

const perks = [
  { icon: Ticket, title: "Season Tickets", desc: "Priority access to all home games at the One Ice Arena near Netanya." },
  { icon: Shirt, title: "Team Store", desc: "Official jerseys, scarves, hats, and exclusive limited-edition merchandise." },
  { icon: Gift, title: "VIP Experiences", desc: "Meet the players, attend practices, and enjoy premium game-day experiences." },
  { icon: Star, title: "Fan Rewards", desc: "Earn points attending games and engaging online. Redeem for exclusive prizes." },
];

const benefits = [
  "Official Founders Edition Sabra HC jersey",
  "Founders merchandise pack (scarf, hat, pin)",
  "Digital season ticket access to all broadcasts and replays",
  "Exclusive behind-the-scenes team content",
  "Entry into VIP trip giveaway to Israel",
  "20% discount on team merchandise",
  "Name permanently displayed on the Founders Wall",
];

const Fans = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Fan Zone</span>
        </div>
        <div className="flex items-center gap-4">
          <Heart className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">FAN ZONE</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Everything for the Sabra HC faithful. Tickets, merchandise, experiences, and more.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    {/* Fan Perks */}
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">FOR THE FANS</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            YOUR <span className="text-gold-gradient">GAMEDAY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-sm p-6"
            >
              <perk.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-base tracking-wider text-foreground mb-2">{perk.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Membership */}
    <section className="py-20 lg:py-28 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">FOUNDING MEMBERSHIP</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            BECOME A <span className="text-gold-gradient">FOUNDER</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join the first {CAMPAIGN.goalMembers} founding members and help launch Israel's first professional hockey club.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/40 via-primary/10 to-primary/40 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative glass-card rounded-sm p-8 md:p-10">
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

              <div className="space-y-3">
                <button className="w-full py-4 font-heading text-sm font-semibold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow clip-angle-right">
                  PAY ${CAMPAIGN.membershipPrice} — ONE TIME
                </button>
                <button className="w-full py-4 font-heading text-sm font-semibold tracking-wider border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all">
                  PAY {CAMPAIGN.installmentCount}× ${CAMPAIGN.installmentPrice} — INSTALLMENTS
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

    {/* Community */}
    <section className="py-20 lg:py-28">
      <div className="container text-center">
        <Users className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          JOIN THE <span className="text-gold-gradient">PRIDE</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Follow Sabra HC on social media and connect with fellow fans around the world. Use #BornInTheDesert to be featured.
        </p>
        <div className="flex gap-4 justify-center">
          {["Instagram", "Twitter/X", "YouTube", "Facebook"].map((platform) => (
            <button
              key={platform}
              className="px-6 py-3 text-xs font-heading tracking-wider bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
            >
              {platform.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Fans;
