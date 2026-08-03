"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#7C3AED",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

export default function PlatformChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadPlatforms();
  }, []);

  async function loadPlatforms() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: posts, error } = await supabase
      .from("posts")
      .select("platform")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    const counts: Record<string, number> = {};

    posts?.forEach((post) => {
      counts[post.platform] = (counts[post.platform] || 0) + 1;
    });

    const chartData = Object.keys(counts).map((platform) => ({
      name: platform,
      value: counts[platform],
    }));

    setData(chartData);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-[380px]">
      <h2 className="text-xl font-semibold mb-4">
        Top Platforms
      </h2>

      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No platform data found
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}