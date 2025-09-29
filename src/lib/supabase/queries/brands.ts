import type { Database } from "@/lib/supabase/database.types";
import getSupabaseServerClient from "@/lib/supabase/server";

export type BrandRow = Database["public"]["Tables"]["brands"]["Row"];

export async function fetchBrands() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });
  if (error) throw error;
  return (data || []) as BrandRow[];
}
