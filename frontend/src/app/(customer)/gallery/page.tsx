import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Before and after photos of our work.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Gallery</h1>
      <p className="text-sm text-muted-foreground">
        Photos of completed work will be shown here.
      </p>
    </div>
  );
}
