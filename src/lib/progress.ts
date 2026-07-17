import type { Course, CourseStatus, Lesson, LessonStatus } from "@/types";

export type LessonProgressState = Record<string, Record<string, LessonStatus>>;

export function getLessonStatus(
  courseId: string,
  lessonId: string,
  lessons: LessonProgressState,
  fallback: LessonStatus,
) {
  return lessons[courseId]?.[lessonId] ?? fallback;
}

export function getEffectiveLessons(
  courseId: string,
  lessons: Lesson[],
  progressState: LessonProgressState,
) {
  return lessons.map((lesson) => ({
    ...lesson,
    status: getLessonStatus(courseId, lesson.id, progressState, lesson.status),
  }));
}

export function getCourseProgress(lessons: Lesson[]) {
  if (lessons.length === 0) {
    return 0;
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "completed",
  ).length;

  return Math.round((completedLessons / lessons.length) * 100);
}

export function getCourseStatus(lessons: Lesson[]): CourseStatus {
  if (lessons.length === 0) {
    return "not-started";
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "completed",
  ).length;

  if (completedLessons === lessons.length) {
    return "completed";
  }

  return lessons.some((lesson) => lesson.status === "in-progress")
    ? "in-progress"
    : "not-started";
}

export function applyLessonProgress(
  course: Course,
  progressState: LessonProgressState,
) {
  const lessons = getEffectiveLessons(course.id, course.lessons, progressState);

  return {
    ...course,
    lessons,
    progress: getCourseProgress(lessons),
    status: getCourseStatus(lessons),
  };
}

export function getNextLesson(lessons: Lesson[]) {
  return (
    lessons.find((lesson) => lesson.status !== "completed") ??
    lessons[lessons.length - 1] ??
    null
  );
}

