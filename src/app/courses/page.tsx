"use client";

import CourseCard from "@/components/CourseCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { COURSE_KIND_OPTIONS, COURSE_LEVEL_OPTIONS } from "@/lib/constants";
import type { CourseFilters } from "@/types";
import { useCourses } from "@/hooks/useCourses";

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
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Course list
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Search courses and filter by level or course type.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_150px_150px] lg:w-[620px]">
          <input
            type="search"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search by title or description"
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />

          <select
            value={filters.level}
            onChange={(event) =>
              updateFilter("level", event.target.value as CourseFilters["level"])
            }
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            aria-label="Filter by level"
          >
            {COURSE_LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            value={filters.kindOfCourse}
            onChange={(event) =>
              updateFilter(
                "kindOfCourse",
                event.target.value as CourseFilters["kindOfCourse"],
              )
            }
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            aria-label="Filter by course type"
          >
            {COURSE_KIND_OPTIONS.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-950">
            No courses found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try a different keyword, level, or course type.
          </p>
        </div>
      )}
    </section>
  );
}

