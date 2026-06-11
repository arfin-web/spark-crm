"use server";

import { cookies } from "next/headers";
import * as Types from "./types";
import { revalidatePath } from "next/cache";

const BASE_URL =
  "https://spark-crm-backend-production.up.railway.app";

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

function getErrorMessage(errorData: any, status: number) {
  if (!errorData) {
    return `HTTP error ${status}`;
  }

  if (typeof errorData.detail === "string") {
    return errorData.detail;
  }

  if (Array.isArray(errorData.detail)) {
    return JSON.stringify(errorData.detail);
  }

  return JSON.stringify(errorData);
}

/* -------------------------------------------------------------------------- */
/*                                   LIST                                     */
/* -------------------------------------------------------------------------- */

export async function listProjectsApiV1ProjectsGet(
  query?: Record<string, any>
): Promise<any> {
  const headers = await getAuthHeaders();

  let url = `${BASE_URL}/api/v1/projects/`;

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

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await response.json().catch(() => []);

  console.log("PROJECTS URL:", url);
  console.log("PROJECTS RESPONSE:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, response.status)
    );
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                                  CREATE                                    */
/* -------------------------------------------------------------------------- */

export async function createProjectApiV1ProjectsPost(
  data: Types.ProjectCreate
): Promise<Types.ProjectOut> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${BASE_URL}/api/v1/projects/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  const responseData = await response
    .json()
    .catch(() => null);

  console.log("CREATE PROJECT RESPONSE:", responseData);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseData, response.status)
    );
  }

  revalidatePath("/dashboard/projects");
  return responseData;
}

/* -------------------------------------------------------------------------- */
/*                                   GET                                      */
/* -------------------------------------------------------------------------- */

export async function getProjectApiV1ProjectsProjectIdGet(
  projectId: string
): Promise<Types.ProjectOut> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${BASE_URL}/api/v1/projects/${projectId}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                                  UPDATE                                    */
/* -------------------------------------------------------------------------- */

export async function updateProjectApiV1ProjectsProjectIdPut(
  projectId: string,
  data: Types.ProjectUpdate
): Promise<Types.ProjectOut> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${BASE_URL}/api/v1/projects/${projectId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }
  );

  const responseData = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseData, response.status)
    );
  }

  revalidatePath(`/dashboard/projects`);
  revalidatePath(`/dashboard/projects/${projectId}`);
  return responseData;
}

/* -------------------------------------------------------------------------- */
/*                                  DELETE                                    */
/* -------------------------------------------------------------------------- */

export async function deleteProjectApiV1ProjectsProjectIdDelete(
  projectId: string
): Promise<void> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${BASE_URL}/api/v1/projects/${projectId}`,
    {
      method: "DELETE",
      headers,
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      getErrorMessage(errorData, response.status)
    );
  }

  revalidatePath(`/dashboard/projects`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

/* -------------------------------------------------------------------------- */
/*                                  ALIASES                                   */
/* -------------------------------------------------------------------------- */

export type Project = Types.ProjectOut;

export type ProjectStatus =
  | "prospect"
  | "proposal_sent"
  | "in_progress"
  | "completed"
  | "paused";

export const getProjectById =
  getProjectApiV1ProjectsProjectIdGet;

export const createProject =
  createProjectApiV1ProjectsPost;

export const updateProject =
  updateProjectApiV1ProjectsProjectIdPut;

export const deleteProject =
  deleteProjectApiV1ProjectsProjectIdDelete;

/* -------------------------------------------------------------------------- */
/*                                 HELPERS                                    */
/* -------------------------------------------------------------------------- */

export const getProjects = async (params?: any) => {
  const result =
    await listProjectsApiV1ProjectsGet(params);

  console.log(
    "NORMALIZED PROJECTS:",
    JSON.stringify(result, null, 2)
  );

  if (Array.isArray(result)) {
    return {
      data: result,
      total: result.length,
      page: Number(params?.page ?? 1),
      totalPages: 1,
    };
  }

  if (result?.items) {
    return {
      data: result.items,
      total:
        result.total ??
        result.items.length,
      page: Number(params?.page ?? 1),
      totalPages:
        result.total_pages ?? 1,
    };
  }

  return {
    data: [],
    total: 0,
    page: Number(params?.page ?? 1),
    totalPages: 1,
  };
};