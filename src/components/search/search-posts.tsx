"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Post = {
  id: number;
  title: string;
  content: string;
  platform: string;
};

export default function SearchPosts() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("posts")
      .select("id,title,content,platform")
      .eq("user_id", user.id);

    setPosts(data || []);
  }

  const filtered = posts.filter((post) =>
    (
      post.title +
      " " +
      post.content +
      " " +
      post.platform
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-lg border p-3"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-3">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border p-4 bg-white"
          >
            <h3 className="font-bold">{post.title}</h3>

            <p className="text-sm text-gray-500">
              {post.platform}
            </p>

            <p className="mt-2 line-clamp-3">
              {post.content}
            </p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500">
            No matching posts found.
          </p>
        )}
      </div>
    </div>
  );
}