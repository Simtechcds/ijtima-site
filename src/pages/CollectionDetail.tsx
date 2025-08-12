import Seo from "@/components/Seo";
import { useParams, Link } from "react-router-dom";
import { mockCollections } from "@/data/mock";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CollectionDetail = () => {
  const { id } = useParams();
  const col = mockCollections.find((c) => c.id === id);
  const [year, setYear] = useState<number | "all">("all");
  if (!col) return <div>Collection not found.</div>;

  return (
    <main className="space-y-6">
      <Seo title={`${col.title} — Collection`} description={col.description} />
      <div className="mb-2">
        <Link to="/">
          <Button variant="olive" size="smWide">Back to Home</Button>
        </Link>
      </div>
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

      {col.id === "old-workers" && (
        <>
          <section className="mt-4">
            <h2 className="font-semibold mb-3">Ijtima History</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">The first ever Ijtema</h3>
                <p className="text-sm text-muted-foreground">November 30, 1941 — Mewat</p>
                <p className="mt-2 text-sm">At Mewat, the first Ijtema was held, drawing 25,000 participants. Many notable ulema also arrived, such as Mufti Kifayatullah and Maulana Ahmad Madani.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Life and Mission of Maulana Ilyas, Page 62)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">The first Ijtema in Karachi</h3>
                <p className="text-sm text-muted-foreground">December 26, 1947 — Karachi</p>
                <p className="mt-2 text-sm">Following the partition of India and Pakistan, Karachi hosted its first Ijtema.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Sawanih Maulana Yusuf, Page 380)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">Raiwind chosen as Pakistan's Markaz</h3>
                <p className="text-sm text-muted-foreground">March 13, 1948 — Pakistan</p>
                <p className="mt-2 text-sm">Following the partition, Maulana Yusuf attended an Ijtema held in Pakistan. It was decided during this Ijtema that Raiwind, Lahore, would be the Markaz of Pakistan.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Sawanih Hadhratji Tsalits, I/106)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">The first Ijtema in Dhaka</h3>
                <p className="text-sm text-muted-foreground">January 11, 1954 — East Pakistan (Dhaka)</p>
                <p className="mt-2 text-sm">The first Ijtema took place in Dhaka (before Bangladesh’s establishment). It was attended by Maulana Yusuf and Maulana Inamul Hassan.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Sawanih Hadrat Maulana Yusuf, Page 385)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">The first Ijtema in Raiwind</h3>
                <p className="text-sm text-muted-foreground">April 10, 1954 — Raiwind</p>
                <p className="mt-2 text-sm">On this date, the first Raiwind Ijtema was carried out.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Sawanih Hadrat Maulana Yusuf, Page 376)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">The first Ijtema in Tongi</h3>
                <p className="text-sm text-muted-foreground">November 1967 — East Pakistan (Tongi)</p>
                <p className="mt-2 text-sm">The first Tongi Ijtema was held before Bangladesh’s formation.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Sawanih Hadhratji Tsalits, II/452)</p>
              </article>

              <article className="glass-surface module-frame p-4">
                <h3 className="font-semibold">First time conducted in two phases</h3>
                <p className="text-sm text-muted-foreground">January 2010 — Tongi/Bishwa Ijtema</p>
                <p className="mt-2 text-sm">Due to the enormous number of attendees, the Tongi/Bishwa Ijtema was organized in two phases for the first time.</p>
                <p className="mt-2 text-xs text-muted-foreground">(Banglapedia — Viswa Ijtema)</p>
              </article>
            </div>
          </section>

          <section className="mt-4">
            <h2 className="font-semibold mb-3">Featured Videos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <article className="glass-surface module-frame p-3">
                <iframe
                  className="w-full aspect-video rounded-md"
                  loading="lazy"
                  src="https://www.youtube.com/embed/pYtzQWoIP6o?start=3"
                  title="Ijtima video 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </article>
              <article className="glass-surface module-frame p-3">
                <iframe
                  className="w-full aspect-video rounded-md"
                  loading="lazy"
                  src="https://www.youtube.com/embed/0vtv1V9e7sQ"
                  title="Ijtima video 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </article>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default CollectionDetail;
