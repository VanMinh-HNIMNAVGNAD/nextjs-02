import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Learn courses with a protected dashboard.
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          Login, logout, protected routes, and a mobile-first base layout are
          ready for the next course features.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Open courses
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {[
          ["Auth", "Session is persisted in localStorage."],
          ["Protected", "Course pages redirect anonymous users."],
          ["Course search and filters are ready."],
        ].map(([title, description]) => (
          <div
            key={title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
