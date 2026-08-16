import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories",
  robots: { index: false, follow: false },
};

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Categories</h1>
      <p className="text-sm text-muted-foreground">
        Service category management will be built here.
      </p>
    </div>
  );
}
