import { useEffect, useState } from "react";

interface EventRec { id: string; title: string; description: string; location: string; start: string; end: string }

export default function Events() {
  const [items, setItems] = useState<EventRec[]>([]);
  const [rsvp, setRsvp] = useState<{ name: string; email: string }>({ name: "", email: "" });
  useEffect(() => { fetch("/api/events").then((r) => r.json()).then((d) => setItems(d.items)); }, []);

  const submit = async (id: string) => {
    if (!rsvp.name || !rsvp.email) return alert("Enter name and email");
    const res = await fetch(`/api/events/${id}/rsvp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rsvp) });
    if (res.ok) alert("RSVP confirmed!");
  };

  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Events</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((e) => (
          <div key={e.id} className="border rounded-xl p-6">
            <div className="font-semibold text-lg">{e.title}</div>
            <div className="text-sm text-muted-foreground">{new Date(e.start).toLocaleString()} • {e.location}</div>
            <p className="mt-2 text-sm">{e.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <input placeholder="Your name" className="border rounded px-3 py-2 text-sm" value={rsvp.name} onChange={(e)=>setRsvp({...rsvp,name:e.target.value})} />
              <input placeholder="Your email" className="border rounded px-3 py-2 text-sm" value={rsvp.email} onChange={(e)=>setRsvp({...rsvp,email:e.target.value})} />
              <button onClick={() => submit(e.id)} className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm">RSVP</button>
              <a className="px-3 py-2 rounded border text-sm" href={`/api/events/${e.id}/ics`}>Add to Calendar</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
