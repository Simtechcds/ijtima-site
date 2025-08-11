import Seo from "@/components/Seo";

const Archive = () => {
  return (
    <main className="space-y-6">
      <Seo title="Archive — IJTIMA Collection" description="Posters, galleries, PDFs with filters by year, region and type." />
      <div className="glass-surface p-4">
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <select className="bg-secondary rounded-md p-2"><option>Year</option><option>2025</option><option>2024</option></select>
          <select className="bg-secondary rounded-md p-2"><option>Region</option><option>SA</option><option>International</option></select>
          <select className="bg-secondary rounded-md p-2"><option>Type</option><option>Posters</option><option>PDFs</option><option>Gallery</option></select>
        </div>
        <div className="text-sm text-muted-foreground">Heavy content appears here. All embeds and images are lazy-loaded.</div>
      </div>
    </main>
  );
};

export default Archive;
