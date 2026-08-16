import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Offers",
  robots: { index: false, follow: false },
};

export default function AdminOffersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Offers</h1>
      <p className="text-sm text-muted-foreground">
        Offers and discount management will be built here.
      </p>
    </div>
  );
}
