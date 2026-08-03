export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-lg">

        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          We'd love to hear from you.
        </p>

        <div className="mt-10 space-y-8">

          <div>
            <h2 className="text-2xl font-semibold">
              General Support
            </h2>

            <p className="mt-2 text-gray-700">
              support@contentpilot.app
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Business Inquiries
            </h2>

            <p className="mt-2 text-gray-700">
              business@contentpilot.app
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Website
            </h2>

            <p className="mt-2 text-blue-600">
              https://content-pilot-ai-qr6h-fawn.vercel.app
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Response Time
            </h2>

            <p className="mt-2 text-gray-700">
              We aim to respond to all inquiries within 24–48 hours.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}