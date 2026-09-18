import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { social } from "@/content/social";
import { t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export function Footer({
  content,
}: {
  locale: Locale;
  content: Record<string, string>;
}) {
  return (
    <footer className="mt-24 border-t border-sea/10 bg-sea text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo/logo.png" alt="" width={101} height={112} className="h-12 w-auto" />
            <p className="font-serif text-2xl">{t(content, "meta.siteName")}</p>
          </div>
          <p className="mt-3 max-w-xs text-sand/80">{t(content, "footer.tagline")}</p>
        </div>
        <div className="text-sm text-sand/85">
          <p>{t(content, "contact.addressTitle")}</p>
          <p className="mt-2">{social.address}</p>
          <a className="mt-2 inline-block underline decoration-sun/60" href={`mailto:${social.email}`}>
            {social.email}
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={social.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={social.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={social.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <Link href="/vop" className="mt-2 text-sand/70">
            {t(content, "footer.legal")}
          </Link>
        </div>
      </div>
      <div className="border-t border-sand/10 py-4 text-center text-xs text-sand/60">
        © {new Date().getFullYear()} {t(content, "footer.rights")} · {social.licence}
      </div>
    </footer>
  );
}
