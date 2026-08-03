import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        🚀 ContentPilot AI
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/ai-content"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          🤖 AI Content
        </Link>

        <Link
          href="/calendar"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          📅 Calendar
        </Link>

        <Link
          href="/analytics"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          📊 Analytics
        </Link>

        <Link
          href="/search"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          🔍 Search
        </Link>

        <Link
          href="/reports"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          📄 Reports
        </Link>


       <Link
         href="/integrations"
           className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
       >
          🔗 Integrations
       </Link>
       
        <Link
          href="/settings"
          className="block w-full rounded-lg p-3 hover:bg-slate-800 transition"
        >
          ⚙️ Settings
        </Link>
      </nav>

      <div className="border-t border-slate-700 p-4 text-center text-xs text-slate-400">
        ContentPilot AI v1.0
      </div>
    </aside>
  );
}