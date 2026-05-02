import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Brand Side (Visible on Desktop) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-muted/30 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight font-heading">
            Spark <span className="text-primary">CRM</span>
          </span>
        </Link>

        <div className="relative z-10">
          <blockquote className="space-y-2">
            <p className="text-3xl font-medium font-heading tracking-tight leading-tight">
              "The most intuitive CRM we've ever used. It actually feels like it was built for agencies."
            </p>
            <footer className="text-lg text-muted-foreground">
              — Sarah Johnson, Founder of Vortex Tech
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Spark CRM. All rights reserved.
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="lg:hidden flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-heading">Spark CRM</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
