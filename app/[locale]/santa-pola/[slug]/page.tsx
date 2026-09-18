import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { QrCode } from "@/components/QrCode";
import { getPlace, places, placePath } from "@/content/places";
import { getContent, t } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = getPlace(slug);
  if (!place) return {};
  const content = await getContent(locale as Locale);
  return pageMeta({
    locale: locale as Locale,
    path: placePath(place.slug),
    title: `${place.name} · ${t(content, "santaPola.title")}`,
    description: place.line[locale as Locale],
    image: place.image,
  });
}

export default async function PlacePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = getPlace(slug);
  if (!place) notFound();
  const content = await getContent(locale as Locale);
  const loc = locale as Locale;

  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Link href="/santa-pola" className="text-sm text-azure">
          {t(content, "santaPola.back")}
        </Link>
        <p className="mt-8 text-sm tracking-[0.25em] text-azure uppercase">
          {t(content, `santaPola.cat.${place.category}`)}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-sea md:text-6xl">{place.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{place.line[loc]}</p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src={place.image} alt="" fill className="object-cover" sizes="60vw" priority />
            </div>
            <p className="mt-8 max-w-prose leading-relaxed text-muted">{place.note[loc]}</p>
          </div>

          <aside className="flex flex-col gap-5 rounded-2xl bg-sand-deep/70 p-6 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
            <QrCode value={place.mapsUrl} />
            <div>
              <p className="text-sm leading-relaxed text-muted">{t(content, "santaPola.qrHint")}</p>
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-md bg-sea px-4 py-2 text-sm text-sand"
              >
                {t(content, "santaPola.mapsCta")}
              </a>
            </div>
          </aside>
        </div>
      </article>

      <CtaBand
        title={t(content, "home.ctaBandTitle")}
        text={t(content, "home.ctaBandText")}
        href="/rezervace"
        label={t(content, "nav.bookCta")}
      />
    </>
  );
}
