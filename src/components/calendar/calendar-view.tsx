"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "@/lib/supabase";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const [events, setEvents] = useState<any[]>([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editPlatform, setEditPlatform] = useState("LinkedIn");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.error(error);
      return;
    }

    setEvents(
      (data || []).map((post) => ({
        id: post.id,
        title: post.title,
        platform: post.platform,
        start: new Date(post.scheduled_at),
        end: new Date(post.scheduled_at),
      }))
    );
  }

  async function handleDelete() {
    if (!selectedPost) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", selectedPost.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Post deleted successfully!");

    setOpen(false);
    setSelectedPost(null);

    loadPosts();
  }

  async function handleUpdate() {
    if (!selectedPost) return;

    const { error } = await supabase
      .from("posts")
      .update({
        title: editTitle,
        platform: editPlatform,
        scheduled_at: `${editDate} ${editTime}:00`,
      })
      .eq("id", selectedPost.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Post updated successfully!");

    setOpen(false);
    loadPosts();
  }

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow">
        <Calendar
          localizer={localizer}
          events={events}
          date={date}
          view={view}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={(event: any) => {
            setSelectedPost(event);

            setEditTitle(event.title);
            setEditPlatform(event.platform);

            const d = new Date(event.start);

            setEditDate(d.toISOString().split("T")[0]);

            setEditTime(
              d.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            );

            setOpen(true);
          }}
        />
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">

            <Dialog.Title className="mb-5 text-2xl font-bold">
              Edit Post
            </Dialog.Title>

            <input
              className="mb-3 w-full rounded-lg border p-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <select
              className="mb-3 w-full rounded-lg border p-3"
              value={editPlatform}
              onChange={(e) => setEditPlatform(e.target.value)}
            >
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>X</option>
            </select>

            <input
              type="date"
              className="mb-3 w-full rounded-lg border p-3"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <input
              type="time"
              className="mb-5 w-full rounded-lg border p-3"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={handleUpdate}
                className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              >
                Save Changes
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>

              <Dialog.Close asChild>
                <button className="rounded-lg border px-4 py-2">
                  Close
                </button>
              </Dialog.Close>

            </div>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}