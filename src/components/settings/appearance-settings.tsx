"use client";

import { useEffect, useState } from "react";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    }
  }, []);

  function changeTheme(value: string) {
    setTheme(value);

    localStorage.setItem("theme", value);

    document.documentElement.classList.toggle(
      "dark",
      value === "dark"
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🎨 Appearance
      </h2>

      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="w-full rounded-lg border p-3"
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
      </select>

    </div>
  );
}