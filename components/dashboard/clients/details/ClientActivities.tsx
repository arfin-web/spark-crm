import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientActivities() {
  return (
    <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
            View History
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-8 text-center text-muted-foreground italic">
          No recent activity recorded.
        </div>
      </CardContent>
    </Card>
  );
}
