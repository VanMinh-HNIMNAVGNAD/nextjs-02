export type CourseLevel = "S" | "PRES" | "TC" | "MTC";
export type KindOfCourse = "IELTS" | "TOEIC" | "4SKILLS" | "VSTEP";
export type CourseStatus = "not-started" | "in-progress" | "completed";

export interface Course {
  id: string;
  name: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  level: CourseLevel;
  kindOfCourse: KindOfCourse;
  totalLessons: number;
  status: CourseStatus;
  progress: number;
}

export interface CourseFilters {
  search: string;
  level: CourseLevel | "All";
  kindOfCourse: KindOfCourse | "All";
}

