import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const submit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const d = await res.json();
      localStorage.setItem("token", d.token);
      nav("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Login</h1>
      <div className="max-w-md border rounded-xl p-6">
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
        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
