"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Tag, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Sparkles },
  { label: "Book", href: "/book", icon: CalendarCheck },
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "Bookings", href: "/bookings", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background md:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 text-[11px] font-medium",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
