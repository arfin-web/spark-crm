"use client";

import Link from "next/link";
import * as React from "react";
import {
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  MoreHorizontal,
  ExternalLink,
  Edit,
  Trash2,
  Send,
  CheckCircle2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Proposal, deleteProposal, updateProposal } from "@/app/actions/proposals";
import { ProposalStatusBadge } from "./ProposalStatusBadge";
import { formatDate } from "@/lib/utils";
import { EditProposalDialog } from "./EditProposalDialog";
import { useRouter } from "next/navigation";

interface ProposalTableProps {
  proposals: Proposal[];
  // FIXED: Added optional collections matching your parent async layout data
  clients?: { id: string; name: string }[];
  projects?: { id: string; name: string; client_id: string }[];
}

export function ProposalTable({ proposals, clients = [], projects = [] }: ProposalTableProps) {
  const router = useRouter();
  const [activeEditProposal, setActiveEditProposal] = React.useState<Proposal | null>(null);

  const formatCurrency = (amount: string | number | null | undefined) => {
    if (amount === null || amount === undefined || amount === "") return "N/A";
    const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numericValue)) return "N/A";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const handleUpdateStatus = async (id: string, status: "sent" | "accepted") => {
    try {
      await updateProposal(id, { status });
      router.refresh();
    } catch (error) {
      console.error("Failed to update proposal status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this proposal?")) {
      try {
        await deleteProposal(id);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete proposal:", error);
      }
    }
  };

  // Helper helper function to match Client UUID to name string mappings
  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || id;
  // Helper helper function to match Project UUID to name string mappings
  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || id;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="font-bold text-foreground">Proposal</TableHead>
            <TableHead className="font-bold text-foreground">Client & Project</TableHead>
            <TableHead className="font-bold text-foreground">Status</TableHead>
            <TableHead className="font-bold text-foreground">Cost</TableHead>
            <TableHead className="font-bold text-foreground">Created</TableHead>
            <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic border-none">
                No proposals found.
              </TableCell>
            </TableRow>
          ) : (
            proposals.map((proposal) => (
              <TableRow key={proposal.id} className="hover:bg-muted/20 transition-colors border-border">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      {proposal.title}
                      {proposal.ai_generated && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider">AI</span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                      {proposal.brief_description || "No description"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {getClientName(proposal.client_id)}
                    </div>
                    {proposal.project_id && (
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
                        <Briefcase className="h-3 w-3" />
                        {getProjectName(proposal.project_id)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ProposalStatusBadge status={proposal.status as any} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 font-medium text-foreground">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    {formatCurrency(proposal.cost)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(proposal.created_at)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent border-none h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors focus:outline-none">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* FIXED: Replaced render prop with asChild structure for correct Next.js compilation */}
                        <DropdownMenuItem className="cursor-pointer">
                          <Link href={`/dashboard/proposals/${proposal.id}`} className="flex items-center w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Text
                          </Link>
                        </DropdownMenuItem>
                        {/* FIXED: Prevents closing loop so the modal trigger works seamlessly inside dropdown list layout */}
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault();
                            setActiveEditProposal(proposal);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(proposal.id, "sent")}
                          className="cursor-pointer text-blue-500 focus:text-blue-500 focus:bg-blue-500/10"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Mark as Sent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(proposal.id, "accepted")}
                          className="cursor-pointer text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark as Accepted
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleDelete(proposal.id)}
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Proposal
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* FIXED: Hidden layout controller element to cleanly process dialog instantiation without markup leaks */}
      {activeEditProposal && (
        <EditProposalDialog
          proposal={activeEditProposal}
          clients={clients}
          trigger={<span className="hidden" />}
          // Triggers modal immediately when initialization executes
          projects={projects}
        />
      )}
    </div>
  );
}