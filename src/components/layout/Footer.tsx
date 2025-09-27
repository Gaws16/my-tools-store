"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-xl font-semibold tracking-tight">
            {t("brand")}
          </div>
          <p className="text-sm text-muted-foreground">{t("hero_subtitle")}</p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">{t("footer_shop")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/category/power-tools"
                className="hover:text-foreground"
              >
                {t("nav_power")}
              </Link>
            </li>
            <li>
              <Link
                href="/category/hand-tools"
                className="hover:text-foreground"
              >
                {t("nav_hand")}
              </Link>
            </li>
            <li>
              <Link
                href="/category/accessories"
                className="hover:text-foreground"
              >
                {t("nav_accessories")}
              </Link>
            </li>
            <li>
              <Link href="/category/safety" className="hover:text-foreground">
                {t("nav_safety")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">{t("footer_company")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground">
                {t("footer_about")}
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-foreground">
                {t("footer_careers")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                {t("footer_blog")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                {t("footer_contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">{t("footer_support")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/help" className="hover:text-foreground">
                {t("footer_help")}
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-foreground">
                {t("footer_shipping")}
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-foreground">
                {t("footer_warranty")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                {t("footer_privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex items-center justify-between">
          <p>
            © {new Date().getFullYear()} {t("brand")}. All rights reserved.
          </p>
          <p>{t("footer_built")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
