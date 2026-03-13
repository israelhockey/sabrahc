import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteNavbar from "./SiteNavbar";
import SiteFooter from "./SiteFooter";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
