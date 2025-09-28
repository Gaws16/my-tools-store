"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

interface ProductInfoProps {
  product: {
    stock_quantity: number;
    power_source?: string;
    voltage?: number;
    warranty_months?: number;
    brands?: { name: string };
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { t } = useLocale();

  return (
    <>
      <div className="text-sm text-muted-foreground">
        {product.stock_quantity > 0 ? t("in_stock") : t("out_of_stock")}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {product.power_source && (
          <div>
            <span className="text-muted-foreground">{t("power")}:</span>{" "}
            {product.power_source}
          </div>
        )}
        {product.voltage != null && (
          <div>
            <span className="text-muted-foreground">{t("voltage")}:</span>{" "}
            {product.voltage} V
          </div>
        )}
        {product.warranty_months != null && (
          <div>
            <span className="text-muted-foreground">{t("warranty")}:</span>{" "}
            {product.warranty_months} mo
          </div>
        )}
        {product.brands?.name && (
          <div>
            <span className="text-muted-foreground">{t("brand_label")}:</span>{" "}
            {product.brands.name}
          </div>
        )}
      </div>
    </>
  );
}
