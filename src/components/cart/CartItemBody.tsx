import Link from "next/link";
import Image from "next/image";
import Price from "../product/price";
import { Card, CardContent } from "../ui/card";
import CartItemButtons from "./CartItemButtons";
import { CartItem } from "@/lib/cart/CartProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function CartItemBody({ item }: { item: CartItem }) {
  const { t } = useLocale();
  return (
    <Card key={item.id}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="font-medium hover:underline line-clamp-2"
            >
              {item.name}
            </Link>
            <div className="text-sm text-muted-foreground mt-1">
              <Price amount={item.price} />
            </div>
          </div>

          <CartItemButtons item={item} />
        </div>
      </CardContent>
    </Card>
  );
}
