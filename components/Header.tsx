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

const overlayRoutes = new Set(["/", "/apartman", "/santa-pola"]);

export function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: Record<string, string>;
}) {
  const pathname = usePathname();
  const overlay = overlayRoutes.has(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = !overlay || scrolled || open;

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid
            ? "border-b border-sea/10 bg-sand/95 text-sea backdrop-blur-md"
            : "border-b border-transparent bg-black/15 text-sand backdrop-blur-[2px]"
        }`}
      >
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
            <span
              className={`font-serif text-lg leading-none sm:text-xl ${
                solid ? "text-sea" : "text-sand [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
              }`}
            >
              {t(content, "meta.siteName")}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide ${
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? solid
                      ? "text-sea"
                      : "text-sand [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
                    : solid
                      ? "text-muted hover:text-sea"
                      : "text-sand/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] hover:text-sand"
                }`}
              >
                {t(content, item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={`hidden items-center gap-1 text-xs tracking-widest sm:flex ${
                solid ? "text-muted" : "text-sand/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
              }`}
            >
              {(Object.keys(localeNames) as Locale[]).map((code) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code}
                  className={`rounded-md px-1.5 py-0.5 ${
                    locale === code
                      ? solid
                        ? "bg-sea text-sand"
                        : "bg-sand text-sea"
                      : solid
                        ? "hover:text-sea"
                        : "hover:text-sand"
                  }`}
                >
                  {localeNames[code]}
                </Link>
              ))}
            </div>
            <Link
              href="/rezervace"
              className={`hidden rounded-md px-4 py-2 text-sm sm:inline-flex ${
                solid ? "bg-sea text-sand" : "bg-sand text-sea"
              }`}
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
          <div className="border-t border-sea/10 bg-sand px-4 py-4 text-sea lg:hidden">
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
                  className={`rounded-md px-2 py-1 ${locale === code ? "bg-sea text-sand" : "bg-sand-deep"}`}
                >
                  {localeNames[code]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      {!overlay && <div className="h-[4.25rem]" aria-hidden />}
    </>
  );
}
