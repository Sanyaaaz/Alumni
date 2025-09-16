import { useEffect, useMemo, useState } from "react";

interface AlumniRec {
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

export default function Alumni() {
  const [items, setItems] = useState<AlumniRec[]>([]);
  const [facets, setFacets] = useState<{
    batches: number[];
    departments: string[];
    companies: string[];
    locations: string[];
  } | null>(null);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<{
    batch?: string;
    department?: string;
    company?: string;
    location?: string;
  }>({});

  useEffect(() => {
    fetch("/api/alumni/facets")
      .then((r) => r.json())
      .then(setFacets);
  }, []);
  const params = useMemo(
    () => new URLSearchParams({ ...(q ? { q } : {}), ...filters }),
    [q, filters],
  );
  useEffect(() => {
    fetch(`/api/alumni?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  }, [params]);

  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Alumni Directory</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1 space-y-3 border rounded-lg p-4">
          <input
            placeholder="Search name, company, skill..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.batch || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, batch: e.target.value || undefined }))
            }
          >
            <option value="">All Batches</option>
            {facets?.batches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.department || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                department: e.target.value || undefined,
              }))
            }
          >
            <option value="">All Departments</option>
            {facets?.departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.company || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                company: e.target.value || undefined,
              }))
            }
          >
            <option value="">All Companies</option>
            {facets?.companies.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={filters.location || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                location: e.target.value || undefined,
              }))
            }
          >
            <option value="">All Locations</option>
            {facets?.locations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3 grid gap-4 md:grid-cols-2">
          {items.map((a) => (
            <div
              key={a.id}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.department} • Batch {a.batch}
                  </div>
                </div>
                <div className="text-xs bg-secondary px-2 py-1 rounded-md">
                  {a.location}
                </div>
              </div>
              <div className="mt-3 text-sm">
                {a.title} @ {a.company}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {a.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded bg-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {a.mentor && (
                  <button className="px-3 py-1 rounded bg-primary text-primary-foreground text-sm">
                    Request Mentor
                  </button>
                )}
                {a.donate && (
                  <button className="px-3 py-1 rounded border text-sm">
                    Donate
                  </button>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
              No results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
