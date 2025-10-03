"use client";

import { useCart } from "@/lib/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Price from "@/components/product/price";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useState } from "react";
import QuantityModifyer from "@/components/cart/QuantityModifyer";
import RemoveItem from "@/components/cart/RemoveItem";
import CartItemButtons from "@/components/cart/CartItemButtons";
import CartItemBody from "@/components/cart/CartItemBody";
export default function CartPage() {
  const {
    items,

    removeItem,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { t } = useLocale();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancel`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">
            {t("cart_empty_title")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t("cart_empty_description")}
          </p>
          <Button asChild>
            <Link href="/search">{t("continue_shopping")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("shopping_cart")}
        </h1>
        <p className="text-muted-foreground">
          {totalItems}{" "}
          {totalItems === 1 ? t("item_in_cart") : t("items_in_cart")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemBody key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t("order_summary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>
                  {t("subtotal")} ({totalItems}{" "}
                  {totalItems === 1 ? t("item_in_cart") : t("items_in_cart")})
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("calculated_at_checkout")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("tax")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("calculated_at_checkout")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>{t("total")}</span>
                <span>
                  <Price amount={totalPrice} />
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : t("proceed_to_checkout")}
              </Button>

              <Button variant="outline" className="w-full" onClick={clearCart}>
                {t("clear_cart")}
              </Button>

              <Button variant="ghost" className="w-full" asChild>
                <Link href="/search">{t("continue_shopping")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
