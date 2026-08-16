import type { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response";

export function getHealth(_req: Request, res: Response) {
  sendSuccess(res, { status: "ok" }, { message: "API is running" });
}
