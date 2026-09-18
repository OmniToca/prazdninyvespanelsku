import { getContent, t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export default async function StripeResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ result?: string }>;
}) {
  const { locale } = await params;
  const { result } = await searchParams;
  const content = await getContent(locale as Locale);
  const ok = result !== "cancel";
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl text-sea">
        {ok ? t(content, "booking.success") : t(content, "booking.title")}
      </h1>
      {!ok && <p className="mt-4 text-muted">{t(content, "booking.error")}</p>}
    </div>
  );
}
