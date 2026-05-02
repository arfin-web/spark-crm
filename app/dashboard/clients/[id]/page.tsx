import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientById } from "@/lib/actions/clients";
import { ClientHeader } from "@/components/dashboard/clients/details/ClientHeader";
import { ClientInfo } from "@/components/dashboard/clients/details/ClientInfo";
import { ClientActionTiles } from "@/components/dashboard/clients/details/ClientActionTiles";
import { ClientProjects } from "@/components/dashboard/clients/details/ClientProjects";
import { ClientActivities } from "@/components/dashboard/clients/details/ClientActivities";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ClientDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const client = await getClientById(id);
  return {
    title: `${client?.name || "Client"} | Spark CRM`,
  };
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ClientHeader client={client} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <ClientInfo client={client} />
          <ClientActionTiles />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <ClientProjects client={client} />
          <ClientActivities />
        </div>
      </div>
    </div>
  );
}
