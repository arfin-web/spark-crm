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

export async function listProposalsApiV1ProposalsGet(): Promise<Types.ProposalOut[]> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/`;
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

export async function createProposalApiV1ProposalsPost(data: Types.ProposalCreate): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/`;
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

export async function generateProposalApiV1ProposalsGeneratePost(data: Types.ProposalGenerateRequest): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/generate`;
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

export async function getProposalApiV1ProposalsProposalIdGet(proposalId: string): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/${proposalId}`;
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

export async function updateProposalApiV1ProposalsProposalIdPut(proposalId: string, data: Types.ProposalUpdate): Promise<Types.ProposalOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/proposals/${proposalId}`;
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
