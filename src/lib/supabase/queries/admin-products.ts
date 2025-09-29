import getSupabaseServerClient from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

export async function createProduct(payload: ProductInsert) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProductById(id: string) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
