import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types";
import { truncate } from "@/utils/truncate";
import ProgressBar from "@/components/ProgressBar";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/courses/${course.id}`} className="block">
        <div className="relative aspect-video bg-slate-100">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            {course.kindOfCourse}
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
            {course.level}
          </span>
        </div>

        <Link href={`/courses/${course.id}`} className="block">
          <h2 className="text-lg font-semibold text-slate-950">
            {course.title}
          </h2>
        </Link>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
          {truncate(course.description, 118)}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              {course.totalLessons} lessons
            </span>
            <span className="text-slate-500">{course.progress}%</span>
          </div>
          <ProgressBar value={course.progress} />
        </div>
      </div>
    </article>
  );
}

