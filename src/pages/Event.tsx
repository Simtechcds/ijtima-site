import Seo from "@/components/Seo";
import { useParams, useNavigate } from "react-router-dom";
import { mockEvents } from "@/data/mock";
import { Button } from "@/components/ui/button";

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ev = mockEvents.find((e) => e.id === id);
  if (!ev) return <div>Event not found.</div>;

  return (
    <main className="space-y-6">
      <Seo title={`${ev.title} — Event`} description={`${ev.city} • ${ev.dateLabel}`} />

      <div>
        <Button size="sm" variant="ghost" onClick={() => {
          if (window.history.length > 1) navigate(-1);
          else window.location.href = `/#ev-${ev.id}`;
        }}>
          ← Back to Upcoming
        </Button>
      </div>

      <header className="glass-surface p-4">
        <h1 className="text-xl font-bold">{ev.title}</h1>
        <p className="text-sm text-muted-foreground">{ev.city} • {ev.dateLabel}</p>
        <div className="mt-3 flex items-center gap-2">
          <a href={ev.calendarUrl} target="_blank" rel="noreferrer"><Button size="sm">Add to Calendar</Button></a>
          <a href={ev.venue_map_link} target="_blank" rel="noreferrer"><Button size="sm" variant="secondary">Directions</Button></a>
          <Button size="sm" variant="outline" onClick={() => navigator.share?.({ title: ev.title, url: window.location.href })}>Share</Button>
          <span className={`pill px-2 py-1 text-xs font-semibold ${ev.status === 'TBC' ? 'badge-tbc' : 'bg-accent text-accent-foreground'}`}>{ev.status === 'TBC' ? 'TBC' : 'Confirmed'}</span>
        </div>
      </header>

      <section className="glass-surface p-4">
        <h2 className="font-semibold mb-2">Schedule</h2>
        <div className="bg-secondary rounded-md p-3 text-sm">Schedule PDF / details (lazy-loaded)</div>
      </section>

      <section className="glass-surface p-4">
        <h2 className="font-semibold mb-2">Notes</h2>
        <p className="text-sm text-muted-foreground">Short notes and guidance for attendees.</p>
      </section>

      <footer className="text-sm text-muted-foreground">Contact / organisers details here.</footer>
    </main>
  );
};

export default Event;
