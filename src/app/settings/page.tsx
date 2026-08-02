"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import ProfileSettings from "@/components/settings/profile-settings";
import SecuritySettings from "@/components/settings/security-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import AISettings from "@/components/settings/ai-settings";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            ⚙️ Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your ContentPilot AI account.
          </p>
        </div>

        <ProfileSettings />

        <AppearanceSettings />

        <NotificationSettings />

        <AISettings />

        <SecuritySettings />

      </div>
    </DashboardLayout>
  );
}