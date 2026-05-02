import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Spark CRM transformed how we handle leads. The AI follow-ups alone save our account managers 10 hours a week.",
    author: "Jessica Chen",
    role: "Founder at Vortex Design",
    avatar: "https://i.pravatar.cc/150?u=jessica",
  },
  {
    quote: "Finally, a CRM that doesn't feel like a full-time job to maintain. It's lightweight, fast, and surprisingly smart.",
    author: "David Miller",
    role: "CEO of Skybound Media",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    quote: "The Kanban view combined with AI summaries is a game-changer for our weekly sales meetings. Total visibility.",
    author: "Arfin Nafriz",
    role: "Director at Pixel Perfect",
    avatar: "https://i.pravatar.cc/150?u=arfin",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Built for Agency Owners by Agency Owners</h2>
          <p className="text-muted-foreground">Join 500+ agencies who switched to Spark and never looked back.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="relative border-none shadow-xl shadow-muted/50 bg-card group hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-sm">{t.author}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{t.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
