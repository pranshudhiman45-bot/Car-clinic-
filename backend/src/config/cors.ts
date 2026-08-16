import type { CorsOptions } from "cors";
import { env } from "./env";
import { AppError } from "../utils/app-error";

/**
 * FRONTEND_URL accepts a comma-separated list so the API can serve more than
 * one origin — e.g. `http://localhost:3000` for the dev machine plus
 * `http://192.168.1.x:3000` for testing on a real phone over the LAN.
 */
const allowedOrigins = env.FRONTEND_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Requests without an Origin header (curl, health checks, native mobile
    // apps) are not browser cross-origin requests, so there is nothing to block.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    // A disallowed origin is a client problem, not a server fault — surface it
    // as 403 so it does not show up as a 500 in logs and monitoring.
    callback(new AppError(403, `Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
};

export { allowedOrigins };
