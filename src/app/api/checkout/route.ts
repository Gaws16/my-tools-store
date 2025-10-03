import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-08-27.basil",
});

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  imageUrl?: string;
  slug?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      items,
      successUrl = `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/checkout/success`,
      cancelUrl = `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/checkout/cancel`,
    } = body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = (
      items as CheckoutItem[]
    ).map((item) => {
      // If you have predefined Stripe price IDs, pass price: item.priceId instead
      return {
        quantity: Math.max(1, Number(item.quantity || 1)),
        price_data: {
          currency: "bgn",
          unit_amount: Math.round(Number(item.price) * 100),
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : undefined,
            metadata: {
              id: item.id || "",
              slug: item.slug || "",
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        source: "tools-store",
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    console.error("/api/checkout error", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
