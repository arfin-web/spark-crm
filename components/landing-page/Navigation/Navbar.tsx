import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight font-heading">
              Spark <span className="text-primary">CRM</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button size="sm" className="rounded-full px-6 shadow-md shadow-primary/10">
              <Link href="/signup">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
