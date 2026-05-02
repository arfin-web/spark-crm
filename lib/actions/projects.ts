"use server";

import { revalidatePath } from "next/cache";

export type ProjectStatus = "prospect" | "proposal_sent" | "in_progress" | "completed" | "paused";

export interface Project {
  id: string;
  user_id: string;
  client_id: string;
  client_name?: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  budget?: number;
  estimated_hours?: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// Dummy data
const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    user_id: "u1",
    client_id: "1",
    client_name: "Vortex Tech",
    name: "Q2 Marketing Strategy",
    description: "Comprehensive marketing strategy for Q2 2024.",
    status: "in_progress",
    budget: 15000,
    start_date: "2024-04-01",
    end_date: "2024-06-30",
    created_at: "2024-03-15T09:00:00Z",
    updated_at: "2024-03-15T09:00:00Z",
  },
  {
    id: "p2",
    user_id: "u1",
    client_id: "2",
    client_name: "Lumina Studios",
    name: "Brand Refresh",
    description: "Full brand identity redesign.",
    status: "proposal_sent",
    budget: 8000,
    start_date: "2024-05-15",
    end_date: "2024-07-15",
    created_at: "2024-04-20T11:00:00Z",
    updated_at: "2024-04-20T11:00:00Z",
  },
  {
    id: "p3",
    user_id: "u1",
    client_id: "3",
    client_name: "Ironclad Security",
    name: "Website Penetration Test",
    description: "Annual security audit and penetration testing.",
    status: "completed",
    budget: 12000,
    start_date: "2024-01-10",
    end_date: "2024-02-15",
    created_at: "2024-01-01T15:00:00Z",
    updated_at: "2024-02-15T10:00:00Z",
  },
];

export async function getProjects(params: {
  query?: string;
  status?: string;
  client_id?: string;
  page?: number;
  limit?: number;
}) {
  const { query, status, client_id, page = 1, limit = 10 } = params;

  let filtered = [...MOCK_PROJECTS];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
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

export async function getProjectById(id: string) {
  return MOCK_PROJECTS.find((p) => p.id === id) || null;
}

export async function createProject(data: Partial<Project>) {
  console.log("Creating project:", data);
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/clients/${data.client_id}`);
  return { success: true, id: "new-p-" + Math.random().toString(36).substr(2, 9) };
}

export async function updateProject(id: string, data: Partial<Project>) {
  console.log("Updating project:", id, data);
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  console.log("Deleting project:", id);
  revalidatePath("/dashboard/projects");
  return { success: true };
}
