"use server";

import { revalidatePath } from "next/cache";

export type ActivityType = "email" | "call" | "meeting" | "proposal" | "note";

export interface Activity {
  id: string;
  user_id: string;
  client_id?: string;
  client_name?: string;
  project_id?: string;
  project_name?: string;
  type: ActivityType;
  title: string;
  description: string;
  created_at: string;
}

// Dummy data
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act1",
    user_id: "u1",
    client_id: "1",
    client_name: "Alex Rivera",
    project_id: "p1",
    project_name: "Q2 Marketing Strategy",
    type: "email",
    title: "Follow-up on Q2 Strategy",
    description: "Sent follow-up email regarding the latest strategy draft. Waiting for feedback.",
    created_at: "2024-05-15T10:00:00Z",
  },
  {
    id: "act2",
    user_id: "u1",
    client_id: "2",
    client_name: "Sarah Chen",
    type: "call",
    title: "Onboarding Discovery Call",
    description: "Discussed project goals, timeline, and preferred communication channels. 45 mins.",
    created_at: "2024-05-14T14:30:00Z",
  },
  {
    id: "act3",
    user_id: "u1",
    client_id: "1",
    client_name: "Alex Rivera",
    type: "meeting",
    title: "Weekly Sync Meeting",
    description: "Reviewed performance metrics and upcoming tasks. Agreed on social media schedule.",
    created_at: "2024-05-13T09:00:00Z",
  },
  {
    id: "act4",
    user_id: "u1",
    client_id: "3",
    client_name: "Marcus Thorne",
    type: "proposal",
    title: "Proposal Sent: Security Audit",
    description: "Automatically logged when proposal 'Security Audit V1' was sent.",
    created_at: "2024-05-12T16:00:00Z",
  },
];

export async function getActivities(params: {
  client_id?: string;
  project_id?: string;
  limit?: number;
}) {
  const { client_id, project_id, limit = 10 } = params;

  let filtered = [...MOCK_ACTIVITIES];

  if (client_id) {
    filtered = filtered.filter((a) => a.client_id === client_id);
  }

  if (project_id) {
    filtered = filtered.filter((a) => a.project_id === project_id);
  }

  // Sort by date descending
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return filtered.slice(0, limit);
}

export async function logActivity(data: Partial<Activity>) {
  console.log("Logging activity:", data);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/activities");
  if (data.client_id) revalidatePath(`/dashboard/clients/${data.client_id}`);
  if (data.project_id) revalidatePath(`/dashboard/projects/${data.project_id}`);
  
  return { success: true, id: "new-act-" + Math.random().toString(36).substr(2, 9) };
}
