import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem, useCart } from "@/lib/cart/CartProvider";

export default function RemoveItem({ item }: { item: CartItem }) {
  const { removeItem } = useCart();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => removeItem(item.id)}
      className="text-destructive hover:text-destructive mt-1"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
