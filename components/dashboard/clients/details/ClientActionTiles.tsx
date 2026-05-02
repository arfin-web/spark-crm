import { Mail, PhoneCall, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClientActionTiles() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button className="rounded-xl h-20 flex-col gap-2 bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
        <Mail className="h-5 w-5" />
        <span>Email</span>
      </Button>
      <Button variant="outline" className="rounded-xl h-20 flex-col gap-2 border-border hover:bg-muted transition-all">
        <PhoneCall className="h-5 w-5" />
        <span>Call</span>
      </Button>
      <Button variant="outline" className="rounded-xl h-20 flex-col gap-2 border-border hover:bg-muted transition-all">
        <Calendar className="h-5 w-5" />
        <span>Schedule</span>
      </Button>
      <Button variant="outline" className="rounded-xl h-20 flex-col gap-2 border-border hover:bg-muted transition-all">
        <MessageSquare className="h-5 w-5" />
        <span>Note</span>
      </Button>
    </div>
  );
}
