import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchProductBySlug,
  fetchProductSlugs,
  fetchRelatedProducts,
} from "@/lib/supabase/queries/products";
import ProductGallery from "@/components/product/product-gallery";
import ProductSpecifications from "@/components/product/product-specifications";
import RelatedProducts from "@/components/product/related-products";
import Breadcrumb from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";

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
  const specs = (product.specifications as any) || null;
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

          <div className="text-sm text-muted-foreground">
            {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
          </div>

          <div className="flex items-center gap-2">
            <Button size="lg">Add to cart</Button>
            <Button variant="outline" size="lg">
              Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {product.power_source && (
              <div>
                <span className="text-muted-foreground">Power:</span>{" "}
                {product.power_source}
              </div>
            )}
            {product.voltage != null && (
              <div>
                <span className="text-muted-foreground">Voltage:</span>{" "}
                {product.voltage} V
              </div>
            )}
            {product.warranty_months != null && (
              <div>
                <span className="text-muted-foreground">Warranty:</span>{" "}
                {product.warranty_months} mo
              </div>
            )}
            {product.brands?.name && (
              <div>
                <span className="text-muted-foreground">Brand:</span>{" "}
                {product.brands.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {product.description && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {product.description}
          </p>
        </section>
      )}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Specifications</h2>
        <ProductSpecifications specs={specs} />
      </section>

      {Array.isArray(product.features) && product.features.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Features</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {(product.features as string[]).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      <RelatedProducts products={related as any} />
    </div>
  );
}
