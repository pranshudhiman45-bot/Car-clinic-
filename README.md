# Car Wash & Auto Care Booking Platform

A mobile-first booking and management system for a car washing and auto-care center.

Customers browse services (car wash, detailing, rubbing/polishing, PPF), pick a vehicle, date, and a genuinely available time slot, and book an appointment. The owner manages the entire business — services, prices, workers, bookings, offers, gallery — through an admin panel without needing a developer.

> **Current stage: Phase 1 (project setup) — complete.**
> The foundation runs end to end. The booking engine, authentication, and admin functionality are **not** implemented yet and are built in later phases.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui |
| Backend | Node.js, Express 5, TypeScript, REST API |
| Database | PostgreSQL + Prisma ORM 6 |
| Shared | `@carwash/shared` workspace package (types + constants) |
| Tooling | pnpm workspaces, ESLint 9, tsx, concurrently |
| Later | Cloudflare R2 (storage), Razorpay (payments), WhatsApp/SMS/email (notifications), React Native + Expo (mobile) |

### Architecture

The backend is deliberately **independent from Next.js**. Business logic never moves into Next.js API routes, because a React Native app will consume the exact same REST API later.

```
Next.js website ─┐
Admin panel ─────┼──► REST API ──► Express ──► Controllers ──► Services ──► Repositories ──► Prisma ──► PostgreSQL
React Native ────┘
```

- **Controllers** parse the request and shape the response. No business logic, no database access.
- **Services** hold business logic. No `express` imports, no Prisma.
- **Repositories** are the only layer that touches Prisma.

---

## Folder structure

```
car-wash-platform/
├── frontend/                   # Next.js app (customer site + admin panel)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (customer)/     # Route group: public site with header/footer/bottom nav
│   │   │   │   ├── page.tsx            # /
│   │   │   │   ├── services/           # /services, /services/[slug]
│   │   │   │   ├── offers/  gallery/
│   │   │   │   ├── book/               # /book, /book/confirmation
│   │   │   │   ├── bookings/  contact/
│   │   │   │   └── layout.tsx
│   │   │   ├── admin/          # /admin/* — separate layout, noindex
│   │   │   ├── layout.tsx      # Root layout + base SEO metadata
│   │   │   ├── sitemap.ts      # /sitemap.xml
│   │   │   └── robots.ts       # /robots.txt
│   │   ├── components/
│   │   │   ├── layout/         # Header, footer, mobile bottom nav, admin sidebar
│   │   │   └── ui/             # shadcn/ui primitives
│   │   ├── features/           # Feature-scoped code (one folder per domain feature)
│   │   ├── lib/                # env.ts, utils.ts
│   │   ├── hooks/              # use-media-query.ts
│   │   ├── services/           # api-client.ts — the only place that calls the backend
│   │   ├── types/              # Frontend-only types
│   │   └── config/             # site.ts (SEO/branding), nav.ts
│   ├── public/
│   └── .env.local.example
│
├── backend/                    # Express REST API
│   ├── src/
│   │   ├── config/             # env.ts (validated), cors.ts
│   │   ├── controllers/        # health.controller.ts
│   │   ├── middleware/         # error-handler, not-found, authenticate, authorize, validate
│   │   ├── routes/             # index.ts, health.routes.ts
│   │   ├── services/           # Business logic (empty — Phase 4+)
│   │   ├── repositories/       # Prisma queries (empty — Phase 2+)
│   │   ├── validators/         # Zod request schemas (empty — Phase 3+)
│   │   ├── utils/              # app-error.ts, api-response.ts
│   │   ├── types/              # express.d.ts (adds req.user)
│   │   ├── constants/          # roles.ts
│   │   ├── app.ts              # Express app + middleware wiring
│   │   └── server.ts           # Entry point
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── prisma.config.ts
│   └── .env.example
│
├── shared/                     # @carwash/shared — imported by BOTH apps
│   ├── types/index.ts          # Roles, API response envelopes
│   └── package.json
│
├── pnpm-workspace.yaml
├── package.json                # Root scripts
└── .gitignore
```

### About `shared/`

`@carwash/shared` is a real workspace package that both apps declare as a dependency and import as `@carwash/shared`. It holds the API response envelope and the canonical `Role` union.

**Never copy these definitions into an app** — that is exactly how shared types silently go stale. It compiles to `dist/` (CommonJS + declarations), so both consumers treat it as an ordinary dependency with no bundler-specific config. Keep it free of framework dependencies (no express, react, or prisma) so anything can import it.

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 10 — `npm install -g pnpm`
- **PostgreSQL** ≥ 14 running locally (or a hosted URL from Supabase/Neon)

---

## Installation

```bash
# 1. Install all workspace dependencies
pnpm install

# 2. Create your env files from the examples
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

Then edit `backend/.env` — set `DATABASE_URL` to your PostgreSQL connection string and `JWT_SECRET` to a long random value.

---

## Environment variables

### `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `PORT` | no (default `4000`) | Port the API listens on |
| `NODE_ENV` | no (default `development`) | `development` \| `test` \| `production` |
| `JWT_SECRET` | yes | Signing secret for auth tokens (Phase 3) |
| `FRONTEND_URL` | yes | Allowed CORS origin |
| `REVALIDATE_SECRET` | no | Shared secret for triggering Next.js ISR revalidation (Phase 6) |

Startup **fails fast with a readable error** if a required variable is missing or malformed — see `backend/src/config/env.ts`.

Future placeholders (Cloudflare R2, Razorpay, WhatsApp) are documented as comments in `.env.example` and are not required yet.

### `frontend/.env.local`

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | yes | Base URL of the backend API, e.g. `http://localhost:4000/api` |
| `NEXT_PUBLIC_SITE_URL` | yes | Public site URL, used for canonical URLs, sitemap, and Open Graph |

