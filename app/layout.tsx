import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Prázdniny ve Španělsku",
    template: "%s",
  },
  description:
    "Apartmán u moře v Santa Pole na Costa Blance. Klid, výhled a 15 minut od letiště Alicante.",
  icons: { icon: "/logo/majak.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let locale = "cs";
  try {
    locale = await getLocale();
  } catch {
    locale = "cs";
  }

  return (
    <html
      lang={locale}
      className={`${figtree.variable} ${cormorant.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-sand text-ink">{children}</body>
    </html>
  );
}
