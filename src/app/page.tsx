import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  LockKey,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  const features = [
    {
      title: "Authentication",
      description: "Secure session management persisted directly in client storage.",
      icon: LockKey,
      color: "text-amber-500 bg-amber-50 border-amber-200/60",
    },
    {
      title: "Protected Routes",
      description: "Automated route guards seamlessly redirect unauthenticated users.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    },
    {
      title: "Instant Search & Filters",
      description: "Filter courses by level, category, and keyword in real-time.",
      icon: Lightning,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200/60",
    },
  ];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:py-20">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs backdrop-blur-xs">
          <Sparkle size={14} weight="fill" className="text-emerald-600 animate-pulse" />
          <span>Next-Gen Learning Experience</span>
        </div>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
          Learn courses with a{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
            protected dashboard
          </span>
          .
        </h1>

        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          Master new technical skills with interactive course modules, progress tracking,
          and protected dashboard access designed for modern web apps.
        </p>

        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
          <Link
            href="/courses"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
          >
            <span>Explore Courses</span>
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          >
            Sign In to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid flex-1 gap-4 sm:grid-cols-1">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${feature.color}`}>
                <Icon size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

