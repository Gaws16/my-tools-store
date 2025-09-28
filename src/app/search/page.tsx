"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const initial = sp.get("q") || "";
  const [q, setQ] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(Array.from(sp.entries()));
      if (q) params.set("q", q);
      else params.delete("q");
      router.replace(`/search?${params.toString()}`);
      try {
        if (q) {
          const recent = JSON.parse(
            localStorage.getItem("recent_searches") || "[]"
          );
          const next = [q, ...recent.filter((r: string) => r !== q)].slice(
            0,
            5
          );
          localStorage.setItem("recent_searches", JSON.stringify(next));
        }
      } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
      />
      <ProductGrid initialSearch={q} />
    </div>
  );
}
