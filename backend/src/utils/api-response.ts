import type { Response } from "express";
import type { ApiErrorResponse, ApiSuccessResponse } from "@carwash/shared";

/**
 * Helpers that guarantee every response matches the envelope in
 * `@carwash/shared`, which the frontend's api-client decodes.
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  { status = 200, message }: { status?: number; message?: string } = {},
): void {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (message) {
    body.message = message;
  }
  res.status(status).json(body);
}

export function sendError(
  res: Response,
  status: number,
  message: string,
  errors?: ApiErrorResponse["errors"],
): void {
  const body: ApiErrorResponse = { success: false, message };
  if (errors) {
    body.errors = errors;
  }
  res.status(status).json(body);
}
