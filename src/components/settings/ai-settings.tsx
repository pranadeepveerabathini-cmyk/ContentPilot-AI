"use client";

import { useState } from "react";

export default function AISettings() {
  const [model, setModel] = useState("Groq");
  const [tone, setTone] = useState("Professional");

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Preferences
      </h2>

      <div className="space-y-5">

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option>Groq</option>
          <option>Gemini</option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option>Professional</option>
          <option>Friendly</option>
          <option>Casual</option>
          <option>Funny</option>
        </select>

      </div>

    </div>
  );
}