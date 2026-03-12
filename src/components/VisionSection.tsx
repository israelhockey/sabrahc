import { motion } from "framer-motion";
import { Globe, Trophy, Users, MapPin } from "lucide-react";

const features = [
  { icon: Globe, title: "International Competition", desc: "Compete against professional teams from Romania, Hungary, and across Europe." },
  { icon: Trophy, title: "INHL League Play", desc: "Compete in Israel's top domestic hockey league alongside international fixtures." },
  { icon: Users, title: "Player Development", desc: "Provide Israeli players the opportunity to develop at a professional level." },
  { icon: MapPin, title: "20+ Home Games", desc: "Host a minimum of 20 international home games each season in Jerusalem." },
];

const VisionSection = () => (
  <section id="vision" className="py-24 md:py-32 bg-ice-texture">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">THE VISION</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 text-foreground">
          Building the Future of Israeli Hockey
        </h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>Jerusalem HC is being created to bring Israeli hockey to the next level.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors group"
          >
            <f.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VisionSection;
