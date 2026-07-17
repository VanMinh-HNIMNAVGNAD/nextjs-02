import { LESSON_PROGRESS_STORAGE_KEY } from "@/lib/constants";

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

type LessonProgress = Record<string, string[]>;

export function getCompletedLessonIds(courseId: string) {
  const progress = getStorageItem<LessonProgress>(LESSON_PROGRESS_STORAGE_KEY);

  return progress?.[courseId] ?? [];
}

export function setLessonCompleted(courseId: string, lessonId: string) {
  const progress = getStorageItem<LessonProgress>(LESSON_PROGRESS_STORAGE_KEY) ?? {};
  const completedLessons = new Set(progress[courseId] ?? []);
  completedLessons.add(lessonId);

  setStorageItem(LESSON_PROGRESS_STORAGE_KEY, {
    ...progress,
    [courseId]: Array.from(completedLessons),
  });
}

export function isLessonCompleted(courseId: string, lessonId: string) {
  return getCompletedLessonIds(courseId).includes(lessonId);
}
