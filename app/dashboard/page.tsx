import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, Briefcase, Activity } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Leads", value: "124", icon: Users, trend: "+12% from last month" },
    { title: "Active Projects", value: "12", icon: Briefcase, trend: "4 closing soon" },
    { title: "Pipeline Value", value: "$45,200", icon: Sparkles, trend: "+$5.2k this week" },
    { title: "Recent Activity", value: "24", icon: Activity, trend: "6 pending actions" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back to Spark CRM. Here's what's happening with your agency today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for more dashboard content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 border-none shadow-sm bg-card aspect-video flex items-center justify-center text-muted-foreground italic">
          [Main Chart Area - Coming Soon]
        </Card>
        <Card className="col-span-3 border-none shadow-sm bg-card aspect-video flex items-center justify-center text-muted-foreground italic">
          [Recent Activity List - Coming Soon]
        </Card>
      </div>
    </div>
  );
}
