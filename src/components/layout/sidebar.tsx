export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        🚀 ContentPilot AI
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          Dashboard
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          AI Content
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          Calendar
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          Analytics
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          Reports
        </button>

        <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800">
          Settings
        </button>
      </nav>
    </aside>
  );
}