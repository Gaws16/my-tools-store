import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
