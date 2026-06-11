"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = "https://spark-crm-backend-production.up.railway.app";
const COOKIE_NAME = "access_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function loginAction(formData: {
  username: string; // OAuth2 uses "username" not "email"
  password: string;
}) {
  const body = new URLSearchParams();
  body.append("username", formData.username);
  body.append("password", formData.password);

  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Invalid email or password.");
  }

  const { access_token } = await response.json();

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function registerAction(formData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  agency_name: string;
}) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const detail = errorData.detail;
    if (Array.isArray(detail)) {
      throw new Error(detail.map((d: any) => d.msg).join(", "));
    }
    throw new Error(detail || "Registration failed. Please try again.");
  }

  // Registration successful — now log in to get token
  await loginAction({ username: formData.email, password: formData.password });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}
