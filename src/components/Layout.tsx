import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteNavbar from "./SiteNavbar";
import SiteFooter from "./SiteFooter";

const Layout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-sand focus:px-4 focus:py-2 focus:text-night">
        Skip to content
      </a>
      <SiteNavbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
