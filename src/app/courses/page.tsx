"use client";

import CourseCard from "@/components/CourseCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { COURSE_KIND_OPTIONS, COURSE_LEVEL_OPTIONS } from "@/lib/constants";
import type { CourseFilters } from "@/types";
import { useCourses } from "@/hooks/useCourses";
import { MagnifyingGlass, Funnel, Books } from "@phosphor-icons/react";

export default function CoursesPage() {
  const { filteredCourses, filters, isLoading, error, setFilters } =
    useCourses();

  function updateFilter<T extends keyof CourseFilters>(
    key: T,
    value: CourseFilters[T],
  ) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Books size={14} weight="duotone" className="text-emerald-600" />
            <span>Course Library</span>
          </div>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Search our library of interactive courses and filter by difficulty or category.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_150px_150px] lg:w-[640px]">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={filters.search}
              onChange={(event) => updateFilter("search", event.target.value)}
              placeholder="Search by title or topic..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none shadow-2xs transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/15"
            />
          </div>

          <div className="relative">
            <select
              value={filters.level}
              onChange={(event) =>
                updateFilter("level", event.target.value as CourseFilters["level"])
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none shadow-2xs transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/15 cursor-pointer"
              aria-label="Filter by level"
            >
              {COURSE_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level === "All" ? "All Levels" : level}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={filters.kindOfCourse}
              onChange={(event) =>
                updateFilter(
                  "kindOfCourse",
                  event.target.value as CourseFilters["kindOfCourse"],
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none shadow-2xs transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/15 cursor-pointer"
              aria-label="Filter by course type"
            >
              {COURSE_KIND_OPTIONS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind === "All" ? "All Types" : kind}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <Funnel size={28} weight="duotone" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            No matching courses found
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-600">
            Try adjusting your search terms, difficulty level, or course type filters.
          </p>
        </div>
      )}
    </section>
  );
}


