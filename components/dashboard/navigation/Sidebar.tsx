"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  KanbanSquare,
  FileText,
  Activity,
  Sparkles
} from "lucide-react";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Pipeline", href: "/dashboard/pipeline", icon: KanbanSquare },
  { name: "Proposals", href: "/dashboard/proposals", icon: FileText },
  { name: "Activities", href: "/dashboard/activities", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-border bg-card">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight font-heading">
            Spark <span className="text-primary">CRM</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <LogoutButton />
      </div>
    </aside>
  );
}
