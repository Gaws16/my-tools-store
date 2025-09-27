import getSupabaseBrowserClient from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

export type CartItemRow = Database["public"]["Tables"]["cart_items"]["Row"];

export async function addToCart(productId: string, quantity = 1) {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      { user_id: user.id, product_id: productId, quantity },
      { onConflict: "user_id,product_id" }
    )
    .select()
    .single();
  if (error) throw error;
  return data as CartItemRow;
}

export async function getCart() {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [] as CartItemRow[];
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as CartItemRow[];
}
