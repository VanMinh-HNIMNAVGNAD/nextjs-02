export default function ProgressBar({ value }: { value: number }) {
  const progress = Math.min(Math.max(value, 0), 100);

  return (
    <div className="h-2 rounded-full bg-slate-100" aria-label={`${progress}%`}>
      <div
        className="h-2 rounded-full bg-emerald-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

