"use server";

import { cookies } from "next/headers";
import * as Types from "./types";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://spark-crm-backend-production.up.railway.app";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function listProposalsApiV1ProposalsGet(): Promise<Types.ProposalOut[]> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/`;

  console.log("PROPOSALS URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store"
  });

  // Safe parse JSON so it never throws on an empty/bad body
  const data = await response.json().catch(() => null);

  console.log("PROPOSALS RAW RESPONSE status:", response.status);
  console.log("PROPOSALS RESPONSE BODY:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    // If backend sent an explicit error code (e.g. 401, 403, 500)
    throw new Error(data?.detail || `HTTP error ${response.status}`);
  }

  // SNEAKY BACKEND FIX: If backend sent a 200 but it contains an error object instead of an array
  if (data && !Array.isArray(data) && data.detail) {
    throw new Error(data.detail);
  }

  // Ensure we always return an array if it's supposed to be a list
  return Array.isArray(data) ? data : [];
}

export async function createProposalApiV1ProposalsPost(data: Types.ProposalCreate): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...data,
      project_id: data.project_id || null,
      cost: data.cost !== undefined && data.cost !== "" ? data.cost : null,
    })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(typeof errorData.detail === 'object' ? JSON.stringify(errorData.detail) : errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath('/dashboard/proposals');
  return response.json();
}

export async function generateProposalApiV1ProposalsGeneratePost(data: Types.ProposalGenerateRequest): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/generate`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...data,
      project_id: data.project_id || null
    })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath('/dashboard/proposals');
  return response.json();
}

export async function getProposalApiV1ProposalsProposalIdGet(proposalId: string): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/${proposalId}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store" // FIXED: Replaced next: { revalidate: 0 } here too
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function updateProposalApiV1ProposalsProposalIdPut(proposalId: string, data: Types.ProposalUpdate): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/${proposalId}`;

  const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = value === "" ? null : value;
    return acc;
  }, {} as Record<string, any>);

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(cleanData)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath('/dashboard/proposals');
  revalidatePath(`/dashboard/proposals/${proposalId}`);
  return response.json();
}

export async function deleteProposalApiV1ProposalsProposalIdDelete(proposalId: string): Promise<void> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/${proposalId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath('/dashboard/proposals');
  revalidatePath(`/dashboard/proposals/${proposalId}`);
  return;
}

// Aliases for backward compatibility with components
export type Proposal = Types.ProposalOut;
export type ProposalStatus = "draft" | "sent" | "accepted" | "rejected";
export const getProposalById = getProposalApiV1ProposalsProposalIdGet;
export const createProposal = createProposalApiV1ProposalsPost;
export const updateProposal = updateProposalApiV1ProposalsProposalIdPut;
export const deleteProposal = deleteProposalApiV1ProposalsProposalIdDelete;
export const getProposals = async (params?: any) => {
  const proposals = await listProposalsApiV1ProposalsGet();
  return { data: proposals, total: proposals.length, page: 1, totalPages: 1 };
};