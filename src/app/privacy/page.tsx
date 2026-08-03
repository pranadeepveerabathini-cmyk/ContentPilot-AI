export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">

        <h1 className="text-5xl font-bold text-slate-900">
          Privacy Policy
        </h1>

        <p className="mt-3 text-gray-500">
          Effective Date: August 3, 2026
        </p>

        <p className="mt-8 text-lg leading-8 text-gray-700">
          At <strong>ContentPilot</strong>, we value your privacy and are
          committed to protecting your personal information. This Privacy
          Policy explains what information we collect, how we use it, and the
          choices you have regarding your data when using our AI-powered
          content creation and scheduling platform.
        </p>

        <section className="mt-10 space-y-8">

          <div>
            <h2 className="text-2xl font-semibold">
              1. Information We Collect
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Name and email address.</li>
              <li>User authentication information through Supabase.</li>
              <li>Social media account information after authorization.</li>
              <li>Posts, drafts, scheduled content, and analytics.</li>
              <li>Technical information such as browser, device, and IP address.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              2. How We Use Your Information
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Generate AI-powered content.</li>
              <li>Schedule and publish social media posts.</li>
              <li>Improve platform performance.</li>
              <li>Provide analytics and reporting.</li>
              <li>Respond to support requests.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              3. Social Media Integrations
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              When you connect platforms such as LinkedIn, ContentPilot only
              accesses the permissions you explicitly grant. We never publish
              content without your authorization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              4. Data Security
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              We use industry-standard security practices to safeguard user
              information. Authentication is handled securely through Supabase,
              and sensitive credentials are never exposed publicly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              5. Your Rights
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Access your personal information.</li>
              <li>Update or correct your account details.</li>
              <li>Delete your account and associated data.</li>
              <li>Disconnect social media integrations at any time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              6. Contact Us
            </h2>

            <p className="mt-3 text-gray-700">
              For privacy-related questions, contact us at:
            </p>

            <p className="mt-2 font-semibold text-purple-700">
              support@contentpilot.app
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}