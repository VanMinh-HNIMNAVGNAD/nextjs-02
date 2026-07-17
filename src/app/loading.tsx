import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <LoadingSkeleton />
    </section>
  );
}

