export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">

        <h1 className="text-5xl font-bold text-slate-900">
          Terms of Service
        </h1>

        <p className="mt-3 text-gray-500">
          Effective Date: August 3, 2026
        </p>

        <p className="mt-8 text-lg leading-8 text-gray-700">
          Welcome to <strong>ContentPilot</strong>. By accessing or using
          our platform, you agree to comply with these Terms of Service.
          Please read them carefully before using our services.
        </p>

        <section className="mt-10 space-y-8">

          <div>
            <h2 className="text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              By creating an account or using ContentPilot, you agree to
              these Terms of Service and all applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              2. Our Services
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              ContentPilot provides AI-powered content generation,
              scheduling, analytics, and social media publishing tools to
              help users manage their online presence efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              3. User Responsibilities
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Provide accurate account information.</li>
              <li>Keep your login credentials secure.</li>
              <li>Publish only content you have the right to use.</li>
              <li>Comply with the rules of connected social media platforms.</li>
              <li>Do not use the platform for unlawful or abusive activities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              4. Intellectual Property
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              The ContentPilot platform, branding, software, and original
              features are owned by ContentPilot. Users retain ownership of
              the content they create using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              5. Limitation of Liability
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              ContentPilot is provided "as is." We are not responsible for
              losses resulting from platform downtime, third-party service
              interruptions, or content published by users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              6. Account Suspension
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              We reserve the right to suspend or terminate accounts that
              violate these Terms or misuse the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              7. Changes to These Terms
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              We may update these Terms from time to time. Continued use of
              ContentPilot after changes are published constitutes
              acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              8. Contact
            </h2>

            <p className="mt-3 text-gray-700">
              Questions about these Terms may be sent to:
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