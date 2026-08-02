import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCards from "@/components/analytics/stats-cards";
import EngagementChart from "@/components/analytics/engagement-chart";
import PlatformChart from "@/components/analytics/platform-chart";
import TopPosts from "@/components/analytics/top-posts";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            📊 Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Live analytics powered by your Supabase database.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EngagementChart />
          <PlatformChart />
        </div>

        <TopPosts />

      </div>
    </DashboardLayout>
  );
}