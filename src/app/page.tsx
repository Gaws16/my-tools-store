"use client";

import Hero from "@/components/layout/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Home() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Hero />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("featured_products")}
        </h2>
        <ProductGrid />
      </section>
    </div>
  );
}
