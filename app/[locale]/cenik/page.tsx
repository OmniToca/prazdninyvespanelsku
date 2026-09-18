import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { getContent, t } from "@/lib/content";
import { formatEur, getPricing } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContent(locale as Locale);
  return { title: t(content, "pricing.metaTitle"), description: t(content, "pricing.lead") };
}

const seasons = [
  { name: "winter", months: [11, 12, 1, 2] },
  { name: "spring", months: [3, 4, 5] },
  { name: "summer", months: [6, 7, 8] },
  { name: "autumn", months: [9, 10] },
] as const;

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  const pricing = await getPricing();
  const included = t(content, "pricing.included").split("\n").filter(Boolean);

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-serif text-5xl text-sea">{t(content, "pricing.title")}</h1>
        <p className="mt-6 text-lg text-muted">{t(content, "pricing.lead")}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        {seasons.map((season) => (
          <div key={season.name} className="rounded-3xl bg-white/70 p-6">
            <h2 className="font-serif text-2xl text-sea">
              {t(content, `pricing.season.${season.name}`)}
            </h2>
            <ul className="mt-4 space-y-3">
              {season.months.map((m) => (
                <li key={m} className="flex items-baseline justify-between gap-4">
                  <span>
                    {t(content, `pricing.month.${m}`)}
                    <span className="ml-2 text-xs text-muted">
                      {t(content, "pricing.minNights", { n: pricing.min[m] })}
                    </span>
                  </span>
                  <span className="font-medium">
                    {formatEur(pricing.rate[m] * 100, locale)} {t(content, "pricing.perNight")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-sea">{t(content, "pricing.includedTitle")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl text-sea">{t(content, "pricing.extrasTitle")}</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li className="flex justify-between gap-4">
              <span>{t(content, "pricing.cleaningLabel")}</span>
              <span>{formatEur(pricing.cleaning * 100, locale)}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>{t(content, "pricing.transferLabel")}</span>
              <span>{formatEur(pricing.transfer * 100, locale)}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>{t(content, "pricing.longStayLabel")}</span>
              <span>{pricing.longStayDiscount} %</span>
            </li>
          </ul>
          <h3 className="mt-10 font-serif text-2xl text-sea">{t(content, "pricing.termsTitle")}</h3>
          <p className="mt-3 whitespace-pre-line text-muted">{t(content, "pricing.terms")}</p>
          <p className="mt-6 text-sm text-muted">{t(content, "pricing.licence")}</p>
        </div>
      </section>

      <CtaBand
        title={t(content, "home.ctaBandTitle")}
        text={t(content, "home.ctaBandText")}
        href="/rezervace"
        label={t(content, "nav.bookCta")}
      />
    </>
  );
}
