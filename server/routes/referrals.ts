import type { RequestHandler } from "express";
import { z } from "zod";

interface ReferralOffer { id: string; alumni: string; company: string; role: string; model: "free" | "paid" | "reward"; notes?: string; }

const offers: ReferralOffer[] = [
  { id: "r1", alumni: "Aarav Sharma", company: "Google", role: "SWE", model: "reward", notes: "Earns points redeemable for events" },
  { id: "r2", alumni: "Neha Singh", company: "Microsoft", role: "SDE", model: "free" },
];

export const listReferrals: RequestHandler = (_req, res) => {
  res.json({ items: offers });
};

const reqSchema = z.object({ student: z.string().min(1), email: z.string().email(), company: z.string().min(1), role: z.string().min(1), message: z.string().min(1) });
const requests: any[] = [];
export const requestReferral: RequestHandler = (req, res) => {
  const body = reqSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.flatten() });
  const obj = { id: String(requests.length + 1), status: "pending", createdAt: new Date().toISOString(), ...body.data };
  requests.push(obj);
  res.json({ request: obj });
};
