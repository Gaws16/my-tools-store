"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { addToCart } from "@/lib/supabase/queries/cart";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  badge?: string;
};

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLocale();
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              No image
            </div>
          )}
          {product.badge && (
            <div className="absolute left-2 top-2 rounded-md bg-background/80 backdrop-blur px-2 py-1 text-xs border">
              {product.badge}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 font-medium hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-1 text-sm text-muted-foreground">
          {t("in_stock")}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold">${product.price.toFixed(2)}</div>
        <Button
          size="sm"
          onClick={async () => {
            try {
              await addToCart(product.id, 1);
              // TODO: success toast
            } catch (e) {
              // TODO: error toast or redirect to sign-in
            }
          }}
        >
          {t("add_to_cart")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
