import type { Course, Lesson } from "@/types";
import { apiFetch } from "@/lib/api";
import { COURSE_API_PATH } from "@/lib/constants";

function createLessons(
  courseId: string,
  titles: string[],
  thumbnailUrl: string,
): Lesson[] {
  return titles.map((title, index) => ({
    id: `lesson-${index + 1}`,
    courseId,
    name: title.toLowerCase().replaceAll(" ", "-"),
    title,
    duration: 12 + index * 4,
    thumbnailUrl,
    url: "",
    description:
      "Review the key concept, complete the guided activity, and mark the lesson as completed when finished.",
    status: index === 0 ? "in-progress" : "not-started",
    order: index + 1,
  }));
}

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
    totalLessons: 1200,
    status: "in-progress",
    progress: 35,
    price: 499000,
    originalPrice: 799000,
    lessons: createLessons(
      "ielts-foundation",
      [
        "IELTS overview and study plan",
        "Listening section format",
        "Reading skimming practice",
        "Writing task 1 essentials",
      ],
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    ),
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
    price: 350000,
    originalPrice: 500000,
    lessons: createLessons(
      "toeic-practice",
      [
        "TOEIC timing strategy",
        "Photograph questions",
        "Short conversations",
        "Reading grammar drills",
      ],
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    ),
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
    price: 890000,
    originalPrice: 1200000,
    lessons: createLessons(
      "four-skills-intensive",
      [
        "Speaking warm-up routine",
        "Listening note-taking",
        "Reading for main ideas",
        "Writing clear paragraphs",
      ],
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    ),
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
    price: 0, // Free course
    lessons: createLessons(
      "vstep-speaking",
      [
        "VSTEP speaking format",
        "Part 1 personal questions",
        "Part 2 solution talk",
        "Part 3 discussion practice",
      ],
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    ).map((lesson) => ({ ...lesson, status: "completed" })),
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

export async function fetchCourseById(courseId: string) {
  const courses = await fetchCourses();

  return courses.find((course) => course.id === courseId) ?? null;
}

export async function fetchLessonById(courseId: string, lessonId: string) {
  const course = await fetchCourseById(courseId);

  if (!course) {
    return null;
  }

  const lesson = course.lessons.find((item) => item.id === lessonId);

  return lesson ? { course, lesson } : null;
}
