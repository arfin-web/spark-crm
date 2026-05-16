import { Building2, Briefcase, DollarSign, Clock, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Proposal } from "@/lib/actions/proposals";
import { Button } from "@/components/ui/button";

interface ProposalSidebarProps {
  proposal: Proposal;
}

export function ProposalSidebar({ proposal }: ProposalSidebarProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold">Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-1.5 rounded-lg">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Client</p>
                <p className="text-sm font-bold text-foreground">{proposal.client_name || "N/A"}</p>
              </div>
            </div>

            {proposal.project_name && (
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1.5 rounded-lg">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Project</p>
                  <p className="text-sm font-bold text-foreground">{proposal.project_name}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="mt-1 bg-emerald-500/10 p-1.5 rounded-lg">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Investment</p>
                <p className="text-sm font-bold text-foreground">{formatCurrency(proposal.cost)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 bg-amber-500/10 p-1.5 rounded-lg">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Timeline</p>
                <p className="text-sm font-bold text-foreground">{proposal.timeline || "TBD"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="rounded-2xl h-12 gap-2 border-border hover:bg-muted">
          <Download className="h-4 w-4" />
          PDF
        </Button>
        <Button variant="outline" className="rounded-2xl h-12 gap-2 border-border hover:bg-muted">
          <Share2 className="h-4 w-4" />
          Link
        </Button>
      </div>
    </div>
  );
}
