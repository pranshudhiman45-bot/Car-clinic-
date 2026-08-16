import type { NextFunction, Request, Response } from "express";
import type { Role } from "../constants/roles";
import { AppError } from "../utils/app-error";

/**
 * Role-based access control. Use after `authenticate` on protected routes,
 * e.g. `router.get("/admin/x", authenticate, authorize("ADMIN"), handler)`.
 */
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError(401, "Authentication required"));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError(403, "You do not have permission to perform this action"));
      return;
    }

    next();
  };
}
