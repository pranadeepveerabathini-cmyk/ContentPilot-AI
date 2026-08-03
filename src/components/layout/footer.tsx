import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-600 md:flex-row">
        <div>
          © {new Date().getFullYear()} <strong>ContentPilot</strong>. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="hover:text-purple-600 transition"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="hover:text-purple-600 transition"
          >
            Terms of Service
          </Link>

          <Link
            href="/contact"
            className="hover:text-purple-600 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}