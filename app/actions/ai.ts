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

export async function getAiStatisticsApiV1AiStatsGet(): Promise<Types.AIStatsOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/ai/stats`;
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
