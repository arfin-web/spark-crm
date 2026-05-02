import { DollarSign, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/actions/projects";

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
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
      <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg font-bold">Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {project.description || "No description provided for this project."}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-muted/50 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Budget</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(project.budget)}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Est. Hours</span>
              </div>
              <p className="text-xl font-bold text-foreground">{project.estimated_hours || "0"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Proposal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 border-2 border-dashed border-border rounded-xl text-center space-y-3">
            <p className="text-sm text-muted-foreground italic">No proposal linked to this project yet.</p>
            <button className="text-sm font-bold text-primary hover:underline">
              Generate AI Proposal
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
