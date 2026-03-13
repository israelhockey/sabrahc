import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Target, Heart, Globe, Trophy, Star, Shield } from "lucide-react";
import logoImg from "@/assets/jhc-logo.png";
import jerseysImg from "@/assets/jhc-jerseys.png";
import puckImg from "@/assets/puck-ice.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";

const values = [
  { icon: Target, title: "Excellence", desc: "Pursuing the highest standards of professional hockey in every aspect of the organization." },
  { icon: Heart, title: "Community", desc: "Building a passionate fanbase and creating a sense of belonging through sport." },
  { icon: Globe, title: "Representation", desc: "Putting Israel on the European hockey map and competing at the highest level." },
  { icon: Star, title: "Development", desc: "Creating pathways for Israeli players to grow and compete professionally." },
];

const timeline = [
  { year: "2024", title: "Vision Born", desc: "The concept for Jerusalem HC is formalized, aiming to create Israel's first professional hockey club." },
  { year: "2025", title: "Club Founded", desc: "Jerusalem HC officially launches with founding membership and brand identity." },
  { year: "2025-26", title: "Inaugural Season", desc: "The team competes in the EIHL and INHL, playing home games at the Canada Centre in Metula." },
  { year: "2026+", title: "Growth & Legacy", desc: "Expansion of youth programs, a dedicated arena, and deeper European competition." },
];

const colors = [
  { name: "Navy Blue", hex: "#0B1F3B", desc: "The Jerusalem night sky" },
  { name: "Gold", hex: "#C8A44D", desc: "The city's golden stone" },
  { name: "White", hex: "#FFFFFF", desc: "The ice we play on" },
];

const About = () => (
  <>
    {/* Hero */}
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">About</span>
        </div>
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">ABOUT THE CLUB</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          The story, mission, and identity of Jerusalem Hockey Club.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    {/* Story */}
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-heading text-sm tracking-[0.3em] mb-4">OUR STORY</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              FROM GRASSROOTS<br />
              <span className="text-gold-gradient">TO GLORY</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-foreground text-lg font-medium">
                Jerusalem HC is being created to bring Israeli hockey to the next level — from grassroots passion to international competition.
              </p>
              <p>
                For nearly 40 years, hockey has been growing in Israel through local leagues and national teams. Now, Jerusalem HC will become the first full-time professional hockey club based in Israel.
              </p>
              <p>
                The club will compete against professional teams from Romania, Hungary, and across Europe while also playing in Israel's top domestic league, the INHL.
              </p>
              <p>
                The goal is to provide Israeli players the opportunity to develop at a high level while representing Israel internationally.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src={puckImg} alt="Hockey on ice" className="w-full rounded-sm border border-border" />
            <div className="absolute -bottom-6 -left-6 glass-card rounded-sm p-6 border border-primary/20">
              <p className="font-display text-3xl text-gold-gradient">40+</p>
              <p className="text-xs text-muted-foreground font-heading tracking-wider">YEARS OF HOCKEY IN ISRAEL</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission & Values */}
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">OUR MISSION</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            WHAT WE <span className="text-gold-gradient">STAND FOR</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            To establish a world-class professional hockey organization that represents Jerusalem and Israel on the international stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-sm p-6 text-center"
            >
              <v.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-base tracking-wider text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">THE JOURNEY</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            CLUB <span className="text-gold-gradient">TIMELINE</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground z-10" />
                {i < timeline.length - 1 && <div className="w-[2px] flex-1 bg-border" />}
              </div>
              <div className="pb-10">
                <p className="font-display text-2xl text-primary">{item.year}</p>
                <h3 className="font-heading text-lg tracking-wider text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Identity */}
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-heading text-sm tracking-[0.3em] mb-4">TEAM IDENTITY</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              THE LION OF <span className="text-gold-gradient">JERUSALEM</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The crest integrates Jerusalem's historic stone walls with a modern professional hockey identity.
              The Lion of Judah stands as a symbol of the city's ancient legacy and the team's fierce competitive spirit.
            </p>

            <h3 className="font-heading text-sm tracking-wider text-foreground mb-4">TEAM COLORS</h3>
            <div className="flex gap-6">
              {colors.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-sm border border-border shadow-lg" style={{ background: c.hex }} />
                  <span className="text-xs text-foreground font-heading tracking-wider">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src={logoImg} alt="Jerusalem HC Crest" className="w-full rounded-sm border border-border p-6 bg-card" />
            <img src={jerseysImg} alt="Jerusalem HC Jerseys" className="w-full rounded-sm border border-border" />
          </motion.div>
        </div>
      </div>
    </section>
  </>
);

export default About;
