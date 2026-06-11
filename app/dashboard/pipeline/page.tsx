import { Metadata } from "next";
import { getProjects } from "@/app/actions/projects";
import { KanbanBoard } from "@/components/dashboard/pipeline/KanbanBoard";

export const metadata: Metadata = {
  title: "Pipeline | Spark CRM",
};

export default async function PipelinePage() {
  const { data } = await getProjects({ limit: 100 }); // Fetch all for Kanban

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Project Pipeline</h1>
        <p className="text-muted-foreground mt-1">Drag and drop projects to manage your workflow stages.</p>
      </div>

      <div className="flex-1 -mx-4 px-4 overflow-hidden">
        <KanbanBoard initialProjects={data} />
      </div>
    </div>
  );
}