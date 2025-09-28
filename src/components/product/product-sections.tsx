"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import ProductSpecifications from "./product-specifications";

interface ProductSectionsProps {
  product: {
    description?: string;
    features?: string[];
    specifications?: any;
  };
}

export default function ProductSections({ product }: ProductSectionsProps) {
  const { t } = useLocale();

  return (
    <>
      {product.description && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("description")}</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {product.description}
          </p>
        </section>
      )}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{t("specifications")}</h2>
        <ProductSpecifications specs={product.specifications} />
      </section>

      {Array.isArray(product.features) && product.features.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("features")}</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
