import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-10 text-center sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-950">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/courses"
        className="mx-auto mt-6 rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Back to courses
      </Link>
    </section>
  );
}

