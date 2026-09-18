import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { placeCategories, placesIn, placePath, type PlaceCategory } from "@/content/places";
import type { Locale } from "@/i18n/routing";
import { t } from "@/lib/copy";

export function PlaceGuide({
  locale,
  content,
}: {
  locale: Locale;
  content: Record<string, string>;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <h2 className="font-serif text-3xl text-sea md:text-4xl">{t(content, "santaPola.guideTitle")}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t(content, "santaPola.guideLead")}</p>
      <div className="mt-12 space-y-12">
        {placeCategories.map((category) => (
          <PlaceGroup key={category} category={category} locale={locale} content={content} />
        ))}
      </div>
    </section>
  );
}

function PlaceGroup({
  category,
  locale,
  content,
}: {
  category: PlaceCategory;
  locale: Locale;
  content: Record<string, string>;
}) {
  const items = placesIn(category);
  return (
    <div>
      <h3 className="text-sm tracking-[0.25em] text-azure uppercase">{t(content, `santaPola.cat.${category}`)}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((place) => (
          <li key={place.slug}>
            <Link
              href={placePath(place.slug)}
              className="group flex h-full gap-4 rounded-2xl p-1 transition hover:bg-sand-deep/60"
            >
              <span className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={place.image} alt="" fill className="object-cover" sizes="80px" />
              </span>
              <span className="min-w-0 py-1">
                <span className="block font-serif text-xl text-sea group-hover:text-sea-soft">{place.name}</span>
                <span className="mt-1 block text-sm leading-snug text-muted">{place.line[locale]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
