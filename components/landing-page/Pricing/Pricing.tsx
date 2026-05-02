import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for solo freelancers and boutique agencies.",
    features: [
      "Up to 100 Contacts",
      "5 Active Deals",
      "Basic AI Summaries",
      "Standard Support",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "$79",
    description: "Our most popular plan for scaling agencies.",
    features: [
      "Unlimited Contacts",
      "Unlimited Active Deals",
      "Full AI Suite (Emails & Notes)",
      "Lead Scoring & Predictions",
      "Priority Support",
    ],
    buttonText: "Join Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For agencies with more than 50 team members.",
    features: [
      "Everything in Growth",
      "Custom AI Training",
      "Dedicated Account Manager",
      "SSO & Custom Security",
      "API Access",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Simple, transparent pricing.</h2>
          <p className="text-muted-foreground">Choose the plan that fits your agency's stage of growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative flex flex-col border-2 ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-border/50'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px] mt-2">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-heading">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow mt-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-8">
                <Button variant={plan.popular ? 'default' : 'outline'} className="w-full h-12 rounded-full font-bold">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-12">
          Prices are in USD. Annual billing saves 20%. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
