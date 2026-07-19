import Image from "next/image";
import { notFound } from "next/navigation";
import LessonItem from "@/components/LessonItem";
import CourseActionCard from "@/components/CourseActionCard";
import { fetchCourses } from "@/services/courseServices";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courses = await fetchCourses();
  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-slate-200/80">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Danh sách bài học ({course.lessons.length})
            </h2>
            <div className="flex flex-col gap-3">
              {course.lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <CourseActionCard course={course} />
        </div>
      </div>
    </section>
  );
}