import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquareText, TrendingUp, LayoutGrid, Users, FileText, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Auto-Followups",
    description: "Generate personalized follow-up emails based on previous interactions with a single click.",
    icon: Mail,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Smart Contact Notes",
    description: "Our AI summarizes lengthy meeting notes into actionable bullet points automatically.",
    icon: MessageSquareText,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Lead Score Prediction",
    description: "Predict the likelihood of closing a deal based on historical data and agency-specific patterns.",
    icon: TrendingUp,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Visual Kanban Pipeline",
    description: "Manage your agency's sales flow with a simple, drag-and-drop interface designed for speed.",
    icon: LayoutGrid,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Company Intelligence",
    description: "Automatically pull company data and social profiles for every lead you add.",
    icon: Users,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Next-Best-Action",
    description: "AI-driven suggestions on what to do next for every lead to move them down the funnel.",
    icon: Sparkles,
    color: "bg-primary/10 text-primary",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Core Features</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Everything your agency needs to scale.
          </h3>
          <p className="text-lg text-muted-foreground">
            We've stripped away the enterprise bloat and added the AI superpowers 
            that digital agencies actually need to win more deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors duration-300 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
