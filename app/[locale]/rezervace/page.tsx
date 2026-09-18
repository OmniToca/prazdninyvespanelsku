import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BookingWidget } from "@/components/BookingWidget";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getContent, t } from "@/lib/content";
import { occupiedDays } from "@/lib/occupancy";
import { pageMeta } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structured-data";
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
    path: "/rezervace",
    title: t(content, "booking.metaTitle"),
    description: t(content, "booking.lead"),
  });
}

export const dynamic = "force-dynamic";

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  const occupied = await occupiedDays();
  const faq = Array.from({ length: 18 }, (_, i) => ({
    q: t(content, `faq.q${i + 1}`),
    a: t(content, `faq.a${i + 1}`),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <JsonLd data={faqJsonLd(faq)} />
      <h1 className="font-serif text-5xl text-sea">{t(content, "booking.title")}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{t(content, "booking.lead")}</p>
      <div className="mt-12">
        <BookingWidget content={content} locale={locale as Locale} occupied={occupied} />
      </div>
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <h2 className="font-serif text-3xl text-sea">{t(content, "booking.faqTitle")}</h2>
        <div className="mt-6">
          <Faq items={faq} />
        </div>
      </section>
    </div>
  );
}
