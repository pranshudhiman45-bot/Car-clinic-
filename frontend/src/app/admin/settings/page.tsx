import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Business hours and basic business settings will be managed here.
      </p>
    </div>
  );
}
