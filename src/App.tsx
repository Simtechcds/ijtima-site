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
import Archive from "./pages/Archive";
import Event from "./pages/Event";
import CollectionDetail from "./pages/CollectionDetail";
import AudioList from "./pages/AudioList";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StickyLivePill from "./components/media/StickyLivePill";
import BackgroundImagePanel from "./components/media/BackgroundImagePanel";
import StatisticsSection from "./components/sections/StatisticsSection";

const queryClient = new QueryClient();

const RoutedApp = () => {
  const location = useLocation();
  const isSouthAfrica = location.pathname === "/south-africa";
  const saStats = [
    { value: 24, label: "National", bg: "stat-sage" },
    { value: 75, label: "Regional", bg: "stat-saffron" },
    { value: 23, label: "Old Workers", bg: "stat-oxidized" },
    { value: 122, label: "Total", bg: "stat-harbor" },
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
          <Route path="/archive" element={<Archive />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
          <Route path="/audio" element={<AudioList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <StatisticsSection title={isSouthAfrica ? "SA Ijtima Overview" : undefined} stats={isSouthAfrica ? saStats : undefined} />
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
