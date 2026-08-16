import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const staticRoutes = ["/", "/services", "/offers", "/gallery", "/book", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
