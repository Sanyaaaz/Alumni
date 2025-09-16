export default function Dashboard(){
  return (
    <div className="container py-10">
      <h1 className="font-serif text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-4">Profile completion: 78%</div>
        <div className="border rounded-xl p-4">Connections: 24</div>
        <div className="border rounded-xl p-4">Events attended: 6</div>
      </div>
    </div>
  );
}
