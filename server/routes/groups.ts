import type { RequestHandler } from "express";

interface Group {
  id: string;
  name: string;
  description: string;
}
interface Message {
  id: string;
  groupId: string;
  sender: string;
  text: string;
  ts: number;
}

const groups: Group[] = [
  { id: "g1", name: "Batch of 2018", description: "All 2018 graduates" },
  {
    id: "g2",
    name: "Company: Google",
    description: "Interview prep and referrals",
  },
];

const messages: Message[] = [];
const streams = new Map<string, Set<import("http").ServerResponse>>();

export const listGroups: RequestHandler = (_req, res) => {
  res.json({ items: groups });
};

export const listMessages: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ items: messages.filter((m) => m.groupId === id).slice(-100) });
};

export const sendMessage: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body || {};
  if (!sender || !text)
    return res.status(400).json({ error: "sender and text required" });
  const msg: Message = {
    id: String(messages.length + 1),
    groupId: id,
    sender,
    text,
    ts: Date.now(),
  };
  messages.push(msg);
  broadcast(id, msg);
  res.json({ success: true, message: msg });
};

export const streamGroup: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();
  addStream(id, res);
  res.write(`event: connected\n` + `data: {"groupId":"${id}"}\n\n`);
  req.on("close", () => removeStream(id, res));
};

function addStream(id: string, res: import("http").ServerResponse) {
  if (!streams.has(id)) streams.set(id, new Set());
  streams.get(id)!.add(res);
}
function removeStream(id: string, res: import("http").ServerResponse) {
  streams.get(id)?.delete(res);
}
function broadcast(id: string, msg: Message) {
  const payload = `event: message\n` + `data: ${JSON.stringify(msg)}\n\n`;
  streams.get(id)?.forEach((res) => res.write(payload));
}
