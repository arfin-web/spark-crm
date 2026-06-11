"use server";

import { cookies } from "next/headers";
import * as Types from "./types";

const BASE_URL = "https://spark-crm-backend-production.up.railway.app";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function listActivitiesApiV1ActivitiesGet(query?: Record<string, any>): Promise<Types.ActivityOut[]> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/activities/`;
  if (query) {
    const qs = new URLSearchParams(query as Record<string, string>).toString();
    if (qs) url += `?${qs}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function createActivityApiV1ActivitiesPost(data: Types.ActivityCreate): Promise<Types.ActivityOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/activities/`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function getActivityApiV1ActivitiesActivityIdGet(activityId: string): Promise<Types.ActivityOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/activities/${activityId}`;
  const response = await fetch(url, {
    method: "GET",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function deleteActivityApiV1ActivitiesActivityIdDelete(activityId: string): Promise<void> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/activities/${activityId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return;
}


// Aliases for backward compatibility with components
export type Activity = Types.ActivityOut;
export type ActivityType = "email" | "call" | "meeting" | "proposal" | "note";
export const logActivity = createActivityApiV1ActivitiesPost;
export const getActivities = async (params?: any) => {
    const activities = await listActivitiesApiV1ActivitiesGet(params);
    return activities; // Activities originally returned an array directly
};
