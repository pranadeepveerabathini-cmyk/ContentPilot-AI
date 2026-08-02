"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileSettings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || "");

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name || "");
    }
  }

  async function saveProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully!");
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        👤 Profile
      </h2>

      <div className="space-y-5">

        <div>
          <label className="text-sm text-slate-500">
            Full Name
          </label>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm text-slate-500">
            Email
          </label>

          <input
            value={email}
            readOnly
            className="mt-2 w-full rounded-lg border bg-slate-100 p-3"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </div>

    </div>
  );
}