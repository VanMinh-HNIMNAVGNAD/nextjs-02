import type { AuthUser } from "@/types";
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_STORAGE_KEY,
} from "@/lib/constants";
import { removeStorageItem, setStorageItem } from "@/lib/storage";

export function persistAuthSession(user: AuthUser) {
  setStorageItem(AUTH_STORAGE_KEY, user);
  document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function clearAuthSession() {
  removeStorageItem(AUTH_STORAGE_KEY);
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

