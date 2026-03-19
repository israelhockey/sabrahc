import logoImg from "@/assets/sabra-logo.png";

const Footer = () => (
  <footer className="py-12 border-t border-border/20 bg-navy-dark">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Sabra HC" className="w-8 h-8 object-contain opacity-60" />
          <p className="font-heading tracking-wider text-muted-foreground">
            SABRA <span className="text-primary">HC</span> &copy; {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-sm text-muted-foreground/60">The Flagship Hockey Club in Israel</p>
      </div>
    </div>
  </footer>
);

export default Footer;
