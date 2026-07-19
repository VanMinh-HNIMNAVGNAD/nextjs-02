"use client";

import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types";
import { truncate } from "@/utils/truncate";
import ProgressBar from "@/components/ProgressBar";
import { BookOpen, ChartBar, Tag, CheckCircle } from "@phosphor-icons/react";
import { usePurchase } from "@/contexts/PurchaseContext";

export default function CourseCard({ course }: { course: Course }) {
  const { isCoursePurchased } = usePurchase();
  const owned = isCoursePurchased(course.id, course.price);

  const formattedPrice = course.price
    ? `${course.price.toLocaleString("vi-VN")}đ`
    : "Miễn phí";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
      <Link href={`/courses/${course.id}`} className="block relative overflow-hidden">
        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Price / Purchased Badge Overlay */}
          <div className="absolute top-3 right-3">
            {owned ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                <CheckCircle size={14} weight="fill" />
                <span>Đã sở hữu</span>
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                {formattedPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <Tag size={12} weight="bold" />
            {course.kindOfCourse}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
            <ChartBar size={12} weight="bold" />
            {course.level}
          </span>
        </div>

        <Link href={`/courses/${course.id}`} className="block group/title">
          <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover/title:text-emerald-600 line-clamp-1">
            {course.title}
          </h2>
        </Link>
        <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-600">
          {truncate(course.description, 118)}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="mb-2 flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <BookOpen size={16} weight="duotone" className="text-emerald-600" />
              <span>{course.totalLessons} lessons</span>
            </span>
            <span className="font-semibold text-slate-900">{course.progress}%</span>
          </div>
          <ProgressBar value={course.progress} />
        </div>
      </div>
    </article>
  );
}



