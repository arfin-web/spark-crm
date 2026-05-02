import {
  Mail,
  Building2,
  Heart,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Client } from "@/lib/actions/clients";
import { cn } from "@/lib/utils";
import { ClientSearch } from "./ClientSearch";
import { ClientPagination } from "./ClientPagination";
import { ClientStatusBadge } from "./ClientStatusBadge";
import { ClientRowActions } from "./ClientRowActions";

interface ClientsListProps {
  clients: Client[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function ClientsList({
  clients,
  totalCount,
  totalPages,
  currentPage
}: ClientsListProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ClientSearch />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-border bg-card">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="font-bold text-foreground">Name</TableHead>
              <TableHead className="font-bold text-foreground">Company</TableHead>
              <TableHead className="font-bold text-foreground">Status</TableHead>
              <TableHead className="font-bold text-foreground">Health</TableHead>
              <TableHead className="font-bold text-foreground">Last Contact</TableHead>
              <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic border-none">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/20 transition-colors border-border">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{client.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {client.company_name || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ClientStatusBadge status={client.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Heart className={cn("h-4 w-4", getHealthColor(client.health_score))} fill="currentColor" />
                      <span className={cn("font-bold text-sm", getHealthColor(client.health_score))}>
                        {client.health_score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {client.last_contact_date
                      ? new Date(client.last_contact_date).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <ClientRowActions client={client} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ClientPagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
        currentCount={clients.length}
      />
    </div>
  );
}
