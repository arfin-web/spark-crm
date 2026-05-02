"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  name: string;
  href: string;
}

interface MobileNavProps {
  links: NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-heading">Spark CRM</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-8">
          <nav className="flex flex-col justify-center items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <hr className="border-border" />
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full justify-center">
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button className="w-full justify-center rounded-full">
              <Link href="/signup">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
