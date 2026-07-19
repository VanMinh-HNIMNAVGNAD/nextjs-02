"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { fetchLessonById } from "@/services/courseServices";
import type { Lesson } from "@/types";

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const resolvedParams = use(params);
  const { id, lessonId } = resolvedParams;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const { setLessonStatus, progressState } = useProgress();

  useEffect(() => {
    fetchLessonById(id, lessonId).then((data) => {
      if (data) {
        setLesson(data.lesson);
      }
    });
  }, [id, lessonId]);

  if (!lesson) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      </div>
    );
  } 

  const currentStatus = progressState[id]?.[lessonId] || lesson.status;

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href={`/courses/${id}`}
        className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
      >
        &larr; Back to course
      </Link>
      
      {/* Khung giả lập Video Player */}
      <div className="mt-6 aspect-video w-full rounded-lg bg-slate-900 flex items-center justify-center">
          <span className="text-white text-lg font-mono">Video Player (Tính năng phụ)</span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            {lesson.order}. {lesson.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="text-slate-500">{lesson.duration} minutes</span>
            <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-600 capitalize">
              {currentStatus.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* NÚT HOÀN THÀNH BÀI HỌC */}
        <button
          onClick={() => setLessonStatus(id, lessonId, "completed")}
          disabled={currentStatus === "completed"}
          className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {currentStatus === "completed" ? "✓ Completed" : "Mark as Completed"}
        </button>
      </div>
      
      <p className="mt-6 text-base leading-7 text-slate-600">
        {lesson.description}
      </p>
    </section>
  );
}