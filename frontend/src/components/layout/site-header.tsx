"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { customerNavItems } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {customerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button render={<Link href="/book" />} size="sm">
            Book now
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
            className="md:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{siteConfig.shortName}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {customerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                render={<Link href="/book" onClick={() => setOpen(false)} />}
                className="mt-2"
              >
                Book now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
