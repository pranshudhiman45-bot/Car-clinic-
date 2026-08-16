"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/config/nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b px-2 py-2 md:w-56 md:shrink-0 md:flex-col md:overflow-visible md:border-b-0 md:border-r md:px-3 md:py-4">
      {adminNavItems.map((item) => {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
