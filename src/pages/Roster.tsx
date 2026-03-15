import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ChevronRight } from "lucide-react";

const Roster = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Roster</span>
        </div>
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">TEAM ROSTER</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Meet the players representing Sabra HC in the 2025–26 season.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    <section className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center py-16"
        >
          <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center mb-8">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">TBA</h2>
          <p className="text-muted-foreground max-w-md text-lg">
            The 2025–26 roster will be announced soon. Stay tuned for player signings and team announcements.
          </p>
          <span className="inline-block mt-8 px-5 py-2 text-xs font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
            COMING SOON
          </span>
        </motion.div>
      </div>
    </section>
  </>
);

export default Roster;
