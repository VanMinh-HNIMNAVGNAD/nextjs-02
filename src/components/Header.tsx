"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { href: "/", label: "Trang chu" },
  { href: "/courses", label: "Khoa hoc" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Course Learning
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 font-medium transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="hidden text-slate-600 sm:inline">
                {user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md bg-emerald-600 px-3 py-2 font-medium text-white transition hover:bg-emerald-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

