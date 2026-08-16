import type { ApiResponse } from "@carwash/shared";
import { env } from "@/lib/env";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const body = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !body || !body.success) {
    throw new ApiRequestError(
      body?.message ?? `Request failed with status ${res.status}`,
      res.status,
    );
  }

  return body.data;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: "GET" }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { ...init, method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { ...init, method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: "DELETE" }),
};
