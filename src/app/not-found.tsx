import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-text">404</h1>
      <p className="mt-4 text-lg text-text-muted">This page doesn't exist.</p>
      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-dim transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
