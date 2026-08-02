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
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          href="/ai-content"
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          AI Content
        </Link>

        <Link
          href="/calendar"
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          Calendar
        </Link>

        <Link
          href="/analytics"
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          Analytics
        </Link>

        <Link
          href="/reports"
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          Reports
        </Link>

        <Link
          href="/settings"
          className="block w-full text-left p-3 rounded-lg hover:bg-slate-800"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}