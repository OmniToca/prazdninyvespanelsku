import { Link } from "@/i18n/navigation";

export function CtaBand({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <section className="bg-sea text-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 pb-12 sm:px-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-sand/80">{text}</p>
        </div>
        <Link
          href={href}
          className="rounded-md bg-sun px-6 py-3 text-sm font-medium text-ink"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
