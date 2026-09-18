import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { homeMosaic, photos } from "@/content/media";
import { CtaBand } from "@/components/CtaBand";
import { getContent, t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContent(locale as Locale);
  return {
    title: { absolute: t(content, "meta.siteName") },
    description: t(content, "home.heroLead"),
    openGraph: { images: [photos.hero] },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  const reviews = [1, 2, 3].map((n) => ({
    name: t(content, `home.review${n}Name`),
    text: t(content, `home.review${n}Text`),
  }));

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src={photos.hero}
          alt={t(content, "apartment.gallery.terrace")}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea/80 via-sea/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6">
          <p className="text-sm tracking-[0.25em] text-sand/80 uppercase">{t(content, "home.heroEyebrow")}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-sand md:text-6xl">
            {t(content, "home.heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-sand/90">{t(content, "home.heroLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/apartman" className="rounded-full bg-sand px-5 py-3 text-sm text-sea">
              {t(content, "home.ctaApartment")}
            </Link>
            <Link href="/rezervace" className="rounded-full border border-sand/60 px-5 py-3 text-sm text-sand">
              {t(content, "home.ctaBook")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="border-l border-sun pl-5">
            <p className="font-serif text-4xl text-sea">{t(content, `home.fact${n}Value`)}</p>
            <p className="mt-2 text-muted">{t(content, `home.fact${n}Label`)}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-sea">{t(content, "home.moodTitle")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t(content, "home.moodText")}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {homeMosaic.map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill className="object-cover" sizes="40vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative min-h-[420px] overflow-hidden">
        <Image src={photos.tabarca} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-sea/55" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="max-w-lg font-serif text-4xl text-sand">{t(content, "home.placeTitle")}</h2>
          <p className="mt-4 max-w-lg text-sand/90">{t(content, "home.placeText")}</p>
          <Link href="/santa-pola" className="mt-6 inline-block text-sun underline decoration-sun/40">
            {t(content, "home.placeCta")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-4xl text-sea">{t(content, "home.reviewsTitle")}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="rounded-3xl bg-white/60 p-6">
              <p className="text-muted">{review.text}</p>
              <footer className="mt-4 font-serif text-xl text-sea">{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <CtaBand
        title={t(content, "home.ctaBandTitle")}
        text={t(content, "home.ctaBandText")}
        href="/rezervace"
        label={t(content, "home.ctaBook")}
      />
    </>
  );
}
