import { Activity as ActivityIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivities } from "@/lib/actions/activities";
import { ActivityTimeline } from "../../activities/ActivityTimeline";
import { ActivityLogDialog } from "../../activities/ActivityLogDialog";

interface ProjectActivitiesProps {
  projectId: string;
  clientId?: string;
}

export async function ProjectActivities({ projectId, clientId }: ProjectActivitiesProps) {
  const activities = await getActivities({ project_id: projectId, limit: 10 });

  return (
    <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Project Timeline</CardTitle>
          </div>
          <ActivityLogDialog 
            projectId={projectId} 
            clientId={clientId}
            trigger={
              <Button variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 gap-1.5 h-8">
                <Plus className="h-3.5 w-3.5" />
                Log Activity
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ActivityTimeline activities={activities} />
      </CardContent>
    </Card>
  );
}
