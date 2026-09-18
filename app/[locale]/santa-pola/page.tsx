import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { photos } from "@/content/media";
import { CtaBand } from "@/components/CtaBand";
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
    path: "/santa-pola",
    title: t(content, "santaPola.metaTitle"),
    description: t(content, "santaPola.lead"),
    image: photos.port,
  });
}

export default async function SantaPolaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  const blocks = [
    { img: photos.santaPolaSign, title: "santaPola.cityTitle", text: "santaPola.cityText" },
    { img: photos.port, title: "santaPola.beachesTitle", text: "santaPola.beachesText" },
    { img: photos.market, title: "santaPola.foodTitle", text: "santaPola.foodText" },
    { img: photos.lighthouse, title: "santaPola.tripsTitle", text: "santaPola.tripsText" },
    { img: photos.tabarca, title: "santaPola.tabarcaTitle", text: "santaPola.tabarcaText" },
  ];

  return (
    <>
      <section className="relative h-[56vh] min-h-[360px]">
        <Image src={photos.port} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-sea/50 via-sea/15 to-black/25" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-sm tracking-[0.25em] text-sand/80 uppercase">Costa Blanca</p>
          <h1 className="mt-3 font-serif text-4xl text-sand md:text-6xl">{t(content, "santaPola.title")}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-lg leading-relaxed text-muted">{t(content, "santaPola.lead")}</p>
      </section>

      <div className="space-y-16 pb-16 md:space-y-20 md:pb-20">
        {blocks.map((block, i) => (
          <article
            key={block.title}
            className={`mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 ${
              i % 2 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src={block.img} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-sea">{t(content, block.title)}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t(content, block.text)}</p>
            </div>
          </article>
        ))}
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
