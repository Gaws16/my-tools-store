"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageDropdown() {
  const { locale, setLocale } = useLocale();
  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as "bg" | "en")}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectItem value="bg">BG</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LanguageDropdown;
