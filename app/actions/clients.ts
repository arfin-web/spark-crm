"use server";

import { cookies } from "next/headers";
import * as Types from "./types";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://spark-crm-backend-production.up.railway.app";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log("ACCESS TOKEN EXISTS:", !!token);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function listClientsApiV1ClientsGet(
  query?: Record<string, any>
): Promise<Types.ClientOut[]> {
  const headers = await getAuthHeaders();

  let url = `${BASE_URL}/api/v1/clients/`;

  if (query) {
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== "all"
      )
    );

    const qs = new URLSearchParams(
      filteredQuery as Record<string, string>
    ).toString();

    if (qs) {
      url += `?${qs}`;
    }
  }

  console.log("CLIENTS URL:", url);
  console.log(
    "AUTH HEADER:",
    headers.Authorization ? "Present" : "Missing"
  );

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await response.json();

  console.log("CLIENTS RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      typeof data?.detail === "string"
        ? data.detail
        : JSON.stringify(data?.detail ?? data)
    );
  }

  return data;
}

export async function createClientApiV1ClientsPost(
  data: Types.ClientCreate
): Promise<Types.ClientOut> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${BASE_URL}/api/v1/clients/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  const responseData = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    console.error("Create Client Error:", responseData);

    throw new Error(
      JSON.stringify(responseData?.detail || responseData)
    );
  }
  revalidatePath("/dashboard/clients");
  return responseData;
}

export async function getClientApiV1ClientsClientIdGet(clientId: string): Promise<Types.ClientOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/clients/${clientId}`;
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

export async function updateClientApiV1ClientsClientIdPut(clientId: string, data: Types.ClientUpdate): Promise<Types.ClientOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/clients/${clientId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  return response.json();
}

export async function deleteClientApiV1ClientsClientIdDelete(clientId: string): Promise<void> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/clients/${clientId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  return;
}

export async function scoreClientHealthApiV1ClientsClientIdScoreHealthPost(clientId: string): Promise<Types.ClientHealthScoreOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/clients/${clientId}/score-health`;
  const response = await fetch(url, {
    method: "POST",
    headers
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  return response.json();
}

export async function getClientSummaryApiV1ClientsClientIdAiSummaryGet(clientId: string): Promise<Types.ClientAISummaryOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/clients/${clientId}/ai-summary`;
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


// Aliases for backward compatibility with components
export type Client = Types.ClientOut;
export type ClientStatus = "active" | "inactive" | "prospect";
export const getClientById = getClientApiV1ClientsClientIdGet;
export const createClient = createClientApiV1ClientsPost;
export const updateClient = updateClientApiV1ClientsClientIdPut;
export const deleteClient = deleteClientApiV1ClientsClientIdDelete;
export const getAllClients = async () => {
  const clients = await listClientsApiV1ClientsGet();

  return clients.map((c) => ({
    id: c.id,
    name: c.name,
  }));
};

export const getClients = async (params?: any) => {
  const clients = await listClientsApiV1ClientsGet(params);

  return {
    data: clients,
    total: clients.length,
    page: 1,
    totalPages: 1,
  };
};