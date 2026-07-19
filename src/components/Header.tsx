"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  House,
  Books,
  Info,
  SignOut,
  SignIn,
  User,
} from "@phosphor-icons/react";

const navigation = [
  { href: "/", label: "Home", icon: House },
  { href: "/courses", label: "Courses", icon: Books },
  { href: "/abouts", label: "About", icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const confirmLogout = async () => {
    setIsOpen(false);
    logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    return () => {};
  }, []);

  function handleLogout() {
    setIsOpen(true);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md transition-transform group-hover:scale-105">
            <GraduationCap size={22} weight="duotone" className="text-emerald-400" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            Course Learning
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all ${
                  active
                    ? "bg-slate-900 text-white shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <Icon size={18} weight={active ? "bold" : "regular"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-700 sm:flex border border-slate-200/60">
                <User size={16} weight="bold" className="text-slate-500" />
                <span className="max-w-[140px] truncate">{user?.email}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-medium text-slate-700 shadow-xs transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
              >
                <SignOut size={16} weight="bold" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
            >
              <SignIn size={18} weight="bold" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Logout</DialogTitle>
            <DialogDescription className="text-slate-500">
              Are you sure you want to log out of your session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl"
              onClick={confirmLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

