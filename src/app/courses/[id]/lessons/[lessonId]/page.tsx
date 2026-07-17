import Link from "next/link";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href={`/courses/${id}`}
        className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
      >
        Back to course
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        Lesson detail
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Course: <span className="font-semibold text-slate-950">{id}</span>
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Lesson:{" "}
        <span className="font-semibold text-slate-950">{lessonId}</span>
      </p>
    </section>
  );
}