Only non-secret values ever go in `NEXT_PUBLIC_*` — they are exposed to the browser.

`.env` and `.env.local` are gitignored; only the `.example` files are committed.

---

## Database setup

Start PostgreSQL, then create the database and apply migrations:

```bash
createdb car_wash_platform     # or use your own database name in DATABASE_URL

pnpm db:migrate                # create + apply migrations, regenerate the client
pnpm db:seed                   # seed baseline development data
```

The seed is **idempotent** (safe to re-run) and inserts only development scaffolding — business hours and two example categories/services. No fake production data.

Useful:

```bash
pnpm db:status     # show migration state
pnpm db:studio     # browse data in Prisma Studio
pnpm db:generate   # regenerate the Prisma client
pnpm db:deploy     # apply migrations in production (no prompts)
```

---

## Running the app

### Everything at once (recommended)

```bash
pnpm dev
```

Builds `@carwash/shared`, then runs the shared type watcher, the backend, and the frontend together:

- Frontend → <http://localhost:3000>
- Backend → <http://localhost:4000>
- Health check → <http://localhost:4000/api/health>

### Individually

```bash
pnpm dev:backend    # Express on :4000 with hot reload (tsx watch)
pnpm dev:frontend   # Next.js on :3000
```

Run these from the repo root, not from inside `backend/` or `frontend/` — they build the shared package first.

---

## Available scripts

Run from the repo root:

| Script | What it does |
| --- | --- |
| `pnpm dev` | Run shared watcher + backend + frontend together |
| `pnpm dev:backend` | Backend only |
| `pnpm dev:frontend` | Frontend only |
| `pnpm build` | Production build of shared, backend, and frontend |
| `pnpm start` | Run the built backend and frontend |
| `pnpm lint` | ESLint across all packages |
| `pnpm typecheck` | TypeScript strict check across all packages |
| `pnpm db:migrate` | Create and apply a migration |
| `pnpm db:deploy` | Apply migrations without prompts (production) |
| `pnpm db:status` | Show migration state |
| `pnpm db:seed` | Seed development data |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:generate` | Regenerate the Prisma client |
| `pnpm clean` | Remove build output |

---

## API

Implemented today:

```
GET /api/health   →  { "success": true, "data": { "status": "ok" }, "message": "API is running" }
```

Every response — success or error — uses the envelope defined in `@carwash/shared`, so the frontend decodes one consistent shape:

```jsonc
// success
{ "success": true, "data": { ... }, "message": "optional" }

// error
{ "success": false, "message": "...", "errors": [{ "path": "...", "message": "..." }] }
```

Planned endpoints (auth, categories, services, offers, availability, bookings, admin) are designed but intentionally not implemented — they arrive in Phases 3–5.

---

## Conventions

- TypeScript **strict mode** everywhere, plus `noUncheckedIndexedAccess` on the backend.
- No `any` unless genuinely unavoidable.
- No business logic in UI components; no database queries in controllers.
- No hard-coded prices, service data, or worker availability — **the backend is the source of truth**.
- All errors flow through the centralized error handler; controllers never format error responses by hand.
- Request validation via Zod schemas in `validators/`, applied with the `validate()` middleware.

### Security posture (Phase 1)

Prepared and wired, but not yet enforced on any route since auth lands in Phase 3:

- `authenticate` middleware — verifies a Bearer JWT and populates `req.user`.
- `authorize(...roles)` middleware — role-based access control for `CUSTOMER` / `ADMIN` / `WORKER`.
- `helmet` security headers and a CORS allowlist driven by `FRONTEND_URL`.
- Environment validation that fails fast at startup.
- No secrets committed; no private values in `NEXT_PUBLIC_*`.

---

## Development roadmap

| Phase | Scope | Status |
| --- | --- | --- |
| **Phase 1** | Project setup | ✅ Complete |
| **Phase 2** | Database design + Prisma (incl. `WorkerShift`/`WorkerTimeOff`, booking row-locking strategy) | Next |
| **Phase 3** | Authentication + roles (OTP for customers, password for admin/worker) | |
| **Phase 4** | Admin panel | |
| **Phase 5** | Booking + worker availability engine (multi-worker matching, slot generation from real time ranges) | |
| **Phase 6** | Customer mobile-first website (incl. ISR + on-demand revalidation) | |
| **Phase 7** | Payments + notifications (start Razorpay KYC early, in parallel) | |
| **Phase 8** | Testing | |
| **Phase 9** | Deployment + SEO + Google Business Profile | |
| **Phase 10** | React Native mobile application | |

Each phase is reviewed before the next one begins.

### Notes carried into later phases

- **Availability** must be computed from real continuous time ranges (business hours minus bookings, leave, and breaks), not a fixed slot grid — service durations range from a 30-minute wash to a 5-hour PPF job. A fixed grid is acceptable for *display* only.
- **Multi-worker services** are a matching problem: if eligible-and-free workers < workers required, the slot is not bookable at all.
- **Double-booking prevention** needs an explicit locking strategy, not just a transaction. Start with `SELECT ... FOR UPDATE` row locks on the relevant workers inside the booking transaction; consider a `btree_gist` exclusion constraint only if that proves insufficient.
- **Dynamic pricing** must support fixed, vehicle-specific, and "starting from" models — don't force every service into one.
- **Publish/unpublish** is preferred over hard deletes for categories, services, packages, offers, and gallery items.

---

## Deployment target

| Piece | Platform |
| --- | --- |
| Frontend | Vercel |
| Backend | Render |
| Database | Supabase / Neon (managed PostgreSQL) |
| Storage | Cloudflare R2 |
