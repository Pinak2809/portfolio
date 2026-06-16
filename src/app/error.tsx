"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-text">Something went wrong</h1>
      <p className="mt-4 text-text-muted">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-8 inline-block px-6 py-3 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-dim transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
