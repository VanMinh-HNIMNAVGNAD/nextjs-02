
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

export const metadata: Metadata = {
  title: "Course Learning",
  description: "Responsive course learning app with basic auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full">
        <AuthProvider>
          <ProgressProvider>
            <AppShell>{children}</AppShell>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
