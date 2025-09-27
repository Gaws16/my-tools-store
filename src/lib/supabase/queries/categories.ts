import getSupabaseServerClient from "@/lib/supabase/server";
import getSupabaseBrowserClient from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export async function fetchCategories(params?: {
  client?: "server" | "browser";
}) {
  const { client = typeof window === "undefined" ? "server" : "browser" } =
    params || {};

  const supabase =
    client === "server"
      ? getSupabaseServerClient()
      : getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as CategoryRow[];
}

export function buildCategoryTree(rows: CategoryRow[]) {
  const byId: Record<string, CategoryRow & { children: CategoryRow[] }> = {};
  rows.forEach((r) => (byId[r.id] = { ...r, children: [] }));
  const roots: (CategoryRow & { children: CategoryRow[] })[] = [];
  rows.forEach((r) => {
    if (r.parent_id && byId[r.parent_id])
      byId[r.parent_id].children.push(byId[r.id]);
    else roots.push(byId[r.id]);
  });
  return roots;
}
