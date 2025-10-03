import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">
        Payment canceled
      </h1>
      <p className="text-muted-foreground">
        You can try again or continue shopping.
      </p>
      <div className="flex items-center justify-center gap-2">
        <Button asChild>
          <Link href="/cart">Back to cart</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
