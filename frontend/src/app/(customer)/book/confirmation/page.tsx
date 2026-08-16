import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed",
};

export default function BookingConfirmationPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Booking confirmation</h1>
      <p className="text-sm text-muted-foreground">
        Booking confirmation details will be shown here once the booking engine is built.
      </p>
    </div>
  );
}
