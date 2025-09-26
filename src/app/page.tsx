"use client";

import Hero from "@/components/layout/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/components/product/ProductCard";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Home() {
  const { t } = useLocale();
  const products: Product[] = [
    {
      id: "1",
      name: "Cordless Drill 20V Max",
      price: 129.99,
      badge: "Bestseller",
    },
    { id: "2", name: "Oscillating Multi-Tool Kit", price: 99.99 },
    { id: "3", name: "Impact Driver Brushless", price: 149.0 },
    { id: "4", name: 'Circular Saw 7-1/4"', price: 179.0, badge: "New" },
    { id: "5", name: "Shop Vacuum 6 Gal", price: 89.5 },
    { id: "6", name: 'Angle Grinder 4-1/2"', price: 69.99 },
    { id: "7", name: 'Hammer Drill 1/2" SDS+', price: 219.0 },
    { id: "8", name: "Laser Level Self-Leveling", price: 129.0 },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Hero />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("featured_products")}
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
