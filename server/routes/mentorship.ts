import type { RequestHandler } from "express";
import { z } from "zod";

interface SessionSlot {
  id: string;
  mentorName: string;
  topic: string;
  when: string; // ISO
  capacity: number;
  attendees: string[]; // emails
  paid: boolean;
  rewardPoints: number;
}

let sessionCounter = 1;
const sessions: SessionSlot[] = [
  {
    id: String(sessionCounter++),
    mentorName: "Aarav Sharma",
    topic: "Resume Review",
    when: new Date(Date.now() + 3 * 86400000).toISOString(),
    capacity: 5,
    attendees: [],
    paid: false,
    rewardPoints: 10,
  },
  {
    id: String(sessionCounter++),
    mentorName: "Neha Singh",
    topic: "System Design 101",
    when: new Date(Date.now() + 5 * 86400000).toISOString(),
    capacity: 50,
    attendees: [],
    paid: true,
    rewardPoints: 0,
  },
];

export const listSessions: RequestHandler = (_req, res) => {
  res.json({ items: sessions });
};

const bookSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
export const bookSession: RequestHandler = (req, res) => {
  const { id } = req.params;
  const body = bookSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const s = sessions.find((x) => x.id === id);
  if (!s) return res.status(404).json({ error: "Session not found" });
  if (s.attendees.includes(body.data.email))
    return res.status(409).json({ error: "Already booked" });
  if (s.attendees.length >= s.capacity)
    return res.status(409).json({ error: "Session full" });
  s.attendees.push(body.data.email);
  res.json({ success: true });
};

const requestSchema = z.object({
  studentName: z.string().min(1),
  studentEmail: z.string().email(),
  topic: z.string().min(1),
  preferredTime: z.string().min(1),
  mode: z.enum(["free", "paid", "reward"]),
});

const requests: any[] = [];
export const createRequest: RequestHandler = (req, res) => {
  const body = requestSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const reqObj = {
    id: String(requests.length + 1),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...body.data,
  };
  requests.push(reqObj);
  res.json({ request: reqObj });
};
