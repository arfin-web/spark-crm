import { 
  Building2, 
  Calendar, 
  DollarSign, 
  Filter 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/actions/projects";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectPagination } from "./ProjectPagination";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectRowActions } from "./ProjectRowActions";

interface ProjectsListProps {
  projects: Project[];
  clients: { id: string; name: string }[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function ProjectsList({
  projects,
  clients,
  totalCount,
  totalPages,
  currentPage
}: ProjectsListProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ProjectSearch />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-border bg-card">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="font-bold text-foreground">Project</TableHead>
              <TableHead className="font-bold text-foreground">Client</TableHead>
              <TableHead className="font-bold text-foreground">Status</TableHead>
              <TableHead className="font-bold text-foreground">Budget</TableHead>
              <TableHead className="font-bold text-foreground">Timeline</TableHead>
              <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic border-none">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/20 transition-colors border-border">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{project.name}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                        {project.description || "No description"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {project.client_name || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-medium text-foreground">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      {formatCurrency(project.budget)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.start_date ? new Date(project.start_date).toLocaleDateString() : "TBD"}
                      </span>
                      {project.end_date && (
                        <span className="text-[10px] ml-4 text-muted-foreground/70">
                          to {new Date(project.end_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <ProjectRowActions project={project} clients={clients} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectPagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
        currentCount={projects.length}
      />
    </div>
  );
}
