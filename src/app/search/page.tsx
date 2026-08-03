import DashboardLayout from "@/components/layout/dashboard-layout";
import SearchPosts from "@/components/search/search-posts";

export default function SearchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            🔍 Search Posts
          </h1>

          <p className="text-gray-500 mt-2">
            Search through all your AI-generated content.
          </p>
        </div>

        <SearchPosts />
      </div>
    </DashboardLayout>
  );
}