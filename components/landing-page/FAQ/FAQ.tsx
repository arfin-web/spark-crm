import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is Spark CRM different from HubSpot or Salesforce?",
    answer: "Unlike enterprise CRMs, Spark is built specifically for digital agencies. We've removed the complex configurations and focused on AI tools that automate the manual tasks agency owners hate—like follow-ups and note-taking.",
  },
  {
    question: "Does the AI really sound like me?",
    answer: "Yes! Our AI analyzes your previous email style and tone to generate drafts that feel authentic to your agency's brand. You can always review and edit before sending.",
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely. You can export all your contacts, deals, and activity logs to CSV format at any time with a single click.",
  },
  {
    question: "How long does it take to set up?",
    answer: "Most agencies are up and running in less than 15 minutes. You can import your existing client list via CSV and start using the AI features immediately.",
  },
  {
    question: "Is there a mobile app?",
    answer: "Spark CRM is fully mobile-responsive. You can manage your deals and clients from any browser on your phone or tablet without losing any functionality.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 rounded-xl px-4 overflow-hidden">
                <AccordionTrigger className="text-left font-bold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
