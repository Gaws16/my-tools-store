import { type Database } from "@/lib/supabase/database.types";
import getSupabaseServerClient from "@/lib/supabase/server";
import getSupabaseBrowserClient from "@/lib/supabase/client";

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export async function fetchProducts(params: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  client?: "server" | "browser";
  minPrice?: number;
  maxPrice?: number;
  brandSlugs?: string[];
  powerSource?: "battery" | "corded" | "manual" | "pneumatic";
  inStockOnly?: boolean;
  sort?: "price_asc" | "price_desc" | "name_asc" | "featured";
}) {
  const {
    page = 1,
    pageSize = 12,
    categorySlug,
    search,
    featured,
    client = typeof window === "undefined" ? "server" : "browser",
    minPrice,
    maxPrice,
    brandSlugs,
    powerSource,
    inStockOnly,
    sort,
  } = params || {};

  const supabase =
    client === "server"
      ? getSupabaseServerClient()
      : getSupabaseBrowserClient();

  let query = supabase
    .from("products")
    .select("*, categories!inner(slug)", { count: "exact" })
    .eq("is_active", true)
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (featured) query = query.eq("is_featured", true);
  if (categorySlug) query = query.eq("categories.slug", categorySlug);
  if (search) query = query.textSearch("name", search, { type: "websearch" });
  if (minPrice != null) query = query.gte("price", minPrice);
  if (maxPrice != null) query = query.lte("price", maxPrice);
  if (Array.isArray(brandSlugs) && brandSlugs.length) {
    query = query.in(
      "brand_id",
      (
        await getSupabaseServerClient()
          .from("brands")
          .select("id, slug")
          .in("slug", brandSlugs)
      ).data?.map((b: any) => b.id) || []
    );
  }
  if (powerSource) query = query.eq("power_source", powerSource);
  if (inStockOnly) query = query.gt("stock_quantity", 0);

  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    case "featured":
      query = query
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { products: data as unknown as ProductRow[], total: count ?? 0 };
}

export async function fetchProductBySlug(slug: string) {
  const supabase =
    typeof window === "undefined"
      ? getSupabaseServerClient()
      : getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "*, brands:brand_id(name, slug), categories:category_id(name, slug)"
    )
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data as ProductRow;
}

export async function fetchProductSlugs(limit = 2000) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []).map((d) => d.slug as string);
}

export async function fetchRelatedProducts(
  categorySlug: string,
  excludeSlug?: string,
  limit = 8
) {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("products")
    .select("*, categories:category_id(slug)")
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (excludeSlug) query = query.neq("slug", excludeSlug);
  const { data, error } = await query;
  if (error) throw error;
  return data as ProductRow[];
}
