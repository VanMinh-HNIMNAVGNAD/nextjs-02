"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthContextValue, AuthUser, LoginCredentials } from "@/types";
import { clearAuthSession, persistAuthSession } from "@/lib/auth";
import { AUTH_STORAGE_KEY } from "@/lib/constants";
import { getStorageItem } from "@/lib/storage";
import { loginService } from "@/services/authServices";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setUser(getStorageItem<AuthUser>(AUTH_STORAGE_KEY));
      setIsLoading(false);
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const authenticatedUser = await loginService(credentials);
    setUser(authenticatedUser);
    persistAuthSession(authenticatedUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuthSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [isLoading, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
