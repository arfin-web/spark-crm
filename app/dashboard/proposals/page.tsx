import { Metadata } from "next";
import { getProposals } from "@/app/actions/proposals";
import { ProposalTable } from "@/components/dashboard/proposals/ProposalTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  const { data, total, totalPages } = await getProposals({
    query,
    status,
    page,
    limit: 10,
  });

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
          <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 font-bold">
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
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

        <ProposalTable proposals={data} />
      </div>
    </div>
  );
}