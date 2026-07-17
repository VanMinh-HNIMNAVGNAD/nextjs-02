import { LESSON_PROGRESS_STORAGE_KEY } from "@/lib/constants";
import type { LessonStatus } from "@/types";
import type { LessonProgressState } from "@/lib/progress";

function isLessonStatus(value: unknown): value is LessonStatus {
  return (
    value === "not-started" ||
    value === "in-progress" ||
    value === "completed"
  );
}

function normalizeLessonProgress(value: unknown): LessonProgressState {
  if (!value || typeof value !== "object") {
    return {};
  }

  const nextState: LessonProgressState = {};

  for (const [courseId, courseValue] of Object.entries(
    value as Record<string, unknown>,
  )) {
    if (Array.isArray(courseValue)) {
      nextState[courseId] = Object.fromEntries(
        courseValue.filter((lessonId): lessonId is string => typeof lessonId === "string").map(
          (lessonId) => [lessonId, "completed" as LessonStatus],
        ),
      );
      continue;
    }

    if (!courseValue || typeof courseValue !== "object") {
      continue;
    }

    const lessonState: Record<string, LessonStatus> = {};

    for (const [lessonId, lessonStatus] of Object.entries(
      courseValue as Record<string, unknown>,
    )) {
      if (typeof lessonId !== "string" || !isLessonStatus(lessonStatus)) {
        continue;
      }

      lessonState[lessonId] = lessonStatus;
    }

    if (Object.keys(lessonState).length > 0) {
      nextState[courseId] = lessonState;
    }
  }

  return nextState;
}

export function getStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
}

export function getLessonProgressState() {
  return normalizeLessonProgress(
    getStorageItem<LessonProgressState>(LESSON_PROGRESS_STORAGE_KEY),
  );
}

export function setLessonProgressState(state: LessonProgressState) {
  setStorageItem(LESSON_PROGRESS_STORAGE_KEY, state);
}

export function getLessonStatus(courseId: string, lessonId: string) {
  return getLessonProgressState()[courseId]?.[lessonId] ?? null;
}

export function setLessonStatus(
  courseId: string,
  lessonId: string,
  status: LessonStatus,
) {
  const progressState = getLessonProgressState();

  setLessonProgressState({
    ...progressState,
    [courseId]: {
      ...(progressState[courseId] ?? {}),
      [lessonId]: status,
    },
  });
}

export function getCompletedLessonIds(courseId: string) {
  return Object.entries(getLessonProgressState()[courseId] ?? {})
    .filter(([, status]) => status === "completed")
    .map(([lessonId]) => lessonId);
}

export function setLessonCompleted(courseId: string, lessonId: string) {
  setLessonStatus(courseId, lessonId, "completed");
}

export function isLessonCompleted(courseId: string, lessonId: string) {
  return getLessonStatus(courseId, lessonId) === "completed";
}

