/**
 * Types and constants shared by the frontend, the backend, and (later) the
 * React Native app. This package is consumed via the `@carwash/shared`
 * workspace dependency — never copy these definitions into an app, or they
 * silently drift apart.
 *
 * Keep this package free of framework and runtime dependencies (no express,
 * no react, no prisma) so every consumer can import it.
 */

/** Canonical user roles. Kept in sync with the `Role` enum in schema.prisma. */
export const ROLES = ["CUSTOMER", "ADMIN", "WORKER"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** Envelope returned by every successful REST endpoint. */
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

/** Envelope returned by the centralized error handler. */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: { path: string; message: string }[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
