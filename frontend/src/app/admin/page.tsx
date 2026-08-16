import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Booking, revenue, and worker utilization overview will be shown here.
      </p>
    </div>
  );
}
