"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import PlatformChart from "@/components/dashboard/platform-chart";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import RecentPosts from "@/components/dashboard/recent-posts";
import UpcomingPosts from "@/components/dashboard/upcoming-posts";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCard from "@/components/dashboard/stats-card";

export default function HomePage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    scheduled: 0,
    engagement: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data, error } = await supabase
      .from("posts")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    const total = data.length;

    const published = data.filter(
      (p) => p.status === "Published"
    ).length;

    const scheduled = data.filter(
      (p) => p.status === "Scheduled"
    ).length;

    // Temporary engagement value
    const engagement = total * 120;

    setStats({
      total,
      published,
      scheduled,
      engagement,
    });
  }

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