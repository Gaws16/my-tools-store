"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-semibold tracking-tight text-xl">
              ProTools
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-sm">
              <Link
                href="/categories/power-tools"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Power Tools
              </Link>
              <Link
                href="/categories/hand-tools"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Hand Tools
              </Link>
              <Link
                href="/categories/accessories"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Accessories
              </Link>
              <Link
                href="/categories/safety"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Safety
              </Link>
            </nav>
          </div>

          <form
            action="#"
            className="hidden md:flex relative w-full max-w-lg items-center"
          >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, brands, SKUs..."
              className="pl-9"
            />
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/auth/register">Create account</Link>
            </Button>
            <Button variant="outline" size="icon" aria-label="Cart" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t py-2">
            <div className="py-2">
              <form action="#" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="pl-9"
                />
              </form>
            </div>
            <nav className="grid gap-1 text-sm">
              <Link
                href="/categories/power-tools"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Power Tools
              </Link>
              <Link
                href="/categories/hand-tools"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Hand Tools
              </Link>
              <Link
                href="/categories/accessories"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Accessories
              </Link>
              <Link
                href="/categories/safety"
                className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                Safety
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
