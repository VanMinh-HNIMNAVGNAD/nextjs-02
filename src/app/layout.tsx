
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { PurchaseProvider } from "@/contexts/PurchaseContext";
import "./globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
      className={cn(
        "h-full antialiased font-sans",
        plusJakartaSans.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="min-h-full font-sans bg-slate-50/50 text-slate-900 selection:bg-slate-900 selection:text-white">
        <AuthProvider>
          <PurchaseProvider>
            <ProgressProvider>
              <AppShell>{children}</AppShell>
            </ProgressProvider>
          </PurchaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


