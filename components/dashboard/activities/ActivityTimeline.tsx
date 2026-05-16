import { 
  Mail, 
  Phone, 
  Users, 
  FileText, 
  StickyNote, 
  Clock 
} from "lucide-react";
import { Activity, ActivityType } from "@/lib/actions/activities";
import { cn } from "@/lib/utils";

interface ActivityTimelineProps {
  activities: Activity[];
  className?: string;
}

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  switch (type) {
    case "email":
      return <div className="bg-blue-500/10 p-2 rounded-full"><Mail className="h-4 w-4 text-blue-500" /></div>;
    case "call":
      return <div className="bg-emerald-500/10 p-2 rounded-full"><Phone className="h-4 w-4 text-emerald-500" /></div>;
    case "meeting":
      return <div className="bg-amber-500/10 p-2 rounded-full"><Users className="h-4 w-4 text-amber-500" /></div>;
    case "proposal":
      return <div className="bg-purple-500/10 p-2 rounded-full"><FileText className="h-4 w-4 text-purple-500" /></div>;
    case "note":
      return <div className="bg-slate-500/10 p-2 rounded-full"><StickyNote className="h-4 w-4 text-slate-500" /></div>;
    default:
      return null;
  }
};

export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
        <div className="bg-muted p-4 rounded-full">
          <Clock className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground italic text-sm">No activity history found.</p>
      </div>
    );
  }

  return (
    <div className={cn("relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent", className)}>
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="sticky top-0 z-10 flex items-center justify-center bg-background ring-4 ring-background rounded-full">
            <ActivityIcon type={activity.type} />
          </div>
          
          <div className="flex-1 min-w-0 bg-card border border-border p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h4 className="text-sm font-bold text-foreground truncate">{activity.title}</h4>
              <time className="text-[10px] font-medium text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-0.5 rounded-full uppercase">
                {new Date(activity.created_at).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {activity.description}
            </p>

            {(activity.client_name || activity.project_name) && (
              <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                {activity.client_name && (
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded uppercase tracking-wider">
                    {activity.client_name}
                  </span>
                )}
                {activity.project_name && (
                  <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase tracking-wider">
                    {activity.project_name}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
