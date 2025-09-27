import { NextResponse } from "next/server";
import { fetchProductSlugs } from "@/lib/supabase/queries/products";
import { fetchCategories } from "@/lib/supabase/queries/categories";

export const revalidate = 3600;

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = await fetchProductSlugs(2000);
  const categories = await fetchCategories();

  const urls: string[] = [
    `${base}/`,
    `${base}/search`,
    ...categories.map((c) => `${base}/category/${c.slug}`),
    ...products.map((s) => `${base}/products/${s}`),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((u) => `<url><loc>${u}</loc></url>`).join("") +
    `</urlset>`;

  return new NextResponse(xml, {
    headers: { "content-type": "application/xml" },
  });
}
