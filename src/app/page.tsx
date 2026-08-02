import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCard from "@/components/dashboard/stats-card";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Here's what's happening with your content today.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <StatsCard
            title="Total Posts"
            value="128"
            change="+12.5% this month"
          />

          <StatsCard
            title="Published"
            value="96"
            change="+8.7% this month"
          />

          <StatsCard
            title="Scheduled"
            value="24"
            change="+15.3% this month"
          />

          <StatsCard
            title="Engagement"
            value="23.8K"
            change="+18.6% this month"
          />

        </div>

      </div>
    </DashboardLayout>
  );
}