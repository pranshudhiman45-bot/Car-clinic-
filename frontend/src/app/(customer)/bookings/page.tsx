import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View your booking status and history.",
};

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">My bookings</h1>
      <p className="text-sm text-muted-foreground">
        Your booking status and history will appear here once authentication is in place.
      </p>
    </div>
  );
}
