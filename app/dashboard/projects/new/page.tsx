import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAllClients } from "@/lib/actions/clients";
import { ProjectFormContainer } from "./ProjectFormContainer";

export const metadata: Metadata = {
  title: "New Project | Spark CRM",
};

interface NewProjectPageProps {
  searchParams: Promise<{
    client?: string;
  }>;
}

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const params = await searchParams;
  const clients = await getAllClients();
  const defaultClientId = params.client || "";

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/projects"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-2">
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Start New Project</h1>
          <p className="text-muted-foreground">Define the scope, budget, and timeline for your new engagement.</p>
        </div>
      </div>

      <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
        <ProjectFormContainer clients={clients} defaultClientId={defaultClientId} />
      </div>
    </div>
  );
}
