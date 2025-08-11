import Seo from "@/components/Seo";
import { mockCollections } from "@/data/mock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SouthAfrica = () => {
  const saCollections = mockCollections.filter((c) => c.region === "SA");
  return (
    <main className="space-y-6">
      <Seo title="South Africa — IJTIMA Collection" description="Local collections including Ijtima and Old Workers." />
      <Tabs defaultValue="Ijtima">
        <div className="mb-4">
          <Link to="/">
            <Button variant="outlineBright" size="smWide">Back to Home</Button>
          </Link>
        </div>
        <TabsList className="segmented w-full">
          <TabsTrigger value="Ijtima" className="seg flex-1">Ijtima</TabsTrigger>
          <TabsTrigger value="Old Workers" className="seg flex-1">Old Workers</TabsTrigger>
        </TabsList>
        <TabsContent value="Ijtima" className="mt-4 grid md:grid-cols-2 gap-4">
          {saCollections.filter(c => c.id !== "old-workers").map((c) => (
            <Link to={`/collection/${c.id}`} key={c.id} className="pressable">
              <article className="glass-surface module-frame p-3">
                <img src={c.cover} alt={`${c.title} cover`} className="w-full h-40 object-cover rounded-md" loading="lazy" />
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </article>
            </Link>
          ))}
        </TabsContent>
        <TabsContent value="Old Workers" className="mt-4 grid md:grid-cols-2 gap-4">
          {saCollections.filter(c => c.id === "old-workers").map((c) => (
            <Link to={`/collection/${c.id}`} key={c.id} className="pressable">
              <article className="glass-surface module-frame p-3">
                <img src={c.cover} alt={`${c.title} cover`} className="w-full h-40 object-cover rounded-md" loading="lazy" />
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </article>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SouthAfrica;
