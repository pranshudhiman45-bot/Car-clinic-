import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";
import { sendError } from "../utils/api-response";
import { env } from "../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    sendError(
      res,
      422,
      "Validation failed",
      err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
    return;
  }

  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  // Errors thrown by Express internals (e.g. malformed JSON from body-parser)
  // carry their own status. Honour it instead of masking it as a 500.
  const status = getErrorStatus(err);
  if (status && status < 500) {
    sendError(res, status, err instanceof Error ? err.message : "Bad request");
    return;
  }

  // Unexpected error: log it, but never leak internals to the client in production.
  if (env.NODE_ENV !== "test") {
    console.error(err);
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  sendError(res, 500, env.NODE_ENV === "production" ? "Internal server error" : message);
}

function getErrorStatus(err: unknown): number | undefined {
  if (typeof err !== "object" || err === null) {
    return undefined;
  }
  const { status, statusCode } = err as { status?: unknown; statusCode?: unknown };
  const value = typeof status === "number" ? status : statusCode;
  return typeof value === "number" && value >= 400 && value <= 599 ? value : undefined;
}
