import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent, t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContent(locale as Locale);
  return { title: t(content, "legal.metaTitle") };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-sea">{t(content, "legal.title")}</h1>
      <p className="mt-8 whitespace-pre-line leading-relaxed text-muted">{t(content, "legal.body")}</p>
    </article>
  );
}
