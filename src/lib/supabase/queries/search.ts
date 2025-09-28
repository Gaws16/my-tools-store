import getSupabaseServerClient from "@/lib/supabase/server";
import getSupabaseBrowserClient from "@/lib/supabase/client";

export async function searchProducts({
  q,
  limit = 10,
  client,
}: {
  q: string;
  limit?: number;
  client?: "server" | "browser";
}) {
  const supabase =
    client === "browser"
      ? getSupabaseBrowserClient()
      : getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, images, short_description")
    .eq("is_active", true)
    .textSearch("name", q, { type: "websearch" })
    .limit(limit);
  if (error) throw error;
  return data || [];
}
