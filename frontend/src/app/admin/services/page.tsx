import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Services",
  robots: { index: false, follow: false },
};

export default function AdminServicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Services</h1>
      <p className="text-sm text-muted-foreground">
        Services, packages, pricing, and duration management will be built here.
      </p>
    </div>
  );
}
