import type { AuthUser, LoginCredentials } from "@/types";

const DEMO_USER: AuthUser = {
  id: 1,
  username: "minh",
  email: "minh@example.com",
  firstName: "Minh",
  lastName: "Nguyen",
  image: "",
  accessToken: "demo-access-token",
};

export async function loginService(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (!credentials.email || !credentials.password) {
    throw new Error("Vui long nhap email va mat khau.");
  }

  if (credentials.password.length < 6) {
    throw new Error("Mat khau phai co it nhat 6 ky tu.");
  }

  return {
    ...DEMO_USER,
    email: credentials.email,
    username: credentials.email.split("@")[0] || DEMO_USER.username,
  };
}

