import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const majorSections = [
  { id: "raiwind", title: "Raiwind", desc: "Pakistan — typical dates in Nov.", to: "/collection/raiwind" },
  { id: "tongi", title: "Tongi", desc: "Bangladesh — typical dates Jan/Feb.", to: "#" },
  { id: "nizamuddin", title: "Nizamuddin", desc: "India — overview & links.", to: "#" },
];

const globalSections = [
  { id: "india", title: "India", desc: "Regional programs and links.", to: "#" },
  { id: "uk", title: "UK", desc: "Regional programs and links.", to: "#" },
  { id: "canada", title: "Canada", desc: "Regional programs and links.", to: "#" },
  { id: "other", title: "Other", desc: "Other regions and programs.", to: "#" },
];

const International = () => {
  return (
    <main className="space-y-6">
      <Seo title="International — IJTIMA Collection" description="International hubs and related audios." />

      <header>
        <h1 className="sr-only">International Ijtima Collections</h1>
      </header>

      <div className="mb-4">
        <Link to="/">
          <Button variant="olive" size="smWide">Back to Home</Button>
        </Link>
      </div>

      <Tabs defaultValue="major" className="w-full">
        <TabsList aria-label="International categories">
          <TabsTrigger value="major">Major</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
        </TabsList>

        <TabsContent value="major">
          <section aria-labelledby="major-heading" className="mt-3">
            <h2 id="major-heading" className="sr-only">Major International Ijtimas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {majorSections.map((s) => (
                <Link to={s.to} key={s.id} className="pressable">
                  <article className="glass-surface module-frame p-4 h-full flex items-center gap-3">
                    <img src="/lovable-uploads/3b7a5720-d209-4717-b9cf-19529c55872e.png" alt={`${s.title} emblem`} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="global">
          <section aria-labelledby="global-heading" className="mt-3">
            <h2 id="global-heading" className="sr-only">Global Regions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {globalSections.map((s) => (
                <Link to={s.to} key={s.id} className="pressable">
                  <article className="glass-surface module-frame p-4 h-full flex items-center gap-3">
                    <img src="/lovable-uploads/3b7a5720-d209-4717-b9cf-19529c55872e.png" alt={`${s.title} emblem`} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default International;
