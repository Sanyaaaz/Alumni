import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "Alumni", to: "/alumni" },
  { label: "Students", to: "/students/connect" },
  { label: "Mentorship", to: "/students/connect" },
  { label: "Events", to: "/events" },
  { label: "Blogs", to: "/blogs" },
  { label: "Peer Groups", to: "/groups" },
  { label: "Referral Hub", to: "/referrals" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">AN</span>
          <span className="font-semibold tracking-tight">Alumni Network</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => cn("text-sm hover:text-primary transition-colors", isActive && "text-primary font-semibold")}>{n.label}</NavLink>
          ))}
          <NavLink to="/auth/login" className={({ isActive }) => cn("text-sm", isActive && "text-primary font-semibold")}>Login</NavLink>
          <Link to="/auth/signup" className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Sign Up</Link>
        </nav>
        <button className="md:hidden rounded-md p-2 text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-2 grid gap-2">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className={({ isActive }) => cn("block px-2 py-2 rounded hover:bg-secondary text-sm", isActive && "text-primary font-semibold")}>{n.label}</NavLink>
            ))}
            <NavLink to="/auth/login" onClick={() => setOpen(false)} className={({ isActive }) => cn("block px-2 py-2 rounded hover:bg-secondary text-sm", isActive && "text-primary font-semibold")}>Login</NavLink>
            <Link to="/auth/signup" onClick={() => setOpen(false)} className="block px-2 py-2 rounded bg-primary text-primary-foreground text-center text-sm font-medium">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
