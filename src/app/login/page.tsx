"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Account created successfully! Please check your email if confirmation is enabled."
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://content-pilot-ai-qr6h-fawn.vercel.app",
      },
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <p className="mb-6 text-center text-slate-500">
          Welcome to ContentPilot AI
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white py-3 font-medium hover:bg-gray-100"
        >
          Continue with Google
        </button>

        <div className="my-4 text-center text-gray-500">
          OR
        </div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700"
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Create Account"
            : "Login"}
        </button>

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 w-full text-purple-600"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>

      </div>
    </div>
  );
}