"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({
  items,
}: {
  items: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-sm"
            onClick={() => setActive(i)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {active != null && (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6"
          onClick={() => setActive(null)}
        >
          <span className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={items[active].src}
              alt={items[active].alt}
              fill
              className="object-contain"
            />
          </span>
        </button>
      )}
    </>
  );
}
