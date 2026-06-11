import Link from "next/link";
import { ChevronLeft, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { Project } from "@/app/actions/projects";
import { EditProjectDialog } from "../EditProjectDialog";
import { formatDate } from "@/lib/utils";

interface ProjectHeaderProps {
  project: Project;
  clients: { id: string; name: string }[];
}

export function ProjectHeader({ project, clients }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link 
        href="/dashboard/projects" 
        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Projects
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            {project.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">{project.name}</h1>
              <ProjectStatusBadge status={project.status as any} />
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.start_date ? formatDate(project.start_date) : "No start date"}
              </span>
              {project.end_date && (
                <span className="flex items-center gap-1">
                  <span>→</span>
                  {formatDate(project.end_date)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <EditProjectDialog project={project} clients={clients} />
          <Button variant="destructive" size="sm" className="rounded-xl shadow-lg shadow-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
