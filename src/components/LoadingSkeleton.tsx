export default function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs"
        >
          <div className="aspect-video animate-pulse bg-slate-200/70" />
          <div className="space-y-3.5 p-5">
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200/70" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200/70" />
            </div>
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200/70" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-slate-200/70" />
            <div className="h-4 w-2/3 animate-pulse rounded-lg bg-slate-200/70" />
            <div className="pt-3 border-t border-slate-100">
              <div className="h-2 w-full animate-pulse rounded-full bg-slate-200/70" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


