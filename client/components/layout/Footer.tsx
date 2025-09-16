export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-10 grid gap-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">AN</span> Alumni Network</div>
          <p className="text-sm text-muted-foreground mt-2">Connecting generations, empowering futures.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Alumni Directory</li>
            <li>Mentorship</li>
            <li>Events</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-muted-foreground">alumni@university.edu</p>
          <p className="text-sm text-muted-foreground">+91-800-000-0000</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Alumni Network</div>
    </footer>
  );
}
