export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface Lesson {
  id: string;
  courseId: string;
  name: string;
  title: string;
  duration: number;
  thumbnailUrl: string;
  url: string;
  description: string;
  status: LessonStatus;
  order: number;
}
