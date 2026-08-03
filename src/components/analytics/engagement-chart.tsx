"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function EngagementChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select("created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    const counts: Record<string, number> = {};

    data?.forEach((post) => {
      const date = new Date(post.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      counts[date] = (counts[date] || 0) + 1;
    });

    const formatted = Object.entries(counts).map(([date, posts]) => ({
      date,
      posts,
    }));

    setChartData(formatted);
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow h-[350px]">
      <h2 className="mb-4 text-xl font-bold">
        📈 Posts Created
      </h2>

      {chartData.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="posts"
              stroke="#7C3AED"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}