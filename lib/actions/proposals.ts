"use server";

import { revalidatePath } from "next/cache";

export type ProposalStatus = "draft" | "sent" | "accepted" | "rejected";

export interface Proposal {
  id: string;
  user_id: string;
  client_id: string;
  client_name?: string;
  project_id?: string;
  project_name?: string;
  title: string;
  brief_description?: string;
  scope?: string;
  deliverables?: string;
  timeline?: string;
  cost?: number;
  status: ProposalStatus;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

// Dummy data
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "prop1",
    user_id: "u1",
    client_id: "1",
    client_name: "Vortex Tech",
    project_id: "p1",
    project_name: "Q2 Marketing Strategy",
    title: "Vortex Tech Q2 Growth Proposal",
    brief_description: "Strategic marketing plan for Q2 scaling.",
    scope: "Social media management, SEO optimization, and PPC campaigns.",
    deliverables: "Weekly reports, 12 blog posts, 4 ad campaigns.",
    timeline: "3 months",
    cost: 15000,
    status: "accepted",
    ai_generated: true,
    created_at: "2024-03-20T10:00:00Z",
    updated_at: "2024-03-22T14:30:00Z",
  },
  {
    id: "prop2",
    user_id: "u1",
    client_id: "2",
    client_name: "Lumina Studios",
    project_id: "p2",
    project_name: "Brand Refresh",
    title: "Brand Identity Redesign for Lumina",
    brief_description: "Refreshing the Lumina brand for the modern era.",
    scope: "Logo design, color palette, typography, and brand guidelines.",
    deliverables: "Brand book, logo files, social media kits.",
    timeline: "6 weeks",
    cost: 8000,
    status: "sent",
    ai_generated: false,
    created_at: "2024-04-22T09:00:00Z",
    updated_at: "2024-04-22T09:00:00Z",
  },
];

export async function getProposals(params: {
  query?: string;
  status?: string;
  client_id?: string;
  page?: number;
  limit?: number;
}) {
  const { query, status, client_id, page = 1, limit = 10 } = params;

  let filtered = [...MOCK_PROPOSALS];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
  }

  if (status && status !== "all") {
    filtered = filtered.filter((p) => p.status === status);
  }

  if (client_id) {
    filtered = filtered.filter((p) => p.client_id === client_id);
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

export async function getProposalById(id: string) {
  return MOCK_PROPOSALS.find((p) => p.id === id) || null;
}

export async function createProposal(data: Partial<Proposal>) {
  console.log("Creating proposal:", data);
  revalidatePath("/dashboard/proposals");
  return { success: true, id: "new-prop-" + Math.random().toString(36).substr(2, 9) };
}

export async function updateProposal(id: string, data: Partial<Proposal>) {
  console.log("Updating proposal:", id, data);
  revalidatePath("/dashboard/proposals");
  revalidatePath(`/dashboard/proposals/${id}`);
  return { success: true };
}

export async function deleteProposal(id: string) {
  console.log("Deleting proposal:", id);
  revalidatePath("/dashboard/proposals");
  return { success: true };
}
