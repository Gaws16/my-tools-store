import getSupabaseServerClient from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export async function fetchCategories() {
  const supabase = getSupabaseServerClient();
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
