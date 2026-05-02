import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/actions/projects";
import { getClientById, getAllClients } from "@/lib/actions/clients";
import { ProjectHeader } from "@/components/dashboard/projects/details/ProjectHeader";
import { ProjectInfo } from "@/components/dashboard/projects/details/ProjectInfo";
import { ProjectClientCard } from "@/components/dashboard/projects/details/ProjectClientCard";
import { ProjectDetailActions } from "@/components/dashboard/projects/details/ProjectDetailActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  return {
    title: `${project?.name || "Project"} | Spark CRM`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const client = await getClientById(project.client_id);
  const allClients = await getAllClients();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProjectHeader project={project} clients={allClients} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectInfo project={project} />
          
          <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-bold">Project Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-8 text-center text-muted-foreground italic">
                No activities recorded for this project yet.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {client && <ProjectClientCard client={client} />}
          <ProjectDetailActions />
        </div>
      </div>
    </div>
  );
}
