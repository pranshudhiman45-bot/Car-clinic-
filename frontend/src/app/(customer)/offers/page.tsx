import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current offers and discounts.",
};

export default function OffersPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Offers</h1>
      <p className="text-sm text-muted-foreground">
        Active offers and discounts will be listed here.
      </p>
    </div>
  );
}
