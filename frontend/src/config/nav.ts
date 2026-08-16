export interface NavItem {
  label: string;
  href: string;
}

export const customerNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Services", href: "/admin/services" },
  { label: "Workers", href: "/admin/workers" },
  { label: "Offers", href: "/admin/offers" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Settings", href: "/admin/settings" },
];
