"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "bg" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "locale";

export const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    brand: "ProTools",
    nav_power: "Power Tools",
    nav_hand: "Hand Tools",
    nav_accessories: "Accessories",
    nav_safety: "Safety",
    search_placeholder: "Search tools, brands, SKUs...",
    sign_in: "Sign in",
    create_account: "Create account",
    hero_badge: "New season • Pro-grade",
    hero_title: "Build better with pro tools that last",
    hero_subtitle:
      "Top-tier power tools, precision hand tools, and safety gear curated for professionals and enthusiasts. Shop trusted brands and elevate your craft.",
    hero_cta_primary: "Shop new arrivals",
    hero_cta_secondary: "Browse power tools",
    featured_products: "Featured products",
    footer_shop: "Shop",
    footer_company: "Company",
    footer_support: "Support",
    footer_about: "About",
    footer_careers: "Careers",
    footer_blog: "Blog",
    footer_contact: "Contact",
    footer_help: "Help Center",
    footer_shipping: "Shipping & Returns",
    footer_warranty: "Warranty",
    footer_privacy: "Privacy Policy",
    footer_built: "Built with Next.js, Tailwind CSS, and shadcn/ui",
    in_stock: "In stock",
    add_to_cart: "Add to cart",
    language: "Language",
  },
  bg: {
    brand: "ProTools",
    nav_power: "Електроинструменти",
    nav_hand: "Ръчни инструменти",
    nav_accessories: "Аксесоари",
    nav_safety: "Безопасност",
    search_placeholder: "Търсене на инструменти, марки, SKU...",
    sign_in: "Вход",
    create_account: "Създай акаунт",
    hero_badge: "Нов сезон • Професионално",
    hero_title: "Строй по-добре с инструменти, които издържат",
    hero_subtitle:
      "Топ електроинструменти, прецизни ръчни инструменти и защитно оборудване за професионалисти и ентусиасти. Пазарувай от доверени марки и подобри занаята си.",
    hero_cta_primary: "Нови предложения",
    hero_cta_secondary: "Разгледай електроинструменти",
    featured_products: "Акцентни продукти",
    footer_shop: "Магазин",
    footer_company: "Компания",
    footer_support: "Поддръжка",
    footer_about: "За нас",
    footer_careers: "Кариери",
    footer_blog: "Блог",
    footer_contact: "Контакт",
    footer_help: "Помощен център",
    footer_shipping: "Доставка и връщане",
    footer_warranty: "Гаранция",
    footer_privacy: "Поверителност",
    footer_built: "Изградено с Next.js, Tailwind CSS и shadcn/ui",
    in_stock: "В наличност",
    add_to_cart: "Добави в количката",
    language: "Език",
  },
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bg");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as Locale | null;
    if (stored === "bg" || stored === "en") setLocaleState(stored);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const dict = useMemo(() => dictionaries[locale], [locale]);
  const t = useMemo(() => (key: string) => dict[key] ?? key, [dict]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
