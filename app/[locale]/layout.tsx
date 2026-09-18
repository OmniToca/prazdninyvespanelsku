import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);

  return (
    <NextIntlClientProvider locale={locale} messages={{}}>
      <Header locale={locale as Locale} content={content} />
      <main>{children}</main>
      <Footer locale={locale as Locale} content={content} />
    </NextIntlClientProvider>
  );
}
