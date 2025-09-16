import type { RequestHandler } from "express";
import { z } from "zod";

export interface AlumniRecord {
  id: string;
  name: string;
  batch: number;
  department: string;
  company: string;
  location: string;
  title: string;
  skills: string[];
  mentor: boolean;
  donate: boolean;
}

const alumni: AlumniRecord[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    batch: 2018,
    department: "Computer Science",
    company: "Google",
    location: "Bengaluru",
    title: "Software Engineer",
    skills: ["React", "Node", "GCP"],
    mentor: true,
    donate: true,
  },
  {
    id: "2",
    name: "Isha Verma",
    batch: 2016,
    department: "Electronics",
    company: "Texas Instruments",
    location: "Delhi",
    title: "Design Engineer",
    skills: ["VLSI", "MATLAB"],
    mentor: false,
    donate: true,
  },
  {
    id: "3",
    name: "Kabir Mehta",
    batch: 2020,
    department: "Mechanical",
    company: "Tata Motors",
    location: "Pune",
    title: "Product Manager",
    skills: ["CAD", "Management"],
    mentor: true,
    donate: false,
  },
  {
    id: "4",
    name: "Neha Singh",
    batch: 2019,
    department: "Computer Science",
    company: "Microsoft",
    location: "Hyderabad",
    title: "SDE II",
    skills: ["Azure", "Typescript"],
    mentor: true,
    donate: true,
  },
];

const querySchema = z.object({
  q: z.string().optional(),
  batch: z.string().optional(),
  department: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
});

export const listAlumni: RequestHandler = (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  let data = alumni;
  const { q, batch, department, company, location } = parsed.data;
  if (q) {
    const needle = q.toLowerCase();
    data = data.filter((a) =>
      [a.name, a.company, a.title, a.department, a.location, ...a.skills].some(
        (s) => s.toLowerCase().includes(needle),
      ),
    );
  }
  if (batch) data = data.filter((a) => String(a.batch) === String(batch));
  if (department) data = data.filter((a) => a.department === department);
  if (company) data = data.filter((a) => a.company === company);
  if (location) data = data.filter((a) => a.location === location);
  res.json({ items: data, total: data.length });
};

export const listFacets: RequestHandler = (_req, res) => {
  const batches = Array.from(new Set(alumni.map((a) => a.batch))).sort(
    (a, b) => b - a,
  );
  const departments = Array.from(
    new Set(alumni.map((a) => a.department)),
  ).sort();
  const companies = Array.from(new Set(alumni.map((a) => a.company))).sort();
  const locations = Array.from(new Set(alumni.map((a) => a.location))).sort();
  res.json({ batches, departments, companies, locations });
};
