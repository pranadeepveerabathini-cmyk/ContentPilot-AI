import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  // Get LinkedIn access token
  const { data: account, error } = await supabase
    .from("social_accounts")
    .select("access_token")
    .eq("user_id", user.id)
    .eq("provider", "linkedin")
    .single();

  if (error || !account) {
    return NextResponse.json(
      { error: "LinkedIn not connected" },
      { status: 400 }
    );
  }

  // Fetch LinkedIn profile
  const response = await fetch(
    "https://api.linkedin.com/rest/userinfo",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${account.access_token}`,
        "LinkedIn-Version": "202405",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );

  const profile = await response.json();

  return NextResponse.json(profile);
}