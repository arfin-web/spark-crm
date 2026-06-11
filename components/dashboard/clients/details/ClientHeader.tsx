import Link from "next/link";
import { ChevronLeft, Building2, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientStatusBadge } from "../ClientStatusBadge";
import { EditClientDialog } from "../EditClientDialog";
import { Client } from "@/app/actions/clients";

interface ClientHeaderProps {
  client: Client;
}

export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link 
        href="/dashboard/clients" 
        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Clients
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            {client.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">{client.name}</h1>
              <ClientStatusBadge status={client.status as any} />
            </div>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Building2 className="h-4 w-4" />
              {client.company_name || "Independent"} • {client.industry || "General"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <EditClientDialog client={client} />
          <Button variant="destructive" size="sm" className="rounded-xl shadow-lg shadow-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
