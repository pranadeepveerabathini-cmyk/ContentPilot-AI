"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("scheduled_at");

    if (error) {
      console.error(error);
      return;
    }

    const counts: Record<string, number> = {};

    posts?.forEach((post) => {
      const date = new Date(post.scheduled_at);

      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      counts[day] = (counts[day] || 0) + 1;
    });

    const chartData = Object.keys(counts).map((day) => ({
      day,
      posts: counts[day],
    }));

    setData(chartData);
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 h-[380px]">
      <h2 className="text-xl font-semibold mb-4">
        Posts Scheduled
      </h2>

      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

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