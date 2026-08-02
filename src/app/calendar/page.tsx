import DashboardLayout from "@/components/layout/dashboard-layout";
import CalendarView from "@/components/calendar/calendar-view";
import CreatePostModal from "@/components/calendar/create-post-modal";

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              📅 Content Calendar
            </h1>

            <p className="text-slate-500 mt-2">
              Schedule and manage your content.
            </p>
          </div>

          <CreatePostModal />
        </div>

        <CalendarView />

      </div>
    </DashboardLayout>
  );
}