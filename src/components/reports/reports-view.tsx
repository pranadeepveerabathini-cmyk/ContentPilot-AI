"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getDashboardStats } from "@/services/posts";

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

  const loadReport = async () => {
    const dashboardStats = await getDashboardStats();

    if (!dashboardStats) return;

    const posts = dashboardStats.posts;

    setStats({
      total: dashboardStats.total,
      scheduled: dashboardStats.scheduled,
      published: dashboardStats.published,
      linkedin: posts.filter(
        (p) => p.platform === "LinkedIn"
      ).length,
      instagram: posts.filter(
        (p) => p.platform === "Instagram"
      ).length,
      facebook: posts.filter(
        (p) => p.platform === "Facebook"
      ).length,
      twitter: posts.filter(
        (p) => p.platform === "X (Twitter)"
      ).length,
    });
  };

  useEffect(() => {
    loadReport();
  }, []);

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ContentPilot AI Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Total Posts", stats.total],
        ["Published", stats.published],
        ["Scheduled", stats.scheduled],
        ["LinkedIn", stats.linkedin],
        ["Instagram", stats.instagram],
        ["Facebook", stats.facebook],
        ["X", stats.twitter],
      ],
    });

    doc.save("ContentPilot_Report.pdf");
  };

  return (
    <div className="rounded-xl border bg-white p-8 shadow">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            📄 Reports
          </h2>
          <p className="text-gray-500">
            Generate analytics reports.
          </p>
        </div>

        <button
          onClick={downloadReport}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white"
        >
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-lg border p-5">
          <p>Total Posts</p>
          <h2 className="text-3xl font-bold">{stats.total}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Published</p>
          <h2 className="text-3xl font-bold">{stats.published}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Scheduled</p>
          <h2 className="text-3xl font-bold">{stats.scheduled}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p>Platforms</p>
          <h2 className="text-3xl font-bold">
            {[stats.linkedin, stats.instagram, stats.facebook, stats.twitter].filter(
              (x) => x > 0
            ).length}
          </h2>
        </div>
      </div>
    </div>
  );
}