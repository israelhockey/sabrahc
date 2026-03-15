import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import logoImg from "@/assets/sabra-logo.png";
import arenaImg from "@/assets/arena-hero.jpg";
import IceParticles from "./IceParticles";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={arenaImg} alt="" className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      <IceParticles count={50} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,hsla(40,49%,54%,0.15)_0%,transparent_70%)] pointer-events-none" />

      <motion.div className="container relative z-10 text-center px-4" style={{ y: textY, opacity }}>
        <motion.img
          src={logoImg}
          alt="Sabra HC Lion Crest"
          className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain mx-auto mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.h1
          className="font-logo text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-gold-gradient">SABRA</span>
          <br />
          <span className="text-stroke text-6xl md:text-7xl lg:text-8xl font-heading">HOCKEY CLUB</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6"
        >
          <div className="inline-block px-6 py-2 border border-primary/30 rounded-full">
            <p className="text-sm md:text-base font-medium text-primary tracking-[0.3em]">
              ISRAEL'S FIRST PROFESSIONAL HOCKEY CLUB
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <a
            href="#story"
            className="px-10 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all gold-glow"
          >
            Discover Our Story
          </a>
          <a
            href="#identity"
            className="px-10 py-4 font-heading text-sm md:text-base font-semibold tracking-wider rounded-full border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
          >
            Meet The Team
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground tracking-widest">SCROLL</span>
          <ChevronDown className="text-primary" size={24} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
