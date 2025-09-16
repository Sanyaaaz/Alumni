import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { register, login, me, adminVerify } from "./routes/auth";
import { listAlumni, listFacets } from "./routes/alumni";
import { listEvents, rsvpEvent, icsForEvent } from "./routes/events";
import { listBlogs, createBlog, upvoteBlog } from "./routes/blogs";
import { listSessions, bookSession, createRequest } from "./routes/mentorship";
import { listGroups, listMessages, sendMessage, streamGroup } from "./routes/groups";
import { listReferrals, requestReferral } from "./routes/referrals";
import { stats } from "./routes/stats";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo
  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", me);
  app.post("/api/auth/verify", adminVerify);

  // Alumni
  app.get("/api/alumni", listAlumni);
  app.get("/api/alumni/facets", listFacets);

  // Events
  app.get("/api/events", listEvents);
  app.post("/api/events/:id/rsvp", rsvpEvent);
  app.get("/api/events/:id/ics", icsForEvent);

  // Blogs
  app.get("/api/blogs", listBlogs);
  app.post("/api/blogs", createBlog);
  app.post("/api/blogs/:id/upvote", upvoteBlog);

  // Mentorship
  app.get("/api/mentorship/sessions", listSessions);
  app.post("/api/mentorship/sessions/:id/book", bookSession);
  app.post("/api/mentorship/requests", createRequest);

  // Groups (SSE chat)
  app.get("/api/groups", listGroups);
  app.get("/api/groups/:id/messages", listMessages);
  app.post("/api/groups/:id/messages", sendMessage);
  app.get("/api/groups/:id/stream", streamGroup);

  // Referral Hub
  app.get("/api/referrals", listReferrals);
  app.post("/api/referrals/requests", requestReferral);

  // Stats
  app.get("/api/stats", stats);

  return app;
}
