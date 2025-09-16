import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Groups() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/groups")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  }, []);
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Peer Groups</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((g) => (
          <div key={g.id} className="border rounded-xl p-4">
            <div className="font-semibold">{g.name}</div>
            <div className="text-sm text-muted-foreground">{g.description}</div>
            <div className="mt-3">
              <Link to={`/groups/${g.id}`} className="text-primary">
                Join →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
