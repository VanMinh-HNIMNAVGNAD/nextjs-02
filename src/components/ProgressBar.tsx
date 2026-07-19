export default function ProgressBar({ value }: { value: number }) {
  const progress = Math.min(Math.max(value, 0), 100);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200/50" aria-label={`${progress}%`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}


