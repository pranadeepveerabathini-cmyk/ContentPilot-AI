import DashboardLayout from "@/components/layout/dashboard-layout";
import ReportsView from "@/components/reports/reports-view";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            📄 Reports
          </h1>

          <p className="mt-2 text-gray-500">
            Generate and download reports for your content performance.
          </p>
        </div>

        <ReportsView />
      </div>
    </DashboardLayout>
  );
}