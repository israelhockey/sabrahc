import { useState } from "react";
import { motion } from "framer-motion";
import { submitSignup } from "@/lib/signup";
import { Mail, ArrowRight, Check } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await submitSignup({ email, source: "newsletter" });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Newsletter signup error:", err);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_49%_54%_/_0.06)_0%,transparent_60%)]" />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-center"
      />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              STAY IN THE <span className="text-gold-gradient">GAME</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get the latest news, roster updates, and exclusive content delivered straight to your inbox.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check size={16} className="text-primary" />
              </div>
              <p className="text-foreground font-heading tracking-wider text-sm">
                YOU'RE ON THE LIST. WELCOME TO THE TEAM.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground placeholder:text-muted-foreground/50 text-sm font-heading tracking-wider focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-heading text-sm tracking-widest rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
              >
                SUBSCRIBE
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs text-muted-foreground/40 mt-5"
          >
            No spam. Unsubscribe anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
