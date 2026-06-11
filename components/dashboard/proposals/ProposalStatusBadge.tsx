import { Badge } from "@/components/ui/badge";
import { ProposalStatus } from "@/app/actions/proposals";

interface ProposalStatusBadgeProps {
  status: string | undefined;
}

export function ProposalStatusBadge({ status }: ProposalStatusBadgeProps) {
  switch (status) {
    case "accepted":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 rounded-full px-3">
          Accepted
        </Badge>
      );
    case "sent":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20 rounded-full px-3">
          Sent
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20 rounded-full px-3">
          Rejected
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-muted text-muted-foreground border-border rounded-full px-3">
          Draft
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
