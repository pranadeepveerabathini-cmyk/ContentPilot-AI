"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number;
  title: string;
  platform: string;
  status: string;
  scheduled_at: string;
  content: string;
};

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editPlatform, setEditPlatform] = useState("LinkedIn");
  const [editStatus, setEditStatus] = useState("Scheduled");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  }

  function openPost(post: Post) {
    setSelectedPost(post);

    setEditTitle(post.title);
    setEditPlatform(post.platform);
    setEditStatus(post.status);
    setEditContent(post.content);

    setIsEditing(false);
  }

  async function copyContent() {
    if (!selectedPost) return;

    await navigator.clipboard.writeText(selectedPost.content);

    alert("Content copied!");
  }

  async function saveChanges() {
    if (!selectedPost) return;

    const { error } = await supabase
      .from("posts")
      .update({
        title: editTitle,
        platform: editPlatform,
        status: editStatus,
        content: editContent,
      })
      .eq("id", selectedPost.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Post updated!");

    loadPosts();

    setSelectedPost(null);
  }

  async function deletePost() {
    if (!selectedPost) return;

    if (!confirm("Delete this post?")) return;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", selectedPost.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Post deleted!");

    loadPosts();

    setSelectedPost(null);
  }

  return (
    <>
  <div className="rounded-xl border bg-white p-6 shadow">
    <h2 className="mb-5 text-2xl font-bold">
      📝 Recent Posts
    </h2>

    {posts.length === 0 ? (
      <p className="text-gray-500">
        No posts found.
      </p>
    ) : (
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => openPost(post)}
            className="cursor-pointer flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500">
                {post.platform}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  post.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.status}
              </span>

              <p className="mt-2 text-xs text-gray-500">
                {new Date(post.scheduled_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
        {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {isEditing ? "✏️ Edit Post" : "📝 Post Details"}
              </h2>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  setIsEditing(false);
                }}
                className="text-2xl"
              >
                ✖
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border p-3"
                />

                <select
                  value={editPlatform}
                  onChange={(e) =>
                    setEditPlatform(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>X (Twitter)</option>
                  <option>Facebook</option>
                </select>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option>Scheduled</option>
                  <option>Published</option>
                </select>

                <textarea
                  rows={12}
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() =>
                      setIsEditing(false)
                    }
                    className="rounded-lg bg-gray-500 px-5 py-2 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveChanges}
                    className="rounded-lg bg-green-600 px-5 py-2 text-white"
                  >
                    💾 Save
                  </button>

                </div>

              </div>
            ) : (
              <>

                <div className="space-y-2">

                  <p>
                    <strong>Title:</strong>{" "}
                    {selectedPost.title}
                  </p>

                  <p>
                    <strong>Platform:</strong>{" "}
                    {selectedPost.platform}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedPost.status}
                  </p>

                  <p>
                    <strong>Scheduled:</strong>{" "}
                    {new Date(
                      selectedPost.scheduled_at
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="mt-5 max-h-80 overflow-auto rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap">
                  {selectedPost.content}
                </div>

                <div className="mt-6 flex justify-end gap-3">

                  <button
                    onClick={copyContent}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() =>
                      setIsEditing(true)
                    }
                    className="rounded-lg bg-yellow-500 px-5 py-2 text-white"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={deletePost}
                    className="rounded-lg bg-red-600 px-5 py-2 text-white"
                  >
                    🗑 Delete
                  </button>

                </div>

              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}