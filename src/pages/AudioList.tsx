import Seo from "@/components/Seo";
import { mockAudioFeeds } from "@/data/mock";

const AudioList = () => {
  return (
    <main className="space-y-6">
      <Seo title="Audio — IJTIMA Collection" description="List of recent recordings and streams." />
      <ul className="space-y-3">
        {mockAudioFeeds.map((a) => (
          <li key={a.show_id} className="glass-surface p-3 rounded-xl">
            <div className="font-semibold">{a.title}</div>
            <div className="text-sm text-muted-foreground">{a.platform}</div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AudioList;
