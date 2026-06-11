import { Mail, Phone, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/app/actions/clients";
import { cn } from "@/lib/utils";

interface ClientInfoProps {
  client: Client;
}

export function ClientInfo({ client }: ClientInfoProps) {
  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg font-bold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Email</span>
              <span className="text-sm font-medium">{client.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Phone</span>
              <span className="text-sm font-medium">{client.phone || "Not provided"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Tags className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Tags</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {client.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] h-5 px-1.5 font-bold">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg font-bold text-foreground flex items-center justify-between">
            Health Score
            <Badge className={cn(
              "ml-2",
              client.health_score >= 80 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
            )}>
              {client.health_score}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                client.health_score >= 80 ? "bg-emerald-500" : "bg-amber-500"
              )}
              style={{ width: `${client.health_score}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Based on interactions, response times, and project status.
            <span className="text-primary cursor-pointer hover:underline ml-1">View details</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
