import { Metadata } from "next";
import { getProposals } from "@/app/actions/proposals";
import { ProposalTable } from "@/components/dashboard/proposals/ProposalTable";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddProposalDialog } from "@/components/dashboard/proposals/AddProposalDialog";

// TODO: Ensure these actions are built out in your action files to serve the relational inputs
// (e.g., matching /api/v1/clients and /api/v1/projects endpoints)
import { getClients } from "@/app/actions/clients";
import { getProjects } from "@/app/actions/projects";

export const metadata: Metadata = {
  title: "Proposals | Spark CRM",
};

interface ProposalsPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ProposalsPage({ searchParams }: ProposalsPageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const status = params.status || "all";
  const page = Number(params.page) || 1;

  // FIXED: Concurrent Server Data Fetching via Promise.all for high performance
  const [proposalsData, clientsData, projectsData] = await Promise.all([
    getProposals({ query, status, page, limit: 10 }),
    getClients().catch(() => ({ data: [] })),   // Safeguard fallback if route not integrated yet
    getProjects().catch(() => ({ data: [] }))   // Safeguard fallback if route not integrated yet
  ]);

  const proposals = proposalsData?.data || [];
  const clients = clientsData?.data || [];
  const projects = projectsData?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Proposals</h1>
          <p className="text-muted-foreground mt-1">Create and manage high-converting project proposals.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5">
            AI Generator
          </Button>
          {/* FIXED: Passed required collections down into the dialog to resolve compiling crashes */}
          <AddProposalDialog clients={clients} projects={projects} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search proposals..."
              className="pl-10 h-10 rounded-xl bg-muted/30 border-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-border bg-card">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* FIXED: Passed extracted dynamic collection safe array to table layout render pipeline */}
        <ProposalTable proposals={proposals} />
      </div>
    </div>
  );
}