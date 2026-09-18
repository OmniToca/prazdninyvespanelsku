import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { photos } from "@/content/media";
import { social } from "@/content/social";
import { ContactForm } from "@/components/ContactForm";
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
    path: "/kontakt",
    title: t(content, "contact.metaTitle"),
    description: t(content, "contact.lead"),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <figure className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full bg-sun/20 blur-2xl"
          />
          <div className="rotate-[-1.75deg] rounded-sm bg-white p-3 pb-9 shadow-[0_18px_50px_rgba(18,36,44,0.14)]">
            <Image
              src={photos.owner}
              alt={t(content, "host.name")}
              width={1864}
              height={2486}
              className="aspect-[3/4] w-full object-cover object-top"
              priority
            />
            <figcaption className="mt-4 px-1 font-serif text-xl text-sea">
              {t(content, "host.name")}
            </figcaption>
          </div>
        </figure>

        <div>
          <p className="text-sm tracking-[0.25em] text-azure uppercase">{t(content, "contact.title")}</p>
          <h1 className="mt-3 font-serif text-5xl text-sea">{t(content, "host.name")}</h1>
          <p className="mt-4 text-lg text-muted">{t(content, "host.note")}</p>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">{t(content, "contact.lead")}</p>
        </div>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="rounded-sm bg-white p-6 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl text-sea">{t(content, "contact.formTitle")}</h2>
          <ContactForm content={content} />
        </div>
        <div>
          <iframe
            title="map"
            src={social.mapsEmbed}
            className="h-80 w-full rounded-sm border-0"
            loading="lazy"
          />
          <h2 className="mt-8 font-serif text-2xl text-sea">{t(content, "contact.addressTitle")}</h2>
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
      </section>
    </div>
  );
}
