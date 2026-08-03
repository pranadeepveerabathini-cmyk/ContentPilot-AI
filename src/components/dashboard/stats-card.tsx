"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduled: 0,
    published: 0,
    platforms: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Analytics User:", user);

    if (!user) {
      console.log("❌ No logged in user");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id);

    console.log("Analytics Data:", data);
    console.log("Analytics Error:", error);

    if (error) {
      console.error(error);
      return;
    }

    const totalPosts = data?.length ?? 0;

    const scheduled =
      data?.filter((post) => post.status === "Scheduled").length ?? 0;

    const published =
      data?.filter((post) => post.status === "Published").length ?? 0;

    const platforms =
      new Set(data?.map((post) => post.platform)).size ?? 0;

    setStats({
      totalPosts,
      scheduled,
      published,
      platforms,
    });
  }

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