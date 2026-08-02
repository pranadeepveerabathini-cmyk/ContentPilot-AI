"use client";

export default function TopPosts() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">🏆 Top Posts</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Post</th>
            <th>Platform</th>
            <th>Likes</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td>AI Trends 2026</td>
            <td>LinkedIn</td>
            <td>12.5K</td>
          </tr>

          <tr>
            <td>Prompt Engineering</td>
            <td>Instagram</td>
            <td>8.9K</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}