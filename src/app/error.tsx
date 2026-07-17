"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-10 text-center sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-950">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mx-auto mt-6 rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Try again
      </button>
    </section>
  );
}

