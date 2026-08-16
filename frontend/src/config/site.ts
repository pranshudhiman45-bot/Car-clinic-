export const siteConfig = {
  name: "ShineWorks",
  shortName: "ShineWorks",
  description:
    "Book car wash, detailing, polishing, and PPF services online. Real-time slot availability and instant confirmation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  keywords: [
    "car wash booking",
    "car detailing",
    "car polishing",
    "PPF service",
    "car care appointment",
  ],
  links: {
    // Populated in a later phase (business contact details, socials, etc.)
  },
} as const;

export type SiteConfig = typeof siteConfig;
