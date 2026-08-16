import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t py-8 pb-20 md:pb-8">
      <div className="px-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{siteConfig.name}</p>
        <p className="mt-1">{siteConfig.description}</p>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
