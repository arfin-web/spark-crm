import { Metadata } from "next";
import { getClients } from "@/app/actions/clients";
import { ClientsList } from "@/components/dashboard/clients/ClientsList";
import { AddClientDialog } from "@/components/dashboard/clients/AddClientDialog";

export const metadata: Metadata = {
  title: "Clients | Spark CRM",
  description: "Manage your agency contacts and leads.",
};

interface ClientsPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const query = params.query || "";
  const status = params.status || "all";

  const { data, total, totalPages } = await getClients({
    query: query || undefined,
    status: status !== "all" ? status : undefined,
    page,
    limit: 10,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your relationships and track client health.</p>
        </div>
        <AddClientDialog />
      </div>

      <ClientsList
        clients={data}
        totalCount={total}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  );
}
