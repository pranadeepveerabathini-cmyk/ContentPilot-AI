"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";

const COLORS = [
  "#0A66C2",
  "#E1306C",
  "#1877F2",
  "#000000",
  "#10B981",
];

export default function PlatformChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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

    const chartData = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));

    setData(chartData);
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        🥧 Platform Distribution
      </h2>

      {data.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center text-gray-500">
          No posts found
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
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