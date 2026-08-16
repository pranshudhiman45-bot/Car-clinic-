import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/app-error";
import type { AuthUser } from "../types/express";

/**
 * Verifies the Bearer JWT on protected routes and attaches the decoded
 * user to `req.user`. Not yet wired to any route — authentication itself
 * (login/register/token issuance) lands in a later phase.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new AppError(401, "Authentication required"));
    return;
  }

  const token = header.slice("Bearer ".length);

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}
