import Link from "next/link";
import { Building2, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/lib/actions/clients";

interface ProjectClientCardProps {
  client: Client;
}

export function ProjectClientCard({ client }: ProjectClientCardProps) {
  return (
    <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Client</CardTitle>
          <Link 
            href={`/dashboard/clients/${client.id}`}
            className="text-primary hover:bg-primary/5 p-1 rounded-md transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            {client.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {client.company_name || "Independent"}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl">
          <Mail className="h-4 w-4" />
          {client.email}
        </div>
      </CardContent>
    </Card>
  );
}
