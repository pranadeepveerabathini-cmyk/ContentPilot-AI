import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/integrations?status=failed", request.url)
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Exchange code for token
  const tokenResponse = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/linkedin/callback`,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return NextResponse.redirect(
      new URL("/integrations?status=failed", request.url)
    );
  }

  const { error } = await supabase
    .from("social_accounts") // <-- FIXED
    .upsert({
      user_id: user.id,
      provider: "linkedin",
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token ?? null,
      expires_at: new Date(
        Date.now() + tokenData.expires_in * 1000
      ).toISOString(),
    });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return NextResponse.json(error);
  }

  return NextResponse.redirect(
    new URL("/integrations?status=connected", request.url)
  );
}