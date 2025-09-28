"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function PriceRangeFilter({
  value,
  onChange,
}: {
  value?: { min?: number; max?: number };
  onChange: (v: { min?: number; max?: number }) => void;
}) {
  const [min, setMin] = useState<string>(value?.min?.toString() ?? "");
  const [max, setMax] = useState<string>(value?.max?.toString() ?? "");

  useEffect(() => {
    onChange({
      min: min ? Number(min) : undefined,
      max: max ? Number(max) : undefined,
    });
  }, [min, max]);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="w-24"
      />
      <span className="text-muted-foreground">—</span>
      <Input
        placeholder="Max"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="w-24"
      />
    </div>
  );
}
