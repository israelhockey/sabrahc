import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import puckImg from "@/assets/puck-ice.jpg";

const stats = [
  { value: 1992, suffix: "", label: "HOCKEY IN ISRAEL SINCE" },
  { value: 20, suffix: "+", label: "HOME GAMES PER SEASON" },
  { value: 6, suffix: "", label: "EUROPEAN NATIONS" },
];

const VisionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src={puckImg}
          alt="Hockey puck on ice"
          className="w-full h-full object-cover"
          style={{ scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <p className="text-primary font-semibold text-sm tracking-[0.4em] mb-4">THE VISION</p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Building The Future
              <br />
              <span className="text-gold-gradient">Of Israeli Hockey</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="py-20 md:py-28">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="text-foreground text-xl md:text-2xl font-medium leading-relaxed">
                  Sabra HC is being created to bring Israeli hockey to the next level — from grassroots passion to international competition.
                </p>
                <p>
                  For nearly 40 years, hockey has been growing in Israel through local leagues and national teams. Now, Sabra HC will become the first full-time professional hockey club based in Israel — just as Israel has built world-class leagues in soccer and basketball, it's time for hockey to take the same leap.
                </p>
                <p>
                  Sabra HC is more than a team — it's a pathway. For Jewish hockey players around the world, this club offers a chance to make aliyah and compete at the professional level in Israel. It's the opportunity to build a life in Israel while pursuing the sport they love at the highest level.
                </p>
                <p>
                  The club will compete against professional teams from Romania, Hungary, and across Europe while also playing in Israel's top domestic league, the INHL — representing Israel on the international stage.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 gap-6"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="glass-card-hover rounded-xl p-8 text-center"
                >
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    className="text-5xl md:text-6xl font-heading font-bold text-gold-gradient block"
                    duration={1.5 + i * 0.3}
                    formatNumber={s.value < 1000}
                  />
                  <p className="text-sm text-muted-foreground tracking-widest mt-3 font-heading">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default VisionSection;
