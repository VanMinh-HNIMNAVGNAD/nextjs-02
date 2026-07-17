import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import { fetchCourses } from "@/services/courseServices";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courses = await fetchCourses();
  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              {course.kindOfCourse}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {course.title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {course.description}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                {course.totalLessons} lessons
              </span>
              <span className="text-slate-500">{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} />
          </div>

          <Link
            href={`/courses/${course.id}/lessons/lesson-1`}
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto"
          >
            Start lesson
          </Link>
        </div>
      </div>
    </section>
  );
}

