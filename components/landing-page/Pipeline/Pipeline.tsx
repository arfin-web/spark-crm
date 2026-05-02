import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight, User } from "lucide-react";

const stages = [
  {
    name: "Lead In",
    deals: [
      { company: "Vortex Tech", value: "$5k", owner: "Sarah", priority: "High" },
      { company: "Lumina Studio", value: "$12k", owner: "Mike", priority: "Medium" },
    ],
  },
  {
    name: "Discovery",
    deals: [
      { company: "Skyline Ads", value: "$20k", owner: "Sarah", priority: "High", ai: "Smart Note Ready" },
    ],
  },
  {
    name: "Proposal",
    deals: [
      { company: "Bloom Creative", value: "$45k", owner: "Alex", priority: "High", ai: "Next Best Action" },
      { company: "Nexus Apps", value: "$8k", owner: "Mike", priority: "Low" },
    ],
  },
  {
    name: "Closed",
    deals: [
      { company: "Echo Media", value: "$15k", owner: "Alex", priority: "High" },
    ],
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              Visual Sales Flow
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              Stop losing deals in messy spreadsheets.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our intuitive Kanban board gives you a bird's-eye view of your entire sales funnel. 
              Drag leads between stages and let Spark AI handle the updates, follow-ups, and documentation.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Instant visibility into your agency's pipeline",
                "AI-generated summaries for every deal stage",
                "Custom fields tailored for agency services",
                "Automated activity logging and next steps",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-primary flex items-center gap-2 group cursor-pointer">
                Learn more about Pipeline Management
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          <div className="relative">
            {/* The "Kanban" Visual */}
            <div className="grid grid-cols-2 gap-4">
              {stages.map((stage, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stage.name}</span>
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{stage.deals.length}</span>
                  </div>
                  {stage.deals.map((deal, j) => (
                    <Card key={j} className="p-4 shadow-sm border-border/50 hover:border-primary/50 transition-colors cursor-grab">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-sm">{deal.company}</h4>
                        <span className="text-[10px] font-bold text-primary">{deal.value}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{deal.owner}</span>
                        </div>
                        {deal.ai && (
                          <div className="flex items-center gap-1 text-[9px] font-bold text-primary animate-pulse">
                            <Sparkles className="h-2.5 w-2.5" />
                            {deal.ai}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
