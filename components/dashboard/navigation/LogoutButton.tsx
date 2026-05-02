"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Simulate logout logic
    console.log("Logging out...");
    localStorage.removeItem("spark_auth_token");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
        "text-muted-foreground hover:bg-destructive/10 hover:text-destructive group"
      )}
    >
      <LogOut className="h-5 w-5 transition-colors group-hover:text-destructive" />
      Logout
    </button>
  );
}
