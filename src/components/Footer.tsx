const Footer = () => (
  <footer className="py-8 border-t border-border bg-navy-dark">
    <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="font-heading tracking-wider">
        JERUSALEM <span className="text-primary">HC</span> &copy; {new Date().getFullYear()}
      </p>
      <p>Israel's First Professional Hockey Club</p>
    </div>
  </footer>
);

export default Footer;
