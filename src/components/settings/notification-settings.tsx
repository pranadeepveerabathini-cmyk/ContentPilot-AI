"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🔔 Notifications
      </h2>

      <div className="space-y-5">

        <label className="flex justify-between">
          <span>Email Notifications</span>

          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() =>
              setEmailNotifications(!emailNotifications)
            }
          />
        </label>

        <label className="flex justify-between">
          <span>Post Reminders</span>

          <input
            type="checkbox"
            checked={reminders}
            onChange={() => setReminders(!reminders)}
          />
        </label>

      </div>

    </div>
  );
}