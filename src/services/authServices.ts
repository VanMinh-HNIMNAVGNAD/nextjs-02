import type { AuthUser, LoginCredentials } from "@/types";

interface MockAccount {
  user: AuthUser;
  passwordHash: string;
}

const MOCK_ACCOUNTS: MockAccount[] = [
  {
    user: {
      id: 1,
      username: "minh",
      email: "minh@example.com",
      firstName: "Minh",
      lastName: "Nguyen",
      image: "",
      accessToken: "demo-access-token-1",
    },
    passwordHash: "123456",
  },
  {
    user: {
      id: 2,
      username: "admin",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "System",
      image: "",
      accessToken: "demo-access-token-2",
    },
    passwordHash: "admin123",
  },
];

export async function loginService(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (!credentials.email || !credentials.password) {
    throw new Error("Vui lòng nhập đầy đủ email và mật khẩu.");
  }

  const matchedAccount = MOCK_ACCOUNTS.find(
    (acc) =>
      acc.user.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
      acc.passwordHash === credentials.password,
  );

  if (!matchedAccount) {
    throw new Error("Email hoặc mật khẩu không chính xác.");
  }

  return matchedAccount.user;
}


