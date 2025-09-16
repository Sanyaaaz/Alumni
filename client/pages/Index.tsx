import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-primary font-serif">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function Index() {
  const [stats, setStats] = useState<{ alumni: number; mentors: number; eventsHosted: number; donations: number } | null>(null);
  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1887&auto=format&fit=crop"
          alt="Graduates celebrating"
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="container pb-10 md:pb-0">
            <div className="max-w-3xl text-white">
              <h1 className="font-serif text-4xl md:text-6xl font-extrabold leading-tight">Connect Generations. Build Futures.</h1>
              <p className="mt-4 text-white/90 text-lg">The official Alumni Network Platform to mentor, collaborate, and grow together.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/alumni" className="px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium">Explore Alumni</Link>
                <Link to="/students/connect" className="px-5 py-3 rounded-md bg-white/90 text-primary font-medium hover:bg-white">Request Mentorship</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container py-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">About the Platform</h2>
          <p className="mt-4 text-muted-foreground">A modern hub for alumni and students to connect through mentorship, events, referrals, and knowledge sharing. Verified profiles ensure trust. Real-time groups foster collaborative learning and growth.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/events" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Upcoming Events</Link>
            <Link to="/blogs" className="px-4 py-2 rounded-md border">Interview Blogs</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img className="rounded-lg object-cover h-48 w-full" src="https://images.unsplash.com/photo-1532009877282-3340270e0529?q=80&w=1374&auto=format&fit=crop" alt="Campus" />
          <img className="rounded-lg object-cover h-48 w-full" src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1374&auto=format&fit=crop" alt="Library" />
          <img className="rounded-lg object-cover h-48 w-full col-span-2" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2069&auto=format&fit=crop" alt="Students" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/40 py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="Total Alumni" value={stats?.alumni ?? "—"} />
          <Stat label="Active Mentors" value={stats?.mentors ?? "—"} />
          <Stat label="Events Hosted" value={stats?.eventsHosted ?? "—"} />
          <Stat label="Donations" value={stats?.donations ?? "—"} />
        </div>
      </section>

      {/* Programs/Features */}
      <section className="container py-16">
        <h3 className="font-serif text-3xl font-bold text-center mb-10">Programs & Features</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Mentorship", desc: "1:1 and group sessions with verified alumni mentors.", to: "/students/connect" },
            { title: "Alumni Directory", desc: "Search by batch, department, company, or location.", to: "/alumni" },
            { title: "Referral Hub", desc: "Get referrals from alumni with reward options.", to: "/referrals" },
            { title: "Events", desc: "Reunions, fests, webinars with calendar sync.", to: "/events" },
            { title: "Interview Blogs", desc: "Real experiences tagged by company and role.", to: "/blogs" },
            { title: "Peer Groups", desc: "Batch and company communities with real-time chat.", to: "/groups" },
          ].map((c) => (
            <Link key={c.title} to={c.to} className="group rounded-xl border p-6 hover:shadow-lg transition">
              <div className="font-semibold text-lg">{c.title}</div>
              <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
              <div className="mt-4 text-primary text-sm font-medium group-hover:underline">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Campus Life Grid */}
      <section className="container pb-20">
        <h3 className="font-serif text-3xl font-bold text-center mb-10">Campus Life</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1577896849786-238138eac955?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528229333800-8a5f7ebd5dce?q=80&w=1374&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1374&auto=format&fit=crop",
          ].map((src, i) => (
            <img key={i} src={src} alt="Campus life" className="h-40 md:h-48 w-full object-cover rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  );
}
