"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/posts";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduled: 0,
    published: 0,
    platforms: 0,
  });

  const loadStats = async () => {
    const dashboardStats = await getDashboardStats();

    if (!dashboardStats) return;

    setStats({
      totalPosts: dashboardStats.total,
      scheduled: dashboardStats.scheduled,
      published: dashboardStats.published,
      platforms: dashboardStats.platforms,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      title: "📄 Total Posts",
      value: stats.totalPosts,
    },
    {
      title: "📅 Scheduled",
      value: stats.scheduled,
    },
    {
      title: "✅ Published",
      value: stats.published,
    },
    {
      title: "📱 Platforms",
      value: stats.platforms,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow"
        >
          <p className="text-gray-500">{card.title}</p>
          <h2 className="mt-2 text-4xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}