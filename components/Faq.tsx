"use client";

import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-sea/10">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            className="flex w-full items-start justify-between gap-4 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-sea">{item.q}</span>
            <span className="text-muted">{open === i ? "–" : "+"}</span>
          </button>
          {open === i && <p className="pb-4 text-muted">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
