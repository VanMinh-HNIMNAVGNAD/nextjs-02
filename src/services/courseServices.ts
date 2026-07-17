import type { Course } from "@/types";
import { apiFetch } from "@/lib/api";
import { COURSE_API_PATH } from "@/lib/constants";

const mockCourses: Course[] = [
  {
    id: "ielts-foundation",
    name: "ielts-foundation",
    title: "IELTS Foundation",
    description:
      "Build core IELTS skills with guided lessons, vocabulary practice, and short checkpoint quizzes for daily progress.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    level: "S",
    kindOfCourse: "IELTS",
    totalLessons: 12,
    status: "in-progress",
    progress: 35,
  },
  {
    id: "toeic-practice",
    name: "toeic-practice",
    title: "TOEIC Practice",
    description:
      "Practice TOEIC listening and reading with timed drills, answer reviews, and focused grammar refreshers.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    level: "PRES",
    kindOfCourse: "TOEIC",
    totalLessons: 18,
    status: "in-progress",
    progress: 62,
  },
  {
    id: "four-skills-intensive",
    name: "four-skills-intensive",
    title: "4 Skills Intensive",
    description:
      "Improve speaking, listening, reading, and writing through practical tasks designed for repeat study sessions.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    level: "TC",
    kindOfCourse: "4SKILLS",
    totalLessons: 20,
    status: "not-started",
    progress: 0,
  },
  {
    id: "vstep-speaking",
    name: "vstep-speaking",
    title: "VSTEP Speaking",
    description:
      "Prepare for VSTEP speaking topics with model answers, fluency exercises, and rubric-based self checks.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    level: "MTC",
    kindOfCourse: "VSTEP",
    totalLessons: 10,
    status: "completed",
    progress: 100,
  },
];

export async function fetchCourses(): Promise<Course[]> {
  try {
    return await apiFetch<Course[]>(COURSE_API_PATH);
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCourses;
  }
}
