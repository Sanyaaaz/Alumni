import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumni",
  } as any);
  const nav = useNavigate();
  const submit = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const d = await res.json();
      localStorage.setItem("token", d.token);
      nav("/dashboard");
    } else {
      const t = await res.json();
      alert(JSON.stringify(t));
    }
  };
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Sign Up</h1>
      <div className="max-w-md border rounded-xl p-6">
        <input
          placeholder="Full name"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full border rounded px-3 py-2 mt-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="alumni">Alumni</option>
          <option value="student">Student</option>
        </select>
        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
