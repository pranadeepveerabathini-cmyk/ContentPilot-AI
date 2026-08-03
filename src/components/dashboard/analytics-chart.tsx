"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: posts, error } = await supabase
      .from("posts")
      .select("scheduled_at")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    const counts: Record<string, number> = {};

    posts?.forEach((post) => {
      const day = new Date(post.scheduled_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      counts[day] = (counts[day] || 0) + 1;
    });

    const chartData = Object.entries(counts).map(([day, posts]) => ({
      day,
      posts,
    }));

    setData(chartData);
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 h-[380px]">
      <h2 className="text-xl font-semibold mb-4">
        📈 Posts Scheduled
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
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}