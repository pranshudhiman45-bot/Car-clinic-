/**
 * Roles are defined once in `@carwash/shared` so the frontend, backend, and the
 * future mobile app agree on them. Re-exported here so backend code can keep
 * importing from `constants/`.
 */
export { ROLES, isRole, type Role } from "@carwash/shared";
