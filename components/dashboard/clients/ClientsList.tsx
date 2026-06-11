import {
  Mail,
  Building2,
  Heart,
  Filter,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Client } from "@/app/actions/clients";
import { cn } from "@/lib/utils";

import { ClientSearch } from "./ClientSearch";
import { ClientPagination } from "./ClientPagination";
import { ClientStatusBadge } from "./ClientStatusBadge";
import { ClientRowActions } from "./ClientRowActions";
import { ClientLastContactDate } from "./ClientLastContactDate";

interface ClientsListProps {
  clients: Client[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function ClientsList({
  clients = [],
  totalCount,
  totalPages,
  currentPage,
}: ClientsListProps) {
  const getHealthColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ClientSearch />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl border-border bg-card"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow
                  key={client.id}
                  className="hover:bg-muted/20"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {client.name ?? "Unnamed"}
                      </span>

                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email ?? "-"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />

                      {(client as any).company_name ??
                        "N/A"}
                    </div>
                  </TableCell>

                  <TableCell>
                    {(client as any).status ? (
                      <ClientStatusBadge
                        status={(client as any).status}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          getHealthColor(
                            (client as any).health_score
                          )
                        )}
                        fill="currentColor"
                      />

                      <span
                        className={cn(
                          getHealthColor(
                            (client as any).health_score
                          )
                        )}
                      >
                        {(client as any).health_score ??
                          "-"}
                      </span>
                    </div>
                  </TableCell>

                  <ClientLastContactDate client={client} />

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