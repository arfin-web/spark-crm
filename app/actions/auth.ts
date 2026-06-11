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

export async function registerApiV1AuthRegisterPost(data: Types.UserRegister): Promise<Types.UserOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/auth/register`;
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

export async function loginApiV1AuthLoginPost(data: any): Promise<Types.Token> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/auth/login`;
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as string);
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString()
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error ${response.status}`);
  }
  return response.json();
}

export async function readMeApiV1AuthMeGet(): Promise<Types.UserOut> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/auth/me`;
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

export async function deleteMeApiV1AuthMeDelete(): Promise<void> {
  const headers = await getAuthHeaders();
  let url = `${BASE_URL}/api/v1/auth/me`;
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
export type UserProfile = Types.UserOut;
export const getUserProfile = readMeApiV1AuthMeGet;
export const deleteAccount = deleteMeApiV1AuthMeDelete;
export const updateAgencyName = async (name: string) => { console.warn("updateAgencyName not mapped"); return {}; };
