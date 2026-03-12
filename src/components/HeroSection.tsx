import { motion } from "framer-motion";
import { CAMPAIGN } from "@/lib/campaign";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const progressPercent = Math.min((CAMPAIGN.raisedAmount / CAMPAIGN.goalAmount) * 100, 100);
  const memberPercent = Math.min((CAMPAIGN.currentMembers / CAMPAIGN.goalMembers) * 100, 100);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-arena-glow">
      {/* Dramatic arena lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,hsla(200,60%,50%,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-pulse-gold" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse-gold" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container relative z-10 text-center pt-20 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Logo placeholder */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full gold-border-glow flex items-center justify-center mb-8 bg-navy-dark/60">
            <span className="font-heading text-4xl md:text-5xl font-bold text-primary">JHC</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
            <span className="text-gold-gradient">JERUSALEM HC</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-primary mt-2 mb-6 tracking-wide">
            Israel's First Professional Hockey Club
          </p>

          <p className="max-w-xl text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
            Launching the first full-time professional ice hockey team in Israel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="#membership"
              className="px-8 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
            >
              Become a Founding Member
            </a>
            <a
              href="#vision"
              className="px-8 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              Learn About The Project
            </a>
          </div>

          {/* Progress */}
          <div className="w-full max-w-lg space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Campaign Progress</span>
                <span className="text-primary font-semibold">${CAMPAIGN.raisedAmount.toLocaleString()} / ${CAMPAIGN.goalAmount.toLocaleString()}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark via-primary to-gold-light"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-primary">{CAMPAIGN.currentMembers}</p>
                <p className="text-muted-foreground text-xs">Founding Members</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-foreground">{CAMPAIGN.goalMembers}</p>
                <p className="text-muted-foreground text-xs">Members Target</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-foreground">${CAMPAIGN.membershipPrice}</p>
                <p className="text-muted-foreground text-xs">Per Membership</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-muted-foreground" size={28} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
