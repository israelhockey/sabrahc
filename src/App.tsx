import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Player from "./pages/Player";
import Season from "./pages/Season";
import Schedule from "./pages/Schedule";
import GameDetail from "./pages/GameDetail";
import Tickets from "./pages/Tickets";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Club from "./pages/Club";
import Partners from "./pages/Partners";
import Pride from "./pages/Pride";
import Invest from "./pages/Invest";
import Contact from "./pages/Contact";
import Host from "./pages/Host";
import Stats from "./pages/Stats";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<Player />} />
            <Route path="/season" element={<Season />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/club" element={<Club />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/pride" element={<Pride />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/host" element={<Host />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/bring-us" element={<Navigate to="/host" replace />} />

            {/* Old URLs from the previous site */}
            <Route path="/tour" element={<Navigate to="/season" replace />} />
            <Route path="/roster" element={<Navigate to="/team" replace />} />
            <Route path="/about" element={<Navigate to="/club" replace />} />
            <Route path="/founders" element={<Navigate to="/pride" replace />} />
            <Route path="/fans" element={<Navigate to="/tickets" replace />} />
            <Route path="/media" element={<Navigate to="/news" replace />} />
            <Route path="/deck" element={<Navigate to="/invest" replace />} />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
