"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

function formatCurrency(amount: number, locale: string, currency: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export default function Price({
  amount,
  saleAmount,
  className,
}: {
  amount: number;
  saleAmount?: number;
  className?: string;
}) {
  const { locale } = useLocale();
  const isBg = locale === "bg";

  // Use fixed BGN/EUR peg 1 EUR = 1.95583 BGN to avoid live FX jitter
  const EUR_PER_BGN = 1 / 1.95583;

  const amountBGN = amount;
  const amountEUR = amount * EUR_PER_BGN;
  const saleBGN = saleAmount != null ? saleAmount : undefined;
  const saleEUR = saleAmount != null ? saleAmount * EUR_PER_BGN : undefined;

  const bgn = (v: number) => formatCurrency(v, "bg-BG", "BGN");
  const eur = (v: number) => formatCurrency(v, "en-IE", "EUR");

  if (isBg) {
    if (saleBGN != null && saleEUR != null) {
      return (
        <div className={className}>
          <span className="text-xl font-semibold">{bgn(saleBGN)}</span>
          <span className="ml-2 text-muted-foreground line-through">
            {bgn(amountBGN)}
          </span>
          <span className="ml-3 text-sm text-muted-foreground">
            {eur(saleEUR)} ({eur(amountEUR)})
          </span>
        </div>
      );
    }
    return (
      <div className={className}>
        <span className="text-2xl font-semibold">{bgn(amountBGN)}</span>
        <span className="ml-3 text-sm text-muted-foreground">
          {eur(amountEUR)}
        </span>
      </div>
    );
  }

  if (saleEUR != null) {
    return (
      <div className={className}>
        <span className="text-2xl font-semibold">{eur(saleEUR)}</span>
        <span className="ml-2 text-muted-foreground line-through">
          {eur(amountEUR)}
        </span>
      </div>
    );
  }

  return <div className={className}>{eur(amountEUR)}</div>;
}
