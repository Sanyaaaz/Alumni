import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

export type Role = "alumni" | "student" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  verified: boolean;
  collegeEmail?: string;
  verificationDocs?: { kind: "degree" | "marksheet"; filename: string }[];
}

const users = new Map<string, User>();
let userCounter = 1;

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const tokenFor = (user: User) =>
  jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["alumni", "student", "admin"]).default("student"),
  collegeEmail: z.string().email().optional(),
});

export const register: RequestHandler = (req, res) => {
  const body = registerSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const { name, email, password, role, collegeEmail } = body.data;
  const duplicate = Array.from(users.values()).find((u) => u.email === email);
  if (duplicate) return res.status(409).json({ error: "Email already exists" });
  const id = String(userCounter++);
  const passwordHash = bcrypt.hashSync(password, 10);
  const user: User = {
    id,
    name,
    email,
    passwordHash,
    role,
    verified: role === "admin",
    collegeEmail,
  };
  users.set(id, user);
  const token = tokenFor(user);
  res.json({ token, user: { id, name, email, role, verified: user.verified } });
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const login: RequestHandler = (req, res) => {
  const body = loginSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const user = Array.from(users.values()).find(
    (u) => u.email === body.data.email,
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = bcrypt.compareSync(body.data.password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = tokenFor(user);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
  });
};

export const me: RequestHandler = (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing Authorization" });
  const token = auth.replace(/^Bearer\s+/i, "");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    const user = users.get(payload.sub);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    });
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const verifySchema = z.object({ userId: z.string(), approved: z.boolean() });
export const adminVerify: RequestHandler = (req, res) => {
  const body = verifySchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const user = users.get(body.data.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.verified = body.data.approved;
  users.set(user.id, user);
  res.json({ success: true, user: { id: user.id, verified: user.verified } });
};

export const getUsersStore = () => users;
