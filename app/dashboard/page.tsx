import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, Briefcase, Activity } from "lucide-react";
import { getClients } from "@/app/actions/clients";
import { getProjects } from "@/app/actions/projects";
import { getProposals } from "@/app/actions/proposals";
import { MainChart } from "@/components/dashboard/overview/MainChart";

export default async function DashboardOverview() {
  // Fetch all collections concurrently to minimize TTFB (Time to First Byte)
  const [clientsRes, projectsRes, proposalsRes] = await Promise.all([
    getClients().catch(() => ({ data: [] })),
    getProjects().catch(() => ({ data: [] })),
    getProposals().catch(() => ({ data: [], total: 0 })),
  ]);

  const clients = clientsRes?.data || [];
  const projects = projectsRes?.data || [];
  const proposals = proposalsRes?.data || [];

  // 1. Dynamic Total Leads (e.g., clients with 'prospect' status)
  const prospectsCount = clients.filter((c: any) => c.status === "prospect").length;
  const totalClientsCount = clients.length;

  // 2. Dynamic Active Projects (e.g., projects that are currently active)
  const activeProjectsCount = projects.filter((p: any) => p.status === "active" || p.status === "in_progress").length;

  // 3. Dynamic Pipeline Value (Sum of cost from proposals in 'draft' or 'sent' status)
  const pipelineValue = proposals
    .filter((p: any) => p.status === "draft" || p.status === "sent")
    .reduce((sum: number, p: any) => {
      const costNum = p.cost ? parseFloat(p.cost) : 0;
      return sum + (isNaN(costNum) ? 0 : costNum);
    }, 0);

  // Format currency dynamically
  const formattedPipeline = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(pipelineValue);

  // 4. Dynamic Recent Activity (Total number of items requiring attention)
  const totalProposalsCount = proposalsRes?.total || proposals.length;

  const stats = [
    {
      title: "Total Prospects",
      value: String(prospectsCount),
      icon: Users,
      trend: `${totalClientsCount} total records in CRM`
    },
    {
      title: "Active Projects",
      value: String(activeProjectsCount),
      icon: Briefcase,
      trend: `${projects.length - activeProjectsCount} completed or paused`
    },
    {
      title: "Pipeline Value",
      value: formattedPipeline,
      icon: Sparkles,
      trend: "From draft & sent proposals"
    },
    {
      title: "Total Proposals",
      value: String(totalProposalsCount),
      icon: Activity,
      trend: `${proposals.filter((p: any) => p.status === "accepted").length} successfully won`
    },
  ];

  const statsForChart = stats.map((stat) => ({
    title: stat.title,
    value: stat.value,
    trend: stat.trend,
  }));

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 border-none shadow-sm bg-card aspect-video flex items-center justify-center text-muted-foreground italic">
          <MainChart statistics={statsForChart} />
        </Card>
        <Card className="col-span-3 border-none shadow-sm bg-card aspect-video flex items-center justify-center text-muted-foreground italic">
          [Recent Activity List - Coming Soon]
        </Card>
      </div>
    </div>
  );
}