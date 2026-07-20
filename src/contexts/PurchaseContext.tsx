"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const PURCHASED_COURSES_KEY = "purchased_courses_v1";

interface PurchaseContextValue {
  purchasedCourseIds: string[];
  isCoursePurchased: (courseId: string, price?: number) => boolean;
  buyCourse: (courseId: string) => void;
}

const PurchaseContext = createContext<PurchaseContextValue | undefined>(
  undefined,
);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  // Pre-enroll default courses (e.g. ielts-foundation, vstep-speaking) for demo continuity
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([
    "ielts-foundation",
    "vstep-speaking",
  ]);

  useEffect(() => {
    const saved = getStorageItem<string[]>(PURCHASED_COURSES_KEY);
    if (saved && Array.isArray(saved)) {
      setPurchasedCourseIds(saved);
    } else {
      setStorageItem(PURCHASED_COURSES_KEY, ["ielts-foundation", "vstep-speaking"]);
    }
  }, []);

  const buyCourse = useCallback((courseId: string) => {
    setPurchasedCourseIds((prev) => {
      if (prev.includes(courseId)) return prev;
      const next = [...prev, courseId];
      setStorageItem(PURCHASED_COURSES_KEY, next);
      return next;
    });
  }, []);

  const isCoursePurchased = useCallback(
    (courseId: string, price?: number) => {
      if (price === 0) return true;
      return purchasedCourseIds.includes(courseId);
    },
    [purchasedCourseIds],
  );

  const value = useMemo(
    () => ({
      purchasedCourseIds,
      isCoursePurchased,
      buyCourse,
    }),
    [purchasedCourseIds, isCoursePurchased, buyCourse],
  );

  return (
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase must be used inside PurchaseProvider");
  }
  return context;
}
