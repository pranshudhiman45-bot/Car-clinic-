import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Browse car wash, detailing, polishing, and PPF services.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Services</h1>
      <p className="text-sm text-muted-foreground">
        Service categories and packages will be listed here.
      </p>
    </div>
  );
}
