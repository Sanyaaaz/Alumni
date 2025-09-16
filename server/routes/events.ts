import type { RequestHandler } from "express";
import { z } from "zod";

export interface EventRec {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string; // ISO
  end: string; // ISO
}

const events: EventRec[] = [
  {
    id: "e1",
    title: "Alumni Reunion 2025",
    description: "Annual alumni homecoming with keynotes and networking.",
    location: "Main Auditorium, Campus",
    start: new Date(Date.now() + 86400000 * 7).toISOString(),
    end: new Date(Date.now() + 86400000 * 7 + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "e2",
    title: "Tech Webinar: AI in Industry",
    description: "Panel discussion with alumni working in top AI teams.",
    location: "Online (Zoom)",
    start: new Date(Date.now() + 86400000 * 14).toISOString(),
    end: new Date(Date.now() + 86400000 * 14 + 90 * 60 * 1000).toISOString(),
  },
];

const rsvps = new Map<
  string,
  { eventId: string; email: string; name: string }[]
>();

export const listEvents: RequestHandler = (_req, res) => {
  res.json({ items: events });
};

const rsvpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
export const rsvpEvent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const ev = events.find((e) => e.id === id);
  if (!ev) return res.status(404).json({ error: "Event not found" });
  const body = rsvpSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const arr = rsvps.get(id) || [];
  arr.push({ eventId: id, email: body.data.email, name: body.data.name });
  rsvps.set(id, arr);
  res.json({ success: true });
};

export const icsForEvent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const ev = events.find((e) => e.id === id);
  if (!ev) return res.status(404).json({ error: "Event not found" });
  const dt = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alumni Network//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${id}@alumni.local`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dt(ev.start)}`,
    `DTEND:${dt(ev.end)}`,
    `SUMMARY:${escapeText(ev.title)}`,
    `DESCRIPTION:${escapeText(ev.description)}`,
    `LOCATION:${escapeText(ev.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename=event-${id}.ics`);
  res.send(ics);
};

function escapeText(text: string) {
  return text.replace(
    /[\\;,\n]/g,
    (m) => ({ "\\": "\\\\", ";": "\\;", ",": "\\,", "\n": "\\n" })[m]!,
  );
}
