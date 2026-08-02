"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SecuritySettings() {
  const router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/login");
  }

  async function changePassword() {
    const email = prompt("Enter your email");

    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset email sent.");
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🔒 Security
      </h2>

      <div className="flex gap-4">

        <button
          onClick={changePassword}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Change Password
        </button>

        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>
  );
}