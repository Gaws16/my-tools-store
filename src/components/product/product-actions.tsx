"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/CartProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    sale_price?: number;
    imageUrl?: string;
    slug: string;
    stock_quantity: number;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock_quantity <= 0) return;

    setIsAdding(true);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.sale_price ?? product.price,
        imageUrl: product.imageUrl,
        slug: product.slug,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <div className="flex items-center gap-2">
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        className="flex-1"
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {t("adding")}
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t("add_to_cart")}
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={handleWishlist}
        className={isWishlisted ? "text-red-500 border-red-500" : ""}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
}
