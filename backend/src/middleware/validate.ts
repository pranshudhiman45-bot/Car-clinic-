import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

interface ValidateSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

/**
 * Validates request data against Zod schemas and normalizes it in place.
 * `req.query` is read-only in Express 5, so parsed values are merged onto
 * the existing object rather than replacing it.
 */
export function validate(schemas: ValidateSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        Object.assign(req.query, schemas.query.parse(req.query));
      }
      if (schemas.params) {
        Object.assign(req.params, schemas.params.parse(req.params));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
