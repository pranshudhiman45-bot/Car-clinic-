import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Select a service, vehicle type, date, and available slot.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Book an appointment</h1>
      <p className="text-sm text-muted-foreground">
        The booking flow (service, vehicle, date, and slot selection) will be built here.
      </p>
    </div>
  );
}
