import DashboardLayout from "@/components/layout/dashboard-layout";
import ContentForm from "@/components/ai/content-form";

export default function AIContentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            AI Content Generator 🤖
          </h1>

          <p className="text-slate-500 mt-2">
            Generate social media content with Gemini AI.
          </p>
        </div>

        <ContentForm />
      </div>
    </DashboardLayout>
  );
}