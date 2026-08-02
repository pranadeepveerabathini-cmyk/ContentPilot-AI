"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContentForm() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  async function generateContent() {
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          platform,
          tone,
          prompt,
        }),
      });

      const data = await res.json();

      setResult(data.content || "No content generated.");
    } catch (err) {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  async function copyContent() {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    alert("Content copied!");
  }

  async function saveToCalendar() {
    if (!result) {
      alert("Generate content first.");
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      alert("Select date and time.");
      return;
    }

    const { error } = await supabase.from("posts").insert([
      {
        title: topic,
        platform,
        content: result,
        status: "Scheduled",
        scheduled_at: `${scheduleDate} ${scheduleTime}:00`,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("AI post saved to calendar!");

    setScheduleDate("");
    setScheduleTime("");
  }

  return (
    <div className="space-y-6">

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <select
        className="w-full rounded-lg border p-3"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>LinkedIn</option>
        <option>Instagram</option>
        <option>X (Twitter)</option>
        <option>Facebook</option>
      </select>

      <select
        className="w-full rounded-lg border p-3"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Casual</option>
        <option>Friendly</option>
        <option>Funny</option>
      </select>

      <textarea
        rows={6}
        className="w-full rounded-lg border p-3"
        placeholder="Extra instructions..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-3">

        <button
          onClick={generateContent}
          disabled={loading}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "🚀 Generate"}
        </button>

        <button
          onClick={copyContent}
          disabled={!result}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          📋 Copy
        </button>

        <button
          onClick={generateContent}
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
        >
          🔄 Regenerate
        </button>

      </div>

      <div className="rounded-lg border p-4 min-h-[220px] whitespace-pre-wrap">
        {result || "Generated content will appear here..."}
      </div>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="rounded-lg border p-3"
        />

        <input
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="rounded-lg border p-3"
        />

      </div>

      <button
        onClick={saveToCalendar}
        disabled={!result}
        className="w-full rounded-lg bg-orange-600 px-6 py-3 text-white hover:bg-orange-700 disabled:opacity-50"
      >
        📅 Save to Calendar
      </button>

      <p className="text-sm text-gray-500">
        Characters: {result.length}
      </p>

    </div>
  );
}