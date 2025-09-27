import ProductCard from "@/components/product/ProductCard";
import type { ProductRow } from "@/lib/supabase/queries/products";

export default function RelatedProducts({
  products,
}: {
  products: ProductRow[];
}) {
  if (!products?.length) return null;
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Related products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              id: p.id,
              name: p.name,
              price: Number(p.sale_price ?? p.price),
              imageUrl:
                Array.isArray(p.images) && p.images.length
                  ? (p.images as any)[0]
                  : undefined,
              badge: p.is_featured ? "Featured" : undefined,
            }}
          />
        ))}
      </div>
    </section>
  );
}
