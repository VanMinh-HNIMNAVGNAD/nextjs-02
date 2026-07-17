export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const AUTH_STORAGE_KEY = "nextjs2.auth.user";
export const AUTH_COOKIE_NAME = "nextjs2_auth";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const COURSE_API_PATH = "/courses";
export const LESSON_PROGRESS_STORAGE_KEY = "nextjs2.lesson.progress";

export const COURSE_LEVEL_OPTIONS = ["All", "S", "PRES", "TC", "MTC"] as const;
export const COURSE_KIND_OPTIONS = [
  "All",
  "IELTS",
  "TOEIC",
  "4SKILLS",
  "VSTEP",
] as const;
