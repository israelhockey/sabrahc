import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Camera, Radio, Play, Image as ImageIcon } from "lucide-react";
import arenaImg from "@/assets/arena-hero.jpg";
import jerseysImg from "@/assets/jhc-jerseys.png";
import logoImg from "@/assets/jhc-logo.png";
import puckImg from "@/assets/puck-ice.jpg";

const gallery = [
  { src: arenaImg, alt: "Canada Centre Arena", caption: "Home ice at the Canada Centre" },
  { src: jerseysImg, alt: "JHC Jerseys", caption: "Official 2025-26 jerseys" },
  { src: logoImg, alt: "JHC Crest", caption: "The Lion of Jerusalem crest" },
  { src: puckImg, alt: "Hockey puck on ice", caption: "Game day atmosphere" },
];

const broadcasts = [
  { title: "Live Game Streams", desc: "All home and away games streamed live to founding members worldwide.", icon: Play },
  { title: "JHC Radio", desc: "Game commentary, player interviews, and weekly analysis podcast.", icon: Radio },
  { title: "Press Room", desc: "Official press releases, media kits, and accreditation requests.", icon: Camera },
];

const Media = () => (
  <>
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_49%_54%_/_0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Media</span>
        </div>
        <div className="flex items-center gap-4">
          <Camera className="w-8 h-8 text-primary" />
          <h1 className="font-display text-5xl md:text-7xl text-foreground">MEDIA CENTER</h1>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Photos, broadcasts, and press materials from Jerusalem Hockey Club.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>

    {/* Gallery */}
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="flex items-center gap-3 mb-10">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="font-display text-3xl text-foreground">PHOTO GALLERY</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-sm border border-border"
            >
              <img src={img.src} alt={img.alt} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-sm text-foreground font-heading tracking-wider">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Broadcast */}
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-2">BROADCAST</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            WATCH & <span className="text-gold-gradient">LISTEN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {broadcasts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-sm p-8 text-center"
            >
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-base tracking-wider text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Media;
