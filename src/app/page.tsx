"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCard from "@/components/dashboard/stats-card";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import PlatformChart from "@/components/dashboard/platform-chart";
import RecentPosts from "@/components/dashboard/recent-posts";
import UpcomingPosts from "@/components/dashboard/upcoming-posts";
import { createClient } from "@/lib/supabase/client";
import { getDashboardStats } from "@/services/posts";

const supabase = createClient();

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    scheduled: 0,
    engagement: 0,
  });

  const loadStats = async () => {
    const dashboardStats = await getDashboardStats();

    if (!dashboardStats) return;

    setStats({
      total: dashboardStats.total,
      published: dashboardStats.published,
      scheduled: dashboardStats.scheduled,
      engagement: dashboardStats.total * 120,
    });
  };

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    await loadStats();
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-slate-500">
            Here's what's happening with your content today.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatsCard
            title="Total Posts"
            value={stats.total.toString()}
            change="Live from Supabase"
          />
          <StatsCard
            title="Published"
            value={stats.published.toString()}
            change="Live from Supabase"
          />
          <StatsCard
            title="Scheduled"
            value={stats.scheduled.toString()}
            change="Live from Supabase"
          />
          <StatsCard
            title="Engagement"
            value={stats.engagement.toString()}
            change="Estimated"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <AnalyticsChart />
          </div>
          <PlatformChart />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <RecentPosts />
          <UpcomingPosts />
        </div>
      </div>
    </DashboardLayout>
  );
}