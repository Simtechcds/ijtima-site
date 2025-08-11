import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const Live = () => {
  return (
    <main className="space-y-6">
      <Seo title="Live — IJTIMA Collection" description="Live stream player for events and programs." />
      <div className="glass-surface p-4">
        <div className="aspect-video w-full bg-secondary rounded-md grid place-items-center mb-4">Live Stream Embed</div>
        <div className="flex items-center justify-end">
          <Button variant="secondary">Continue in background</Button>
        </div>
      </div>
    </main>
  );
};

export default Live;
