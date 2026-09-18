import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { social } from "@/content/social";
import { ContactForm } from "@/components/ContactForm";
import { getContent, t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContent(locale as Locale);
  return { title: t(content, "contact.metaTitle"), description: t(content, "contact.lead") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-5xl text-sea">{t(content, "contact.title")}</h1>
        <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">{t(content, "contact.lead")}</p>
        <div className="mt-8">
          <h2 className="font-serif text-2xl text-sea">{t(content, "contact.addressTitle")}</h2>
          <p className="mt-2 text-muted">{social.address}</p>
          <a href={`mailto:${social.email}`} className="mt-2 inline-block text-azure">
            {social.email}
          </a>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={social.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>
        <iframe title="map" src={social.mapsEmbed} className="mt-8 h-64 w-full rounded-3xl border-0" />
      </div>
      <div className="rounded-3xl bg-white/70 p-6 sm:p-8">
        <h2 className="mb-6 font-serif text-2xl text-sea">{t(content, "contact.formTitle")}</h2>
        <ContactForm content={content} />
      </div>
    </div>
  );
}
