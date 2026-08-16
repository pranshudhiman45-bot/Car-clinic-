# Repositories

All Prisma queries live here, one file per model (e.g. `booking.repository.ts`, `worker.repository.ts`). Repositories are the only layer that imports the Prisma client — services depend on repositories, never on Prisma directly.
