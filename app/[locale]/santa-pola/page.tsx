import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { photos } from "@/content/media";
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
  return { title: t(content, "santaPola.metaTitle"), description: t(content, "santaPola.lead") };
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
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm tracking-[0.25em] text-azure uppercase">Costa Blanca</p>
        <h1 className="mt-3 font-serif text-5xl text-sea">{t(content, "santaPola.title")}</h1>
        <p className="mt-6 text-lg text-muted">{t(content, "santaPola.lead")}</p>
      </section>
      <div className="space-y-16 pb-8">
        {blocks.map((block, i) => (
          <article
            key={block.title}
            className={`mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 ${
              i % 2 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
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
