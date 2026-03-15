import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight, Camera, Radio, Play, Image as ImageIcon,
  Video, Tv, Mic, Download, ExternalLink, Film, MonitorPlay
} from "lucide-react";
import arenaImg from "@/assets/arena-hero.jpg";
import jerseysImg from "@/assets/sabra-jerseys.png";
import logoImg from "@/assets/sabra-logo.png";
import puckImg from "@/assets/puck-ice.jpg";
import heroArenaImg from "@/assets/hero-arena.jpg";
import actionImg from "@/assets/hockey-action.jpg";

const mediaTabs = [
  { id: "highlights", label: "HIGHLIGHTS", icon: Film },
  { id: "photos", label: "PHOTOS", icon: Camera },
  { id: "broadcast", label: "BROADCAST", icon: Tv },
  { id: "press", label: "PRESS ROOM", icon: Mic },
] as const;

type TabId = typeof mediaTabs[number]["id"];

const highlightCards = [
  { title: "Season Trailer", tag: "PROMO", duration: "2:30", thumbnail: heroArenaImg },
  { title: "Arena Reveal", tag: "FEATURE", duration: "4:15", thumbnail: arenaImg },
  { title: "Jersey Unveiling", tag: "BEHIND THE SCENES", duration: "3:45", thumbnail: jerseysImg },
  { title: "Training Camp Day 1", tag: "EXCLUSIVE", duration: "6:20", thumbnail: actionImg },
  { title: "Pre-Season Highlights", tag: "HIGHLIGHTS", duration: "5:10", thumbnail: puckImg },
  { title: "Meet the Roster", tag: "FEATURE", duration: "8:00", thumbnail: logoImg },
];

const galleryImages = [
  { src: heroArenaImg, alt: "One Ice Arena exterior", caption: "One Ice Arena — Our Home" },
  { src: arenaImg, alt: "Arena interior", caption: "Game Night Atmosphere" },
  { src: jerseysImg, alt: "Sabra HC Jerseys", caption: "Official 2025–26 Jerseys" },
  { src: actionImg, alt: "Hockey action shot", caption: "On-Ice Action" },
  { src: puckImg, alt: "Puck on ice", caption: "The Beautiful Game" },
  { src: logoImg, alt: "Sabra HC Crest", caption: "The Sabra Lion Crest" },
];

const broadcastItems = [
  {
    icon: MonitorPlay,
    title: "LIVE GAME STREAMS",
    desc: "Every home and away game streamed live in HD. Available to founding members worldwide.",
    badge: "COMING SOON",
  },
  {
    icon: Radio,
    title: "SABRA HC RADIO",
    desc: "Live game commentary, post-game analysis, and weekly player interviews.",
    badge: "COMING SOON",
  },
  {
    icon: Video,
    title: "VIDEO ON DEMAND",
    desc: "Full game replays, condensed games, and curated highlight packages available 24/7.",
    badge: "COMING SOON",
  },
  {
    icon: Mic,
    title: "THE SABRA PODCAST",
    desc: "Deep dives on Israeli hockey culture, locker room stories, and league insider talk.",
    badge: "COMING SOON",
  },
];

const Media = () => {
  const [activeTab, setActiveTab] = useState<TabId>("highlights");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroArenaImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/_0.08)_0%,transparent_50%)]" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary">Media</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-heading text-xs tracking-[0.3em] text-primary mb-3">SABRA HC</p>
            <h1 className="font-display text-6xl md:text-8xl text-foreground leading-[0.9] mb-4">
              MEDIA<br />
              <span className="text-gold-gradient">CENTER</span>
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg">
              Highlights, live broadcasts, photo galleries, and press materials — your all-access pass to Sabra Hockey Club.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {mediaTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-xs font-heading tracking-wider transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "highlights" && (
          <motion.section
            key="highlights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24"
          >
            <div className="container">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl text-foreground">VIDEO HIGHLIGHTS</h2>
                </div>
                <span className="hidden md:inline-block px-4 py-1.5 text-[10px] font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
                  CONTENT COMING SOON
                </span>
              </div>

              {/* Featured Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group mb-6 rounded-sm overflow-hidden border border-border cursor-pointer"
              >
                <img src={heroArenaImg} alt="Featured video" className="w-full h-64 md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="inline-block px-3 py-1 text-[10px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20 mb-3">
                    FEATURED
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl text-foreground mb-1">SABRA HC — SEASON TRAILER</h3>
                  <p className="text-sm text-muted-foreground">Born in the Desert. Built for the Ice. | 2:30</p>
                </div>
              </motion.div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {highlightCards.map((video, i) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative group rounded-sm overflow-hidden border border-border cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-heading tracking-wider text-primary bg-background/80 backdrop-blur-sm border border-primary/20">
                        {video.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-heading text-foreground bg-background/80 backdrop-blur-sm">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-sm tracking-wider text-foreground">{video.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "photos" && (
          <motion.section
            key="photos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24"
          >
            <div className="container">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl text-foreground">PHOTO GALLERY</h2>
                </div>
                <span className="hidden md:inline-block px-4 py-1.5 text-[10px] font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
                  MORE PHOTOS COMING SOON
                </span>
              </div>

              {/* Masonry-style gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={img.alt}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`relative group overflow-hidden rounded-sm border border-border cursor-pointer hover:border-primary/30 transition-all ${
                      i === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        i === 0 ? "h-64 md:h-[480px]" : "h-48 md:h-56"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm text-foreground font-heading tracking-wider">{img.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "broadcast" && (
          <motion.section
            key="broadcast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24"
          >
            <div className="container">
              <div className="text-center mb-14">
                <p className="font-heading text-xs tracking-[0.3em] text-primary mb-3">WATCH & LISTEN</p>
                <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
                  BROADCAST <span className="text-gold-gradient">HUB</span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Live streams, radio, podcasts, and on-demand replays — all launching with the 2025–26 season.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {broadcastItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card-hover rounded-sm p-8 flex gap-5 items-start group hover:border-primary/30 transition-all"
                  >
                    <div className="w-14 h-14 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-sm tracking-wider text-foreground">{item.title}</h3>
                        <span className="px-2 py-0.5 text-[9px] font-heading tracking-wider text-primary bg-primary/10 border border-primary/20">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "press" && (
          <motion.section
            key="press"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24"
          >
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-10">
                <Mic className="w-5 h-5 text-primary" />
                <h2 className="font-display text-3xl md:text-4xl text-foreground">PRESS ROOM</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card-hover rounded-sm p-8 text-center"
                >
                  <Download className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-2">MEDIA KIT</h3>
                  <p className="text-sm text-muted-foreground mb-4">Download logos, brand guidelines, and official assets.</p>
                  <span className="inline-block px-4 py-2 text-[10px] font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
                    COMING SOON
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card-hover rounded-sm p-8 text-center"
                >
                  <ExternalLink className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-sm tracking-wider text-foreground mb-2">PRESS ACCREDITATION</h3>
                  <p className="text-sm text-muted-foreground mb-4">Request media credentials for games and events.</p>
                  <span className="inline-block px-4 py-2 text-[10px] font-heading tracking-widest text-primary border border-primary/20 bg-primary/5">
                    COMING SOON
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-sm p-8 md:p-12 text-center"
              >
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">MEDIA INQUIRIES</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  For press inquiries, interview requests, or media partnerships, reach out to our communications team.
                </p>
                <a
                  href="mailto:media@sabrahc.com"
                  className="inline-block px-8 py-3 text-xs font-heading tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  MEDIA@SABRAHC.COM
                </a>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Media;
