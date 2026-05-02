import { Sidebar } from "@/components/dashboard/navigation/Sidebar";
import { Header } from "@/components/dashboard/navigation/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
