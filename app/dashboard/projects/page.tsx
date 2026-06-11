import { Metadata } from "next";
import { getProjects } from "@/app/actions/projects";
import { getAllClients } from "@/app/actions/clients";
import { ProjectsList } from "@/components/dashboard/projects/ProjectsList";
import { AddProjectDialog } from "@/components/dashboard/projects/AddProjectDialog";

export const metadata: Metadata = {
  title: "Projects | Spark CRM",
};

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const status = params.status || "all";
  const page = Number(params.page) || 1;

  const { data, total, totalPages } = await getProjects({
    query,
    status,
    page,
    limit: 10,
  });

  const clients = await getAllClients();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your agency projects.</p>
        </div>
        <AddProjectDialog clients={clients} />
      </div>

      <ProjectsList
        projects={data}
        clients={clients}
        totalCount={total}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  );
}