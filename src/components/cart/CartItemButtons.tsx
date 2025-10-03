import { CartItem } from "@/lib/cart/CartProvider";
import QuantityModifyer from "./QuantityModifyer";
import RemoveItem from "./RemoveItem";

export default function CartItemButtons({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <QuantityModifyer item={item} />
      <RemoveItem item={item} />
    </div>
  );
}
