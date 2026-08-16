import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Gallery",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight">Gallery</h1>
      <p className="text-sm text-muted-foreground">
        Gallery image management will be built here.
      </p>
    </div>
  );
}
