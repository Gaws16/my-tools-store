"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];
  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
        {main && (
          <Image
            src={main}
            alt="Product image"
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((src, i) => (
          <button
            key={src + i}
            className={`relative aspect-square overflow-hidden rounded border ${
              i === active ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={src}
              alt="Thumbnail"
              fill
              className="object-cover"
              sizes="150px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
