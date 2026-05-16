import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Proposal } from "@/lib/actions/proposals";

interface ProposalContentProps {
  proposal: Proposal;
}

export function ProposalContent({ proposal }: ProposalContentProps) {
  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground leading-relaxed">
            {proposal.brief_description || "No summary provided."}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold">Scope of Work</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-sm prose-slate max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {proposal.scope || "No scope defined."}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold">Deliverables</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-sm prose-slate max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {proposal.deliverables || "No deliverables defined."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
