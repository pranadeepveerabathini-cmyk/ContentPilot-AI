"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Stats = {
  total: number;
  scheduled: number;
  published: number;
  linkedin: number;
  instagram: number;
  facebook: number;
  twitter: number;
};

export default function ReportsView() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    scheduled: 0,
    published: 0,
    linkedin: 0,
    instagram: 0,
    facebook: 0,
    twitter: 0,
  });

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    const total = data.length;
    const scheduled = data.filter(
      (p) => p.status === "Scheduled"
    ).length;

    const published = data.filter(
      (p) => p.status === "Published"
    ).length;

    const linkedin = data.filter(
      (p) => p.platform === "LinkedIn"
    ).length;

    const instagram = data.filter(
      (p) => p.platform === "Instagram"
    ).length;

    const facebook = data.filter(
      (p) => p.platform === "Facebook"
    ).length;

    const twitter = data.filter(
      (p) => p.platform === "X (Twitter)"
    ).length;

    setStats({
      total,
      scheduled,
      published,
      linkedin,
      instagram,
      facebook,
      twitter,
    });
  }

  function downloadReport() {
    const report = `
CONTENTPILOT AI REPORT

===========================

Total Posts: ${stats.total}

Scheduled Posts: ${stats.scheduled}

Published Posts: ${stats.published}

LinkedIn Posts: ${stats.linkedin}

Instagram Posts: ${stats.instagram}

Facebook Posts: ${stats.facebook}

X Posts: ${stats.twitter}
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "ContentPilot_Report.txt";

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-xl border bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        📊 Content Summary
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-lg border p-5">
          <p>Total Posts</p>
          <h2 className="text-4xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Scheduled</p>
          <h2 className="text-4xl font-bold">
            {stats.scheduled}
          </h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Published</p>
          <h2 className="text-4xl font-bold">
            {stats.published}
          </h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Platforms Used</p>
          <h2 className="text-2xl font-bold">
            LinkedIn: {stats.linkedin}<br />
            Instagram: {stats.instagram}<br />
            Facebook: {stats.facebook}<br />
            X: {stats.twitter}
          </h2>
        </div>

      </div>

      <button
        onClick={downloadReport}
        className="mt-8 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
      >
        ⬇ Download Report
      </button>

    </div>
  );
}