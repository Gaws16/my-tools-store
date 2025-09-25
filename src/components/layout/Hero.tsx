import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            New season • Pro-grade
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Build better with pro tools that last
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Top-tier power tools, precision hand tools, and safety gear curated
            for professionals and enthusiasts. Shop trusted brands and elevate
            your craft.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/collections/new">Shop new arrivals</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/power-tools">Browse power tools</Link>
            </Button>
          </div>
        </div>
        <div className="aspect-video md:aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-background border flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <div className="text-7xl">🛠️</div>
            <p className="mt-3 text-sm">Hero image placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
