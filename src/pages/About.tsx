import Seo from "@/components/Seo";

const About = () => {
  return (
    <main className="space-y-6">
      <Seo title="About — IJTIMA Collection" description="What this site is about and how to explore it." />
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">About IJTIMA Collection</h1>
        <p>A concise hub for upcoming events, live audio, and curated archives. Built mobile-first with accessible controls.</p>
        <blockquote className="border-l-2 border-border pl-3 text-muted-foreground">
          <p>“Dates may change — refer to organisers.”</p>
        </blockquote>
        <blockquote className="border-l-2 border-border pl-3 text-muted-foreground">
          <p>“Focus on what matters: gatherings, guidance, and beneficial content.”</p>
        </blockquote>
        <p>
          Explore the <a href="/archive" className="underline">Archive</a> and check our <a href="#" className="underline">Stats</a> panel for trends.
        </p>
      </section>
      <div className="grid grid-cols-3 gap-2">
        <img src="/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png" alt="IJTIMA logo" className="rounded-md" />
        <img src="/lovable-uploads/79e43d92-6f74-4853-9fb4-6100a86bc227.png" alt="IJTIMA banner" className="rounded-md col-span-2" />
      </div>
    </main>
  );
};

export default About;
