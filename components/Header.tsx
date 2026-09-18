"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";
import { t } from "@/lib/copy";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/apartman", key: "nav.apartment" },
  { href: "/santa-pola", key: "nav.santaPola" },
  { href: "/cenik", key: "nav.pricing" },
  { href: "/rezervace", key: "nav.booking" },
  { href: "/kontakt", key: "nav.contact" },
] as const;

export function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: Record<string, string>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  return (
    <header className="sticky top-0 z-40 border-b border-sea/10 bg-sand/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo.png"
            alt=""
            width={101}
            height={112}
            className="h-11 w-auto"
            priority
          />
          <span className="font-serif text-lg leading-none text-sea sm:text-xl">
            {t(content, "meta.siteName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide ${
                pathname === item.href ? "text-sea" : "text-muted hover:text-sea"
              }`}
            >
              {t(content, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 text-xs tracking-widest text-muted sm:flex">
            {(Object.keys(localeNames) as Locale[]).map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded px-1.5 py-0.5 ${
                  locale === code ? "bg-sea text-sand" : "hover:text-sea"
                }`}
              >
                {localeNames[code]}
              </Link>
            ))}
          </div>
          <Link
            href="/rezervace"
            className="hidden rounded-full bg-sea px-4 py-2 text-sm text-sand sm:inline-flex"
          >
            {t(content, "nav.bookCta")}
          </Link>
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sea/10 bg-sand px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {t(content, item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-2 text-xs tracking-widest">
            {(Object.keys(localeNames) as Locale[]).map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded px-2 py-1 ${locale === code ? "bg-sea text-sand" : "bg-sand-deep"}`}
              >
                {localeNames[code]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
