"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LessonStatus } from "@/types";
import type { LessonProgressState } from "@/lib/progress";
import {
  getLessonProgressState,
  setLessonProgressState,
} from "@/lib/storage";

interface ProgressContextValue {
  progressState: LessonProgressState;
  isLoading: boolean;
  setLessonStatus: (
    courseId: string,
    lessonId: string,
    status: LessonStatus,
  ) => void;
  resetCourseProgress: (courseId: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined,
);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progressState, setProgressState] = useState<LessonProgressState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProgressState(getLessonProgressState());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setLessonProgressState(progressState);
  }, [isLoading, progressState]);

  const setLessonStatus = useCallback(
    (courseId: string, lessonId: string, status: LessonStatus) => {
      setProgressState((current) => ({
        ...current,
        [courseId]: {
          ...(current[courseId] ?? {}),
          [lessonId]: status,
        },
      }));
    },
    [],
  );

  const resetCourseProgress = useCallback((courseId: string) => {
    setProgressState((current) => {
      if (!current[courseId]) {
        return current;
      }

      const nextState = { ...current };
      delete nextState[courseId];
      return nextState;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progressState,
      isLoading,
      setLessonStatus,
      resetCourseProgress,
    }),
    [isLoading, progressState, resetCourseProgress, setLessonStatus],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
}