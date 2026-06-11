import { Metadata } from "next";
import { getActivities } from "@/app/actions/activities";
import { ActivityTimeline } from "@/components/dashboard/activities/ActivityTimeline";
import { ActivityLogDialog } from "@/components/dashboard/activities/ActivityLogDialog";
import { Search, Filter, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Activities | Spark CRM",
};

export default async function ActivitiesPage() {
  const activities = await getActivities({ limit: 30 });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Activity Feed</h1>
          <p className="text-muted-foreground mt-1">Track all interactions and updates across your agency.</p>
        </div>
        <ActivityLogDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter activities..."
                className="pl-10 h-10 rounded-xl bg-muted/30 border-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl border-border h-10">
                <Filter className="mr-2 h-4 w-4" />
                Type
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl border-border h-10">
                All Time
              </Button>
            </div>
          </div>

          <ActivityTimeline activities={activities} />
        </div>

        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <History className="h-5 w-5" />
              <h3 className="font-bold">Interaction Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 p-3 rounded-2xl border border-border/50 text-center">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">This Week</p>
              </div>
              <div className="bg-background/50 p-3 rounded-2xl border border-border/50 text-center">
                <p className="text-2xl font-bold text-foreground">48</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">This Month</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your interaction frequency is <strong>up 15%</strong> compared to last month. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}