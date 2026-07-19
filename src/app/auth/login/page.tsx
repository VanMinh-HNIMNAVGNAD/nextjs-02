"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LockKey, WarningCircle, Key, UserCheck } from "@phosphor-icons/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [email, setEmail] = useState("minh@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = searchParams.get("next") || "/courses";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isLoading, nextPath, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.replace(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function applyQuickAccount(accEmail: string, accPass: string) {
    setEmail(accEmail);
    setPassword(accPass);
    setError("");
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-12 sm:px-6">
      <div className="grid w-full gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <LockKey size={16} weight="duotone" className="text-emerald-600" />
            <span>Secure Authentication</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Đăng nhập tài khoản
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            Hệ thống đã bật kiểm tra thông tin đăng nhập. Chỉ tài khoản demo hợp lệ mới có thể vào Dashboard khóa học.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs max-w-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Key size={18} weight="duotone" className="text-emerald-600" />
              <span>Tài khoản Test hợp lệ (nhấn để điền):</span>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => applyQuickAccount("minh@example.com", "123456")}
                className="flex flex-col text-left rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs transition hover:border-emerald-500 hover:bg-emerald-50/50"
              >
                <span className="font-semibold text-slate-900">User Minh</span>
                <span className="text-slate-600">minh@example.com</span>
                <span className="text-slate-500 mt-0.5">Pass: 123456</span>
              </button>

              <button
                type="button"
                onClick={() => applyQuickAccount("admin@example.com", "admin123")}
                className="flex flex-col text-left rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs transition hover:border-emerald-500 hover:bg-emerald-50/50"
              >
                <span className="font-semibold text-slate-900">Admin System</span>
                <span className="text-slate-600">admin@example.com</span>
                <span className="text-slate-500 mt-0.5">Pass: admin123</span>
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-900"
              >
                Email đăng nhập
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-2xs transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/15"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-900"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-2xs transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/15"
                placeholder="Nhập mật khẩu..."
                required
              />
            </div>

            {error ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-700">
                <WarningCircle size={18} weight="bold" className="shrink-0 text-red-600 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95"
            >
              {isSubmitting ? (
                <span>Đang đăng nhập...</span>
              ) : (
                <>
                  <UserCheck size={18} weight="bold" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

