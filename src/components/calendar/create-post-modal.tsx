"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreatePostModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function handleSave() {
    if (!title || !date || !time) {
      alert("Please fill all fields.");
      return;
    }


   const {
   data: { user },
  } = await supabase.auth.getUser(); 
   console.log("Current User:", user);
    const { error } = await supabase.from("posts").insert([
      {
        title,
        platform,
        status: "Scheduled",
        scheduled_at: `${date} ${time}:00`,user_id:user?.id,
      },
    ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Post saved successfully!");

    setTitle("");
    setPlatform("LinkedIn");
    setDate("");
    setTime("");
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700">
          ➕ Create Post
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[9999] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">
          <Dialog.Title className="mb-6 text-2xl font-bold">
            Create New Post
          </Dialog.Title>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-3"
            />

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>X</option>
              <option>Facebook</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border p-3"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="rounded-lg border px-5 py-2">
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleSave}
              className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}