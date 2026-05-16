"use client";

import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Building2, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/actions/projects";

interface KanbanCardProps {
  project: Project;
}

export function KanbanCard({ project }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
    data: {
      type: "Project",
      project,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 h-[140px] min-h-[140px] rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-border rounded-2xl overflow-hidden bg-card"
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col space-y-1">
          <Link
            href={`/dashboard/projects/${project.id}`}
            className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking link
          >
            {project.name}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span className="line-clamp-1">{project.client_name || "N/A"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1 font-bold text-xs text-foreground">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            {formatCurrency(project.budget)}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {project.end_date ? new Date(project.end_date).toLocaleDateString() : "No date"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
