"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/supabase/queries/products";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  badge?: string;
};

export function ProductGrid({
  initialCategory,
  initialSearch,
}: {
  initialCategory?: string;
  initialSearch?: string;
}) {
  const { t } = useLocale();
  const [search, setSearch] = useState(initialSearch ?? "");
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch ?? "");
  }, [initialSearch]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { products: rows, total } = await fetchProducts({
          page,
          pageSize,
          categorySlug: category,
          search: search || undefined,
          client: "browser",
        });
        if (!mounted) return;
        setProducts(
          (rows || []).map((r: any) => ({
            id: r.id,
            name: r.name,
            price: r.sale_price ?? r.price ?? 0,
            imageUrl:
              Array.isArray(r.images) && r.images.length
                ? r.images[0]
                : undefined,
            badge: r.is_featured ? "Featured" : undefined,
          }))
        );
        setTotal(total);
      } catch (e: any) {
        if (!mounted) return;
        setError(e.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, category, search]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Input
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full sm:max-w-xs"
        />
        <Select
          value={category ?? "all"}
          onValueChange={(val) => {
            setPage(1);
            setCategory(val === "all" ? undefined : val);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("footer_shop")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* TODO: Populate categories from Supabase and lift state up if needed */}
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-lg border animate-pulse bg-muted"
            />
          ))}
        </div>
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          {total} results • Page {page} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
