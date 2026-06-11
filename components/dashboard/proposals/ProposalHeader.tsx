import Link from "next/link";
import { ChevronLeft, Send, CheckCircle2, XCircle, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProposalStatusBadge } from "./ProposalStatusBadge";
import { Proposal } from "@/app/actions/proposals";
import { formatDate } from "@/lib/utils";

interface ProposalHeaderProps {
  proposal: Proposal;
}

export function ProposalHeader({ proposal }: ProposalHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/dashboard/proposals"
        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Proposals
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-heading tracking-tight text-foreground">{proposal.title}</h1>
              <ProposalStatusBadge status={proposal.status as any} />
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>Created {formatDate(proposal.created_at)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {proposal.ai_generated ? "AI Generated" : "Manual Draft"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {proposal.status === "draft" && (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20">
              <Send className="mr-2 h-4 w-4" />
              Send to Client
            </Button>
          )}
          {proposal.status === "sent" && (
            <>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Accept
              </Button>
              <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/5 rounded-xl">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          {proposal.ai_generated && (
            <Button size="sm" variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
