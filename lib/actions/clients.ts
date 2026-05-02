"use server";

import { revalidatePath } from "next/cache";

export type ClientStatus = "active" | "inactive" | "prospect";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  industry?: string;
  status: ClientStatus;
  health_score: number;
  last_contact_date?: string;
  tags?: string[];
  notes?: string;
  source?: string;
  created_at: string;
}

// Dummy data
const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@vortextech.com",
    company_name: "Vortex Tech",
    industry: "SaaS",
    status: "active",
    health_score: 92,
    last_contact_date: "2024-04-28T10:00:00Z",
    tags: ["High Priority", "SaaS"],
    source: "Referral",
    created_at: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@lumina.io",
    company_name: "Lumina Studios",
    industry: "Design",
    status: "active",
    health_score: 85,
    last_contact_date: "2024-04-30T14:30:00Z",
    tags: ["Creative"],
    source: "Website",
    created_at: "2024-02-10T11:00:00Z",
  },
  {
    id: "3",
    name: "Marcus Thorne",
    email: "marcus@ironclad.com",
    company_name: "Ironclad Security",
    industry: "Cybersecurity",
    status: "prospect",
    health_score: 75,
    last_contact_date: "2024-04-25T09:15:00Z",
    tags: ["Enterprise"],
    source: "Cold Outreach",
    created_at: "2024-03-20T15:00:00Z",
  },
  {
    id: "4",
    name: "Elena Gilbert",
    email: "elena@mystic.com",
    company_name: "Mystic Media",
    industry: "Marketing",
    status: "inactive",
    health_score: 45,
    last_contact_date: "2024-03-01T16:00:00Z",
    tags: ["Low Engagement"],
    source: "Event",
    created_at: "2023-11-05T10:00:00Z",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@techflow.net",
    company_name: "TechFlow Solutions",
    industry: "IT Services",
    status: "active",
    health_score: 88,
    last_contact_date: "2024-05-01T11:20:00Z",
    tags: ["Retainer"],
    source: "Referral",
    created_at: "2024-01-20T14:00:00Z",
  },
];

export async function getClients(params: {
  query?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const { query, status, page = 1, limit = 10 } = params;

  let filtered = [...MOCK_CLIENTS];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company_name?.toLowerCase().includes(q)
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((c) => c.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getAllClients() {
  return MOCK_CLIENTS.map(c => ({ id: c.id, name: c.name }));
}

export async function getClientById(id: string) {
  return MOCK_CLIENTS.find((c) => c.id === id) || null;
}

export async function createClient(data: Partial<Client>) {
  console.log("Creating client:", data);
  // In a real app, this would insert into Supabase
  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function updateClient(id: string, data: Partial<Client>) {
  console.log("Updating client:", id, data);
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${id}`);
  return { success: true };
}

export async function deleteClient(id: string) {
  console.log("Soft deleting client:", id);
  revalidatePath("/dashboard/clients");
  return { success: true };
}
