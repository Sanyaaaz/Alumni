import { useEffect, useState } from "react";

export default function Blogs() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  }, []);

  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Interview Blogs</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <div key={p.id} className="border rounded-xl p-5">
            <div className="font-semibold text-lg">{p.title}</div>
            <div className="text-xs text-muted-foreground">
              By {p.author} • {p.company} • {p.role}
            </div>
            <p className="mt-3 text-sm">{p.content}</p>
            <div className="mt-3 flex gap-2 items-center">
              <button className="px-3 py-1 rounded border text-sm">Read</button>
              <button
                onClick={async () => {
                  await fetch(`/api/blogs/${p.id}/upvote`, { method: "POST" });
                  alert("Upvoted");
                }}
                className="px-3 py-1 rounded bg-primary text-primary-foreground text-sm"
              >
                Upvote ({p.upvotes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
