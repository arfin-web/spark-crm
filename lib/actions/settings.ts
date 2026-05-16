"use server";

import { revalidatePath } from "next/cache";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  agency_name: string;
  subscription_tier: string;
}

// Dummy user data
const MOCK_USER: UserProfile = {
  id: "u1",
  email: "admin@sparkcrm.com",
  first_name: "Arfin",
  last_name: "Web",
  agency_name: "Spark Digital",
  subscription_tier: "growth",
};

export async function getUserProfile() {
  return MOCK_USER;
}

export async function updateAgencyName(name: string) {
  console.log("Updating agency name to:", name);
  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function deleteAccount() {
  console.log("Account deletion requested");
  return { success: true };
}
