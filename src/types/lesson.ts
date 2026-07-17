export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface Lesson {
  id: string;
  courseId: string;
  name: string;
  title: string;
  duration: number;
  url: string;
  description: string;
  status: LessonStatus;
  order: number;
}

