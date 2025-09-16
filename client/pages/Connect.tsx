import { useState } from "react";

export default function Connect() {
  const [form, setForm] = useState({
    studentName: "",
    studentEmail: "",
    topic: "",
    preferredTime: "",
    mode: "free",
  });
  const submit = async () => {
    const res = await fetch("/api/mentorship/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Request sent");
  };
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">
        Student-Alumni Connect
      </h1>
      <div className="max-w-2xl border rounded-xl p-6">
        <input
          placeholder="Your name"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.studentName}
          onChange={(e) => setForm({ ...form, studentName: e.target.value })}
        />
        <input
          placeholder="Your email"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.studentEmail}
          onChange={(e) => setForm({ ...form, studentEmail: e.target.value })}
        />
        <input
          placeholder="Topic"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />
        <input
          placeholder="Preferred time"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.preferredTime}
          onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
        />
        <select
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="reward">Reward</option>
        </select>
        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            Request Mentor
          </button>
        </div>
      </div>
    </div>
  );
}
