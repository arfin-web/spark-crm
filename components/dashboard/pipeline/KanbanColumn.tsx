"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Project, ProjectStatus } from "@/lib/actions/projects";
import { KanbanCard } from "./KanbanCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  id: ProjectStatus;
  title: string;
  projects: Project[];
}

export function KanbanColumn({ id, title, projects }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "prospect": return "bg-muted text-muted-foreground";
      case "proposal_sent": return "bg-amber-500/10 text-amber-500";
      case "in_progress": return "bg-blue-500/10 text-blue-500";
      case "completed": return "bg-emerald-500/10 text-emerald-500";
      case "paused": return "bg-destructive/10 text-destructive";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-[280px] w-full max-w-[320px] h-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">{title}</h3>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold",
            getStatusColor(id)
          )}>
            {projects.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-3 p-2 rounded-2xl bg-muted/30 border border-border/50 min-h-[500px]"
      >
        <SortableContext 
          id={id}
          items={projects.map((p) => p.id)} 
          strategy={verticalListSortingStrategy}
        >
          {projects.map((project) => (
            <KanbanCard key={project.id} project={project} />
          ))}
        </SortableContext>
        
        {projects.length === 0 && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl m-2">
            <p className="text-xs text-muted-foreground italic">No projects</p>
          </div>
        )}
      </div>
    </div>
  );
}
