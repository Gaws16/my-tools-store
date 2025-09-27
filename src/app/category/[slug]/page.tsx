import { fetchCategories } from "@/lib/supabase/queries/categories";
import { fetchProducts } from "@/lib/supabase/queries/products";
import Breadcrumb from "@/components/layout/breadcrumb";
import ProductGrid from "@/components/product/ProductGrid";

export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await fetchCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { q?: string };
}) {
  const categories = await fetchCategories();
  const category = categories.find((c) => c.slug === params.slug);
  const q = searchParams?.q || "";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category?.name || "Category" },
        ]}
      />
      {category?.description && (
        <p className="text-sm text-muted-foreground">{category.description}</p>
      )}
      <ProductGrid initialCategory={params.slug} initialSearch={q} />
    </div>
  );
}
