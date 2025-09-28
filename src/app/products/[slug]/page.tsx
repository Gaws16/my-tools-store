import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchProductBySlug,
  fetchProductSlugs,
  fetchRelatedProducts,
} from "@/lib/supabase/queries/products";
import ProductGallery from "@/components/product/product-gallery";
import RelatedProducts from "@/components/product/related-products";
import ProductActions from "@/components/product/product-actions";
import ProductInfo from "@/components/product/product-info";
import ProductSections from "@/components/product/product-sections";
import Breadcrumb from "@/components/layout/breadcrumb";

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const p = await fetchProductBySlug(params.slug);
    return {
      title: p.seo_title || p.name,
      description: p.seo_description || p.short_description || undefined,
      openGraph: {
        title: p.seo_title || p.name,
        description: p.seo_description || p.short_description || undefined,
        images: Array.isArray(p.images) ? (p.images as any) : [],
      },
    };
  } catch {
    return { title: "Product", description: undefined };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  let product: any;
  try {
    product = await fetchProductBySlug(params.slug);
  } catch {
    notFound();
  }

  const images: string[] = Array.isArray(product.images)
    ? (product.images as any)
    : [];
  const categorySlug = product?.categories?.slug as string | undefined;
  const related = categorySlug
    ? await fetchRelatedProducts(categorySlug, product.slug, 8)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: product?.categories?.name || "Category",
            href: categorySlug ? `/category/${categorySlug}` : undefined,
          },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          images={
            images.length
              ? images
              : ["https://picsum.photos/seed/placeholder/1200/1200"]
          }
        />

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-3">
            {product.sale_price ? (
              <>
                <div className="text-2xl font-semibold">
                  ${Number(product.sale_price).toFixed(2)}
                </div>
                <div className="text-muted-foreground line-through">
                  ${Number(product.price).toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-2xl font-semibold">
                ${Number(product.price).toFixed(2)}
              </div>
            )}
          </div>

          {product.short_description && (
            <p className="text-muted-foreground">{product.short_description}</p>
          )}

          <ProductInfo product={product} />

          <ProductActions
            product={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              sale_price: product.sale_price
                ? Number(product.sale_price)
                : undefined,
              imageUrl:
                Array.isArray(product.images) && product.images.length
                  ? (product.images as any)[0]
                  : undefined,
              slug: product.slug,
              stock_quantity: product.stock_quantity,
            }}
          />
        </div>
      </div>

      <ProductSections product={product} />

      <RelatedProducts products={related as any} />
    </div>
  );
}
