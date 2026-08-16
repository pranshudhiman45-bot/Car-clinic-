# @carwash/shared

Types and constants shared by `frontend`, `backend`, and later the React Native app.

Both apps depend on this package through the pnpm workspace (`"@carwash/shared": "workspace:*"`) and import it as `@carwash/shared`. Definitions here must **never** be copy-pasted into an app — that is exactly how shared types go stale.

The package compiles to CommonJS + declarations in `dist/`, so every consumer treats it as an ordinary dependency with no bundler-specific configuration. `pnpm dev` at the repo root runs `tsc --watch` here, so edits are picked up by both apps immediately.

Keep this package free of framework/runtime dependencies (no express, react, or prisma) so anything can import it.
