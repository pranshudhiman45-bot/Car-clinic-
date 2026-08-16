# Services

Business logic goes here, one file per domain (e.g. `booking.service.ts`, `worker.service.ts`). Services are called from controllers and call repositories — they never touch Prisma or the database directly, and never import `express` types.
