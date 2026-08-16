import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Bookings",
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Bookings</h1>
      <p className="text-sm text-muted-foreground">
        Booking management and worker assignment will be built here.
      </p>
    </div>
  );
}
