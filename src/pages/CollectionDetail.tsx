import Seo from "@/components/Seo";
import { useParams } from "react-router-dom";
import { mockCollections } from "@/data/mock";
import { useState } from "react";

const CollectionDetail = () => {
  const { id } = useParams();
  const col = mockCollections.find((c) => c.id === id);
  const [year, setYear] = useState<number | "all">("all");
  if (!col) return <div>Collection not found.</div>;

  return (
    <main className="space-y-6">
      <Seo title={`${col.title} — Collection`} description={col.description} />
      <header className="glass-surface p-4">
        <h1 className="text-xl font-bold">{col.title}</h1>
        <p className="text-sm text-muted-foreground">{col.description}</p>
      </header>

      <div className="flex items-center gap-2">
        <label className="text-sm">Year</label>
        <select className="bg-secondary rounded-md p-2" value={year as any} onChange={(e) => setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
          <option value="all">All</option>
          {col.years?.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <section className="glass-surface p-4">
        <h2 className="font-semibold mb-2">Playlists & Videos</h2>
        {col.youtube_playlist_url ? (
          <iframe className="w-full aspect-video rounded-md" loading="lazy" src={col.youtube_playlist_url} title={`${col.title} playlist`} />
        ) : (
          <div className="text-sm text-muted-foreground">No playlist available.</div>
        )}
      </section>
    </main>
  );
};

export default CollectionDetail;
