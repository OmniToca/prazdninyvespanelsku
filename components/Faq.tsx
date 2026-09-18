export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-sea/10">
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-medium text-sea [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-muted group-open:hidden">+</span>
            <span className="hidden text-muted group-open:inline">–</span>
          </summary>
          <p className="pb-4 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
