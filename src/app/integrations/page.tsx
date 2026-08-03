import DashboardLayout from "@/components/layout/dashboard-layout";
import IntegrationsView from "@/components/integrations/integrations-view";

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            🔗 Integrations
          </h1>

          <p className="mt-2 text-gray-500">
            Connect your social media accounts to publish content directly.
          </p>
        </div>

        <IntegrationsView />

      </div>
    </DashboardLayout>
  );
}