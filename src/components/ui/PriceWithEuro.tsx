import { formatCurrency } from "@/lib/utils";

const EUR_PER_BGN = 1.95583;
export default function PriceWithEuro({ price }: { price: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className=" font-semibold">
        {formatCurrency(price * EUR_PER_BGN, "bg-BG", "BGN")}
      </p>
      <p className="text-muted-foreground text-sm ">{price} €</p>
    </div>
  );
}
