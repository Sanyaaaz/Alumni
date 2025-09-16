import { useEffect, useState } from "react";

export default function Referrals() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({
    student: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  useEffect(() => {
    fetch("/api/referrals")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  }, []);
  const submit = async () => {
    const res = await fetch("/api/referrals/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Request sent");
  };
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Referral Hub</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.id} className="border rounded-xl p-4">
              <div className="font-semibold">
                {i.company} • {i.role}
              </div>
              <div className="text-sm text-muted-foreground">
                Offered by {i.alumni} • {i.model}
              </div>
            </div>
          ))}
        </div>
        <div className="border rounded-xl p-4">
          <h3 className="font-semibold">Request Referral</h3>
          <input
            placeholder="Your name"
            className="w-full border rounded px-3 py-2 mt-2"
            value={form.student}
            onChange={(e) => setForm({ ...form, student: e.target.value })}
          />
          <input
            placeholder="Your email"
            className="w-full border rounded px-3 py-2 mt-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Company"
            className="w-full border rounded px-3 py-2 mt-2"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <input
            placeholder="Role"
            className="w-full border rounded px-3 py-2 mt-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <textarea
            placeholder="Message"
            className="w-full border rounded px-3 py-2 mt-2"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            onClick={submit}
            className="mt-3 px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
