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
  return { title: t(content, "welcome.metaTitle") };
}

const manuals = [
  { href: "/pdfs/Check-in-manual_CZ.pdf", label: "CZ" },
  { href: "/pdfs/Check-in-manual_ENG.pdf", label: "EN" },
  { href: "/pdfs/Check-in-manual_ESP.pdf", label: "ES" },
  { href: "/pdfs/Check-in-manual_PL.pdf", label: "PL" },
];

const guides = [
  { href: "/pdfs/PRUVODCE-SANTA-POLA-A-OKOLI_CZ.pdf", label: "CZ" },
  { href: "/pdfs/SANTA-POLA-SURROUNDINGS-GUIDE_ENG.pdf", label: "EN" },
  { href: "/pdfs/GUIA-DE-SANTA-POLA-Y-ALREDEDORES_ESP.pdf", label: "ES" },
  { href: "/pdfs/PRZEWODNIK-PO-SANTA-POLA-I-OKOLICY_PL-1.pdf", label: "PL" },
];

export default async function WelcomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-5xl text-sea">{t(content, "welcome.title")}</h1>
      <p className="mt-6 text-lg text-muted">{t(content, "welcome.lead")}</p>
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-sea">{t(content, "welcome.checkin")}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {manuals.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full bg-white px-4 py-2 text-sm text-sea">
              {item.label}
            </a>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-sea">{t(content, "welcome.guide")}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {guides.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full bg-white px-4 py-2 text-sm text-sea">
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
