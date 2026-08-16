import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Workers",
  robots: { index: false, follow: false },
};

export default function AdminWorkersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Workers</h1>
      <p className="text-sm text-muted-foreground">
        Worker profiles, skills, working hours, and availability will be managed here.
      </p>
    </div>
  );
}
