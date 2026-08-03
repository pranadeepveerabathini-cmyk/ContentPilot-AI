import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getDashboardStats() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;

  const total = data.length;
  const published = data.filter(
    (p) => p.status === "Published"
  ).length;
  const scheduled = data.filter(
    (p) => p.status === "Scheduled"
  ).length;
  const platforms = new Set(
    data.map((p) => p.platform)
  ).size;

  return {
    total,
    published,
    scheduled,
    platforms,
    posts: data,
  };
}