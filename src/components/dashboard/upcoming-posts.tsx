"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UpcomingPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadUpcomingPosts();
  }, []);

  async function loadUpcomingPosts() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Scheduled")
      .order("scheduled_at", { ascending: true })
      .limit(5);

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Posts</CardTitle>
      </CardHeader>

      <CardContent>
        {posts.length === 0 ? (
          <p className="text-slate-500">
            No upcoming posts.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {post.title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {post.platform}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {new Date(post.scheduled_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(post.scheduled_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}