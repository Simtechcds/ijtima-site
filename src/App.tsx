import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BackgroundImagePanel />
        <Header />
        <div className="min-h-[calc(100vh-160px)] container py-6 pb-28 md:pb-6" onDoubleClick={() => window.dispatchEvent(new CustomEvent("bgpanel:open"))}>
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
        <StatisticsSection />
        <Footer />
        <StickyLivePill />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
