export * from "./constants";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://dummyjson.com";

export const COURSES_PER_PAGE = 10;

export const STORAGES_KEY = {
    AUTH: "auth",
    PROGRESS: "progress"
}as const;

export const COURESE_LEVEL = ['All', 'S', 'Pres', 'TC', 'MTC'];

export const LEVEL_LABEL: Record<string, string> = {
    All: 'Tất cả',
    S: 'Sơ Cấp',
    TC: 'Trung Cấp',
    MTC: 'Nâng Cao' };
