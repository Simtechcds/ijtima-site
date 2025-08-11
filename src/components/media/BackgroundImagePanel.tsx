import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

/*
  BackgroundImagePanel
  - Renders a fixed page-wide background image behind all content
  - Opens a sheet on double-click (in empty spaces) to upload your own image
  - Persists selection in localStorage
*/

const DEFAULT_BG = "/lovable-uploads/7f65651d-1f21-455c-821d-6264bcd8f61d.png"; // user-provided image
const LS_KEY = "ijtima:bg";

const BackgroundImagePanel = () => {
  const [open, setOpen] = useState(false);
  const [bg, setBg] = useState<string | null>(null);

  // Load saved bg once on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setBg(saved);
  }, []);

  // Listen for the custom open event (triggered by double-click in main container)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("bgpanel:open", onOpen as EventListener);
    return () => window.removeEventListener("bgpanel:open", onOpen as EventListener);
  }, []);

  const effectiveBg = useMemo(() => bg || DEFAULT_BG, [bg]);

  const handleFilePick = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      if (dataUrl) {
        setBg(dataUrl);
        try { localStorage.setItem(LS_KEY, dataUrl); } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setBg(null);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  return (
    <>
      {/* Fixed background layer behind everything */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--background) / 0.35), hsl(var(--background) / 0.6)), url(${effectiveBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Control sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-auto">
          <SheetHeader>
            <SheetTitle>Background Image</SheetTitle>
            <SheetDescription>
              Double-click empty space to open this panel. Choose a custom image or reset to default.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="bg-file" className="text-sm text-muted-foreground">Upload image (JPG/PNG)</label>
              <input
                id="bg-file"
                type="file"
                accept="image/*"
                onChange={(e) => handleFilePick(e.target.files?.[0])}
                className="file:mr-3 file:rounded-md file:border file:border-border file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium"
              />
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={handleReset}>Reset to default</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="text-sm text-muted-foreground">Preview</div>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl hairline">
                <img
                  src={effectiveBg}
                  alt="Background preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BackgroundImagePanel;
