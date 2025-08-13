import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SouthAfrica from "./pages/SouthAfrica";
import International from "./pages/International";
import Live from "./pages/Live";
import About from "./pages/About";
import Search from "./pages/Search";
import Event from "./pages/Event";
import CollectionDetail from "./pages/CollectionDetail";
import AudioList from "./pages/AudioList";
import Views from "./pages/Views";
import Stats from "./pages/Stats";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StickyLivePill from "./components/media/StickyLivePill";
import BackgroundImagePanel from "./components/media/BackgroundImagePanel";
import StatisticsSection from "./components/sections/StatisticsSection";

const queryClient = new QueryClient();

const RoutedApp = () => {
  const location = useLocation();
  const isSouthAfrica = location.pathname === "/south-africa";
  const isInternational = location.pathname === "/international";
  const isViews = location.pathname === "/views";
  const saStats = [
    { value: 24, label: "National", bg: "stat-sage" },
    { value: 75, label: "Regional", bg: "stat-saffron" },
    { value: 23, label: "Old Workers", bg: "stat-oxidized" },
    { value: 122, label: "Total", bg: "stat-harbor" },
  ];
  const intlStats = [
    { value: 14, label: "Raiwind", bg: "stat-sage" },
    { value: 7, label: "India", bg: "stat-saffron" },
    { value: 1, label: "Tongi", bg: "stat-oxidized" },
    { value: 9, label: "Global", bg: "stat-harbor" },
  ];

  return (
    <>
      <BackgroundImagePanel />
      <Header />
      <div
        className="min-h-[calc(100vh-160px)] container py-6 pb-32 md:pb-12"
        onDoubleClick={() => window.dispatchEvent(new CustomEvent("bgpanel:open"))}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/south-africa" element={<SouthAfrica />} />
          <Route path="/international" element={<International />} />
          <Route path="/live" element={<Live />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
          <Route path="/audio" element={<AudioList />} />
          <Route path="/views" element={<Views />} />
          <Route path="/stats" element={<Stats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isViews && (
        <StatisticsSection
          title={isSouthAfrica ? "SA Ijtima Overview" : isInternational ? "Global Ijtima Overview" : undefined}
          stats={isSouthAfrica ? saStats : isInternational ? intlStats : undefined}
          description={isInternational ? "Connecting Generations Through Ijtimas Around the World." : undefined}
        />
      )}
      <Footer />
      <StickyLivePill />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoutedApp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
