"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course, CourseFilters } from "@/types";
import { fetchCourses } from "@/services/courseServices";

const defaultFilters: CourseFilters = {
  search: "",
  level: "All",
  kindOfCourse: "All",
};

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<CourseFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCourses() {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchCourses();

        if (active) {
          setCourses(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Khong the tai khoa hoc.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadCourses();

    return () => {
      active = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !searchValue ||
        course.title.toLowerCase().includes(searchValue) ||
        course.description.toLowerCase().includes(searchValue);
      const matchesLevel =
        filters.level === "All" || course.level === filters.level;
      const matchesKind =
        filters.kindOfCourse === "All" ||
        course.kindOfCourse === filters.kindOfCourse;

      return matchesSearch && matchesLevel && matchesKind;
    });
  }, [courses, filters]);

  return {
    courses,
    filteredCourses,
    filters,
    isLoading,
    error,
    setFilters,
  };
}

