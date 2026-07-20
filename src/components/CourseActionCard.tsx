"use client";

import { useState } from "react";
import Link from "next/link";
import type { Course } from "@/types";
import ProgressBar from "@/components/ProgressBar";
import BuyCourseModal from "@/components/BuyCourseModal";
import { usePurchase } from "@/contexts/PurchaseContext";
import {
  ShoppingCart,
  PlayCircle,
  CheckCircle,
  Lock,
  Tag,
  ChartBar,
  BookOpen,
} from "@phosphor-icons/react";

export default function CourseActionCard({ course }: { course: Course }) {
  const { isCoursePurchased, buyCourse } = usePurchase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const owned = isCoursePurchased(course.id, course.price);

  const formattedPrice = course.price
    ? `${course.price.toLocaleString("vi-VN")}đ`
    : "Miễn phí";

  const formattedOriginalPrice = course.originalPrice
    ? `${course.originalPrice.toLocaleString("vi-VN")}đ`
    : null;

  function handlePurchaseSuccess() {
    buyCourse(course.id);
  }

  const firstLessonId = course.lessons[0]?.id || "lesson-1";

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <Tag size={12} weight="bold" />
            {course.kindOfCourse}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
            <ChartBar size={12} weight="bold" />
            {course.level}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {course.title}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {course.description}
        </p>

        {/* Pricing Banner */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200/60">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Giá khóa học
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {formattedPrice}
            </span>
            {formattedOriginalPrice ? (
              <span className="text-sm font-medium text-slate-400 line-through">
                {formattedOriginalPrice}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <BookOpen size={16} weight="duotone" className="text-emerald-600" />
              <span>{course.totalLessons} bài học</span>
            </span>
            <span className="text-slate-900">{course.progress}% hoàn thành</span>
          </div>
          <ProgressBar value={course.progress} />
        </div>

        <div className="mt-6">
          {owned ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>Bạn đã sở hữu khóa học này!</span>
              </div>

              <Link
                href={`/courses/${course.id}/lessons/${firstLessonId}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
              >
                <PlayCircle size={20} weight="bold" />
                <span>Vào học ngay</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
              >
                <ShoppingCart size={20} weight="bold" />
                <span>Mua khóa học ngay ({formattedPrice})</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
                <Lock size={14} weight="bold" />
                <span>Mua 1 lần, sở hữu trọn đời</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <BuyCourseModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </>
  );
}
