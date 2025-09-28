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
    // Cart translations
    cart_empty_title: "Your cart is empty",
    cart_empty_description:
      "Looks like you haven't added any items to your cart yet.",
    continue_shopping: "Continue Shopping",
    shopping_cart: "Shopping Cart",
    items_in_cart: "items in your cart",
    item_in_cart: "item in your cart",
    order_summary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    proceed_to_checkout: "Proceed to Checkout",
    clear_cart: "Clear Cart",
    each: "each",
    // Checkout translations
    checkout: "Checkout",
    back_to_cart: "Back to Cart",
    contact_information: "Contact Information",
    email: "Email",
    shipping_address: "Shipping Address",
    first_name: "First Name",
    last_name: "Last Name",
    address: "Address",
    city: "City",
    zip_code: "ZIP Code",
    payment_information: "Payment Information",
    stripe_integration: "Stripe Payment Integration",
    stripe_description:
      "This would integrate with Stripe for secure payment processing",
    card_number: "Card Number",
    expiry_date: "Expiry Date",
    complete_order: "Complete Order",
    processing: "Processing...",
    secure_payment: "Your payment information is secure and encrypted",
    calculated_at_checkout: "Calculated at checkout",
    // Product detail translations
    out_of_stock: "Out of stock",
    adding: "Adding...",
    description: "Description",
    specifications: "Specifications",
    features: "Features",
    power: "Power",
    voltage: "Voltage",
    warranty: "Warranty",
    brand_label: "Brand",
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
    // Cart translations
    cart_empty_title: "Количката ви е празна",
    cart_empty_description:
      "Изглежда, че все още не сте добавили продукти в количката си.",
    continue_shopping: "Продължи пазаруването",
    shopping_cart: "Количка за пазаруване",
    items_in_cart: "продукта в количката ви",
    item_in_cart: "продукт в количката ви",
    order_summary: "Резюме на поръчката",
    subtotal: "Междинна сума",
    shipping: "Доставка",
    tax: "Данък",
    total: "Общо",
    proceed_to_checkout: "Продължи към плащане",
    clear_cart: "Изчисти количката",
    each: "брой",
    // Checkout translations
    checkout: "Плащане",
    back_to_cart: "Назад към количката",
    contact_information: "Информация за контакт",
    email: "Имейл",
    shipping_address: "Адрес за доставка",
    first_name: "Име",
    last_name: "Фамилия",
    address: "Адрес",
    city: "Град",
    zip_code: "Пощенски код",
    payment_information: "Информация за плащане",
    stripe_integration: "Интеграция с Stripe за плащане",
    stripe_description:
      "Това ще се интегрира с Stripe за сигурна обработка на плащания",
    card_number: "Номер на карта",
    expiry_date: "Дата на изтичане",
    complete_order: "Завърши поръчката",
    processing: "Обработва се...",
    secure_payment: "Информацията ви за плащане е сигурна и криптирана",
    calculated_at_checkout: "Изчислява се при плащане",
    // Product detail translations
    out_of_stock: "Няма в наличност",
    adding: "Добавя се...",
    description: "Описание",
    specifications: "Спецификации",
    features: "Функции",
    power: "Захранване",
    voltage: "Напрежение",
    warranty: "Гаранция",
    brand_label: "Марка",
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
