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

export async function listDraftsApiV1EmailDraftsGet(): Promise<Types.EmailDraftOut[]> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/`;
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

export async function createDraftApiV1EmailDraftsPost(data: Types.EmailDraftCreate): Promise<Types.EmailDraftOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/`;
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

export async function generateDraftApiV1EmailDraftsGeneratePost(data: Types.EmailDraftGenerateRequest): Promise<Types.EmailDraftOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/generate`;
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

export async function getDraftApiV1EmailDraftsDraftIdGet(draftId: string): Promise<Types.EmailDraftOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/${draftId}`;
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

export async function updateDraftApiV1EmailDraftsDraftIdPut(draftId: string, data: Types.EmailDraftUpdate): Promise<Types.EmailDraftOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/${draftId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function deleteDraftApiV1EmailDraftsDraftIdDelete(draftId: string): Promise<void> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/email-drafts/${draftId}`;
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
