"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchProducts } from "@/lib/supabase/queries/search";
import { Input } from "@/components/ui/input";

export default function SearchAutocomplete() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (!q) {
      setItems([]);
      setOpen(false);
      return;
    }
    timeoutRef.current = window.setTimeout(async () => {
      try {
        const res = await searchProducts({ q, limit: 6, client: "browser" });
        setItems(res);
        setOpen(true);
      } catch {
        setItems([]);
        setOpen(false);
      }
    }, 250);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [q]);

  return (
    <div className="relative w-full">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
      />
      {open && items.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow">
          <ul className="max-h-80 overflow-auto py-1 text-sm">
            {items.map((it) => (
              <li key={it.id}>
                <Link
                  href={`/products/${it.slug}`}
                  className="block px-3 py-2 hover:bg-muted"
                >
                  <div className="font-medium">{it.name}</div>
                  {it.short_description && (
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {it.short_description}
                    </div>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/search?q=${encodeURIComponent(q)}`}
                className="block px-3 py-2 text-primary hover:underline"
              >
                View all results
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
