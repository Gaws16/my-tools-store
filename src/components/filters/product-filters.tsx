"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PriceRangeFilter from "./price-range-filter";

type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  powerSource?: "battery" | "corded" | "manual" | "pneumatic";
  inStockOnly: boolean;
  sort: "created_at" | "price_asc" | "price_desc" | "name_asc" | "featured";
};

type ProductFiltersProps = {
  value: FilterState;
  onChange: (filters: FilterState) => void;
  brands?: Array<{ slug: string; name: string }>;
};

export default function ProductFilters({
  value,
  onChange,
  brands = [],
}: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterState, val: any) => {
    onChange({ ...value, [key]: val });
  };

  const clearFilters = () => {
    onChange({
      minPrice: undefined,
      maxPrice: undefined,
      brands: [],
      powerSource: undefined,
      inStockOnly: false,
      sort: "created_at",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Sort by</Label>
          <Select
            value={value.sort}
            onValueChange={(val) => updateFilter("sort", val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="featured">Featured first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Price range</Label>
          <PriceRangeFilter
            value={{ min: value.minPrice, max: value.maxPrice }}
            onChange={(range) => {
              updateFilter("minPrice", range.min);
              updateFilter("maxPrice", range.max);
            }}
          />
        </div>

        {brands.length > 0 && (
          <div>
            <Label className="text-sm font-medium">Brands</Label>
            <div className="mt-2 space-y-2">
              {brands.map((brand) => (
                <div key={brand.slug} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.slug}
                    checked={value.brands.includes(brand.slug)}
                    onCheckedChange={(checked) => {
                      const newBrands = checked
                        ? [...value.brands, brand.slug]
                        : value.brands.filter((b) => b !== brand.slug);
                      updateFilter("brands", newBrands);
                    }}
                  />
                  <Label
                    htmlFor={brand.slug}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label className="text-sm font-medium">Power source</Label>
          <Select
            value={value.powerSource || "all"}
            onValueChange={(val) =>
              updateFilter("powerSource", val === "all" ? undefined : val)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="battery">Battery</SelectItem>
              <SelectItem value="corded">Corded</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="pneumatic">Pneumatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={value.inStockOnly}
            onCheckedChange={(checked) => updateFilter("inStockOnly", checked)}
          />
          <Label
            htmlFor="in-stock"
            className="text-sm font-normal cursor-pointer"
          >
            In stock only
          </Label>
        </div>
      </div>
    </div>
  );
}
