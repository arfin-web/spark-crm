"use client";

import Link from "next/link";
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  FileText,
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
import { Proposal } from "@/lib/actions/proposals";
import { ProposalStatusBadge } from "./ProposalStatusBadge";

interface ProposalTableProps {
  proposals: Proposal[];
}

export function ProposalTable({ proposals }: ProposalTableProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
                      {proposal.client_name || "N/A"}
                    </div>
                    {proposal.project_name && (
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
                        <Briefcase className="h-3 w-3" />
                        {proposal.project_name}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ProposalStatusBadge status={proposal.status} />
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
                    {new Date(proposal.created_at).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent border-none h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer" render={<Link href={`/dashboard/proposals/${proposal.id}`} className="flex items-center" />}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Full Text
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer text-blue-500 focus:text-blue-500 focus:bg-blue-500/10">
                          <Send className="mr-2 h-4 w-4" />
                          Mark as Sent
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark as Accepted
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
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
    </div>
  );
}
