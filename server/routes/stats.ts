import type { RequestHandler } from "express";

export const stats: RequestHandler = (_req, res) => {
  // Example dynamic stats; replace with DB in production
  const data = {
    alumni: 12543,
    mentors: 842,
    eventsHosted: 312,
    donations: 1789,
  };
  res.json(data);
};
