import type { CourseLevel } from "./course";

export type {
    Course,
    CourseFilters,
    CourseLevel,
    CourseStatus,
    KindOfCourse,
} from "./course";
export type { Lesson, LessonStatus } from "./lesson";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    accessToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export interface Paginate<T>{
    items: T[];
    total: number;
    page: number;
    page_Size: number;
    totalPages: number;
}

export type LevelFiller = CourseLevel | "All";
