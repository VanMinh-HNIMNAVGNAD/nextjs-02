import Link from "next/link";
import type { Lesson } from "@/types";

export default function LessonItem({ lesson }: { lesson: Lesson }) {
  return (
    <Link
      href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          {lesson.order}. {lesson.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{lesson.duration} minutes</p>
      </div>
      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
        {lesson.status}
      </span>
    </Link>
  );
}

