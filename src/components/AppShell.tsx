import Header from "@/components/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}

