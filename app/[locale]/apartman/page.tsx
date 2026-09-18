import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { apartmentGallery, photos } from "@/content/media";
import { social } from "@/content/social";
import { Gallery } from "@/components/Gallery";
import { CtaBand } from "@/components/CtaBand";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getContent, t } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContent(locale as Locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/apartman",
    title: t(content, "apartment.metaTitle"),
    description: t(content, "apartment.lead"),
    image: photos.living,
  });
}

export default async function ApartmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  const amenities = [
    "apartment.amenityAc",
    "apartment.amenityTv",
    "apartment.amenityWifi",
    "apartment.amenityCoffee",
    "apartment.amenityTowels",
    "apartment.amenityTransfer",
    "apartment.amenityHost",
  ];

  return (
    <>
      <section className="relative h-[56vh] min-h-[360px]">
        <Image src={photos.living} alt={t(content, "apartment.gallery.living")} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-sea/45 via-sea/10 to-black/25" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-12 sm:px-6">
          <h1 className="font-serif text-4xl text-sand md:text-6xl">{t(content, "apartment.title")}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-lg leading-relaxed text-muted">{t(content, "apartment.lead")}</p>
        <p className="mt-5 leading-relaxed text-muted">{t(content, "apartment.p2")}</p>
        <p className="mt-5 leading-relaxed text-muted">{t(content, "apartment.p3")}</p>
        <p className="mt-5 leading-relaxed text-muted">{t(content, "apartment.p4")}</p>
        <p className="mt-5 text-sm text-coral">{t(content, "apartment.noLift")}</p>
      </article>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 sm:px-6 md:space-y-12 md:pb-20">
        <section className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl text-sea md:text-4xl">{t(content, "video.title")}</h2>
          <p className="mt-2 max-w-2xl text-muted">{t(content, "video.lead")}</p>
          <div className="mt-6">
            <VideoEmbed
              title={t(content, "video.title")}
              poster={photos.terraceSea}
              posterAlt={t(content, "apartment.gallery.terrace")}
            />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-sea">{t(content, "apartment.amenitiesTitle")}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {amenities.map((key) => (
              <span key={key} className="rounded-md bg-white px-4 py-2 text-sm text-sea">
                {t(content, key)}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-serif text-3xl text-sea">{t(content, "apartment.galleryTitle")}</h2>
          <Gallery
            items={apartmentGallery.map((item) => ({
              src: item.src,
              alt: t(content, item.altKey),
            }))}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-sea">{t(content, "apartment.addressTitle")}</h2>
            <p className="mt-4 text-muted">{social.address}</p>
            <a href={social.mapsUrl} className="mt-3 inline-block text-azure" target="_blank" rel="noreferrer">
              Google Maps
            </a>
          </div>
          <iframe
            title="map"
            src={social.mapsEmbed}
            className="h-80 w-full rounded-sm border-0"
            loading="lazy"
          />
        </section>
      </div>

      <CtaBand
        title={t(content, "home.ctaBandTitle")}
        text={t(content, "home.ctaBandText")}
        href="/rezervace"
        label={t(content, "nav.bookCta")}
      />
    </>
  );
}
