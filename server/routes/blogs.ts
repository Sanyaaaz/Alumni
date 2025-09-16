import type { RequestHandler } from "express";
import { z } from "zod";

export interface BlogPost {
  id: string;
  author: string;
  title: string;
  company: string;
  role: string;
  tags: string[];
  content: string;
  createdAt: string;
  upvotes: number;
}

let blogCounter = 1;
const posts: BlogPost[] = [
  {
    id: String(blogCounter++),
    author: "Neha Singh",
    title: "SDE Interview at Microsoft",
    company: "Microsoft",
    role: "SDE II",
    tags: ["DSA", "System Design"],
    content: "Round-wise experience, tips, and resources.",
    createdAt: new Date().toISOString(),
    upvotes: 12,
  },
];

export const listBlogs: RequestHandler = (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase();
  const tag = req.query.tag as string | undefined;
  let data = posts;
  if (q)
    data = data.filter((p) =>
      [p.title, p.company, p.role, p.author, p.content].some((s) =>
        s.toLowerCase().includes(q),
      ),
    );
  if (tag) data = data.filter((p) => p.tags.includes(tag));
  res.json({ items: data });
};

const createSchema = z.object({
  author: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  tags: z.array(z.string()).default([]),
  content: z.string().min(1),
});
export const createBlog: RequestHandler = (req, res) => {
  const body = createSchema.safeParse(req.body);
  if (!body.success)
    return res.status(400).json({ error: body.error.flatten() });
  const d = body.data as z.infer<typeof createSchema>;
  const post: BlogPost = {
    id: String(blogCounter++),
    author: d.author,
    title: d.title,
    company: d.company,
    role: d.role,
    tags: d.tags ?? [],
    content: d.content,
    createdAt: new Date().toISOString(),
    upvotes: 0,
  };
  posts.unshift(post);
  res.json({ post });
};

export const upvoteBlog: RequestHandler = (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: "Not found" });
  post.upvotes += 1;
  res.json({ upvotes: post.upvotes });
};
