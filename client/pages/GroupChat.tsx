import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function GroupChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/groups/${id}/messages`)
      .then((r) => r.json())
      .then((d) => setMessages(d.items || []));
    const es = new EventSource(`/api/groups/${id}/stream`);
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        setMessages((m) => [...m, data]);
      } catch (e) {}
    };
    esRef.current = es;
    return () => {
      es.close();
    };
  }, [id]);

  const send = async () => {
    if (!text) return;
    if (!id) return;
    await fetch(`/api/groups/${id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "You", text }),
    });
    setText("");
  };

  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Group Chat</h1>
      <div className="border rounded-xl p-4 h-[60vh] overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="text-sm">
              <strong>{m.sender}</strong>: {m.text}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Message"
          />
          <button
            onClick={send}
            className="px-3 py-2 rounded bg-primary text-primary-foreground"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
