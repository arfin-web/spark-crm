import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 py-1 px-4 text-sm font-medium rounded-full bg-primary/10 text-primary border-primary/20 animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            AI-Powered CRM for Digital Agencies
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-heading text-balance leading-[1.1]">
            The Agency CRM that <span className="text-primary italic">works</span> like you do.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl text-balance">
            Manage clients, projects, and deals without the complexity. 
            Spark AI handles the busy work so you can focus on creativity and growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 group">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-2">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative w-full max-w-5xl mx-auto mt-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9]">
              <Image 
                src="https://placehold.co/1200x800/f8fafc/64748b?text=Spark+CRM+Dashboard+Preview" 
                alt="Spark CRM Dashboard"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay elements to make it look "AI-ish" */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-primary/20 shadow-lg max-w-[200px] text-left hidden md:block">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">AI Suggestion</span>
                </div>
                <p className="text-xs font-medium italic">"Follow up with Design Inc. regarding the Q3 Proposal."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
