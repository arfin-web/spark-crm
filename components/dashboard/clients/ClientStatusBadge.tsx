import { Badge } from "@/components/ui/badge";

interface ClientStatusBadgeProps {
  status: string;
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 rounded-full px-3">
          Active
        </Badge>
      );
    case "inactive":
      return <Badge variant="secondary" className="rounded-full px-3">Inactive</Badge>;
    case "prospect":
      return (
        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 rounded-full px-3">
          Prospect
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
