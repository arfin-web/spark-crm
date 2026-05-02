import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/lib/actions/projects";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  switch (status) {
    case "in_progress":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20 rounded-full px-3">
          In Progress
        </Badge>
      );
    case "proposal_sent":
      return (
        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 rounded-full px-3">
          Proposal Sent
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 rounded-full px-3">
          Completed
        </Badge>
      );
    case "prospect":
      return (
        <Badge className="bg-muted text-muted-foreground border-border rounded-full px-3">
          Prospect
        </Badge>
      );
    case "paused":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20 rounded-full px-3">
          Paused
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
