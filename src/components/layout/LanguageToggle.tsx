"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === "bg" ? "en" : "bg";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      aria-label="Toggle language"
    >
      {locale.toUpperCase()}
    </Button>
  );
}

export default LanguageToggle;
