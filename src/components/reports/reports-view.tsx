"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(124, 58, 237);
  doc.text("ContentPilot AI", 14, 20);

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Content Analytics Report", 14, 30);

  // Date
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    40
  );

  // Summary Table
  autoTable(doc, {
    startY: 50,
    head: [["Metric", "Value"]],
    body: [
      ["Total Posts", stats.total],
      ["Scheduled Posts", stats.scheduled],
      ["Published Posts", stats.published],
      ["LinkedIn Posts", stats.linkedin],
      ["Instagram Posts", stats.instagram],
      ["Facebook Posts", stats.facebook],
      ["X Posts", stats.twitter],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [124, 58, 237],
    },
    styles: {
      fontSize: 11,
    },
  });

  const finalY =
    (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(12);
  doc.text(
    "Generated automatically by ContentPilot AI",
    14,
    finalY
  );

  doc.save("ContentPilot_AI_Report.pdf");
}

return (
      <div className="rounded-xl border bg-white p-8 shadow">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold">
          📊 Content Analytics Report
        </h2>
        <p className="mt-2 text-gray-500">
          Live report generated from your Supabase data.
        </p>
      </div>

      <button
        onClick={downloadReport}
        className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        ⬇ Download PDF
      </button>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-xl border p-6">
        <p className="text-gray-500">
          Total Posts
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {stats.total}
        </h2>
      </div>

      <div className="rounded-xl border p-6">
        <p className="text-gray-500">
          Scheduled
        </p>

        <h2 className="mt-3 text-4xl font-bold text-yellow-600">
          {stats.scheduled}
        </h2>
      </div>

      <div className="rounded-xl border p-6">
        <p className="text-gray-500">
          Published
        </p>

        <h2 className="mt-3 text-4xl font-bold text-green-600">
          {stats.published}
        </h2>
      </div>

      <div className="rounded-xl border p-6">
        <p className="text-gray-500">
          Platforms Used
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {[
            stats.linkedin,
            stats.instagram,
            stats.facebook,
            stats.twitter,
          ].filter((x) => x > 0).length}
        </h2>
      </div>

    </div>

    <div className="mt-10 rounded-xl border p-6">

      <h3 className="mb-6 text-2xl font-bold">
        📱 Platform Breakdown
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between border-b pb-3">
          <span>LinkedIn</span>
          <strong>{stats.linkedin}</strong>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Instagram</span>
          <strong>{stats.instagram}</strong>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Facebook</span>
          <strong>{stats.facebook}</strong>
        </div>

        <div className="flex justify-between">
          <span>X (Twitter)</span>
          <strong>{stats.twitter}</strong>
        </div>

      </div>

    </div>
  </div>
);
}