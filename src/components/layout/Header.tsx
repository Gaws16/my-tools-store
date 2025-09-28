"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import SearchAutocomplete from "@/components/layout/search-autocomplete";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-16 items-center justify-between gap-6">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-semibold tracking-tight text-xl whitespace-nowrap"
            >
              {t("brand")}
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-accent-foreground transition-colors"
            >
              Products
            </Link>
          </div>

          {/* Center: Search */}
          <div className="flex-1">
            <SearchAutocomplete />
          </div>

          {/* Right: Auth + Cart */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="whitespace-nowrap"
              asChild
            >
              <Link href="/auth/sign-in">{t("sign_in")}</Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="whitespace-nowrap"
              asChild
            >
              <Link href="/auth/register">{t("create_account")}</Link>
            </Button>
            <Button variant="outline" size="icon" aria-label="Cart" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex h-16 items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-semibold tracking-tight text-xl">
              {t("brand")}
            </Link>
            <Button variant="outline" size="icon" aria-label="Cart" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {open && (
            <div className="border-t py-4 space-y-4">
              <div>
                <SearchAutocomplete />
              </div>
              <div>
                <Link
                  href="/search"
                  className="text-sm font-medium hover:text-accent-foreground transition-colors"
                >
                  Products
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/sign-in">{t("sign_in")}</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/auth/register">{t("create_account")}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
