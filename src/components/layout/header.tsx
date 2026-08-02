export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-2"
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          Create
        </button>
      </div>
    </header>
  );
}