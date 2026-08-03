"use client";

import { useSearchParams } from "next/navigation";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function IntegrationsView() {
  const searchParams = useSearchParams();
  const connected = searchParams.get("status") === "connected";

  const connectLinkedIn = () => {
    if (!connected) {
      window.location.href = "/api/linkedin/auth";
    }
  };

  return (
    <div className="space-y-6">
      {/* LinkedIn */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center gap-5">
          <FaLinkedin className="text-5xl text-[#0A66C2]" />

          <div>
            <h2 className="text-2xl font-bold">LinkedIn</h2>

            <p className="mt-1 text-gray-500">
              Publish posts directly to your LinkedIn account.
            </p>

            {connected ? (
              <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                ✅ Connected
              </span>
            ) : (
              <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                ❌ Not Connected
              </span>
            )}
          </div>
        </div>

        <button
          onClick={connectLinkedIn}
          disabled={connected}
          className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
            connected
              ? "cursor-not-allowed bg-green-600"
              : "bg-[#0A66C2] hover:bg-blue-700"
          }`}
        >
          {connected ? "Connected" : "Connect LinkedIn"}
        </button>
      </div>

      {/* Instagram */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center gap-5">
          <FaInstagram className="text-5xl text-pink-600" />

          <div>
            <h2 className="text-2xl font-bold">Instagram</h2>

            <p className="mt-1 text-gray-500">
              Connect your Instagram Business account.
            </p>

            <span className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm">
              Coming Soon
            </span>
          </div>
        </div>

        <button
          disabled
          className="rounded-lg bg-gray-300 px-6 py-3 text-gray-600"
        >
          Coming Soon
        </button>
      </div>

      {/* Facebook */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center gap-5">
          <FaFacebook className="text-5xl text-blue-600" />

          <div>
            <h2 className="text-2xl font-bold">Facebook</h2>

            <p className="mt-1 text-gray-500">
              Publish content to your Facebook Page.
            </p>

            <span className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm">
              Coming Soon
            </span>
          </div>
        </div>

        <button
          disabled
          className="rounded-lg bg-gray-300 px-6 py-3 text-gray-600"
        >
          Coming Soon
        </button>
      </div>

      {/* X */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center gap-5">
          <FaXTwitter className="text-5xl" />

          <div>
            <h2 className="text-2xl font-bold">X (Twitter)</h2>

            <p className="mt-1 text-gray-500">
              Connect your X account for publishing.
            </p>

            <span className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm">
              Coming Soon
            </span>
          </div>
        </div>

        <button
          disabled
          className="rounded-lg bg-gray-300 px-6 py-3 text-gray-600"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}