# Types

Frontend-only TypeScript types (component props shared across features, view models, form shapes).

Types that the backend also needs — API response envelopes, roles, domain entities — belong in the `@carwash/shared` workspace package, not here. Import them with `import type { ApiResponse } from "@carwash/shared"`.
