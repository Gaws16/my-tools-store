"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  buildCategoryTree,
} from "@/lib/supabase/queries/categories";

export default function CategoryNav() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const cats = await fetchCategories({ client: "browser" });
        const tree = buildCategoryTree(cats);
        setCategories(tree);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <nav className="text-sm">
        <div className="flex gap-3">
          <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-18 bg-muted animate-pulse rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="text-sm">
      <ul className="flex gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((c) => (
          <li key={c.id} className="flex-shrink-0">
            <Link
              href={`/category/${c.slug}`}
              className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground whitespace-nowrap text-sm transition-colors"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
