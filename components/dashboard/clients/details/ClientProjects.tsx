import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientProjects() {
  return (
    <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Active Projects</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-8 text-center text-muted-foreground italic">
          No active projects found for this client.
          <Button variant="link" className="text-primary p-0 h-auto ml-1">Create project</Button>
        </div>
      </CardContent>
    </Card>
  );
}
