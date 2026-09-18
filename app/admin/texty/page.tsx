import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { fields, pages } from "@/content/fields";
import { getContent } from "@/lib/content";
import { locales, type Locale } from "@/i18n/routing";
import { actionSaveTexts } from "../actions";

export default async function AdminTextsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; locale?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sp = await searchParams;
  const page = pages.some((p) => p.id === sp.page) ? sp.page! : "home";
  const locale = (locales as readonly string[]).includes(sp.locale || "")
    ? (sp.locale as Locale)
    : "cs";
  const content = await getContent(locale);
  const visible = fields.filter((f) => f.page === page);

  return (
    <div>
      <h1 className="font-serif text-3xl text-sea">Texty webu</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Měníte jen obsah polí. Rozvržení stránek zůstává. Prázdné pole v jiném jazyce spadne na češtinu.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {pages.map((p) => (
          <a
            key={p.id}
            href={`/admin/texty?page=${p.id}&locale=${locale}`}
            className={`rounded-full px-3 py-1 text-sm ${page === p.id ? "bg-sea text-sand" : "bg-white"}`}
          >
            {p.label}
          </a>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {locales.map((code) => (
          <a
            key={code}
            href={`/admin/texty?page=${page}&locale=${code}`}
            className={`rounded px-2 py-1 text-xs tracking-widest ${
              locale === code ? "bg-sea text-sand" : "bg-sand-deep"
            }`}
          >
            {code.toUpperCase()}
          </a>
        ))}
      </div>
      <form action={actionSaveTexts} className="mt-8 space-y-5">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="page" value={page} />
        {visible.map((field) => (
          <label key={field.key} className="block text-sm">
            <span className="text-muted">
              {field.label}
              {field.shared ? " · společné pro všechny jazyky" : ""}
            </span>
            {field.type === "textarea" ? (
              <textarea
                name={field.key}
                defaultValue={content[field.key] ?? ""}
                rows={field.key === "legal.body" ? 16 : 5}
                className="mt-1 w-full rounded-xl border border-sea/15 bg-white px-3 py-2"
              />
            ) : (
              <input
                name={field.key}
                type={field.type === "number" ? "number" : "text"}
                defaultValue={content[field.key] ?? ""}
                className="mt-1 w-full rounded-xl border border-sea/15 bg-white px-3 py-2"
              />
            )}
          </label>
        ))}
        <button className="rounded-full bg-sea px-6 py-3 text-sand">Uložit</button>
      </form>
    </div>
  );
}
