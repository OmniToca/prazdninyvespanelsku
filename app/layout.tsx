import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Prázdniny ve Španělsku",
  description:
    "Apartmán u moře v Santa Pole na Costa Blance. Klid, výhled a 15 minut od letiště Alicante.",
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
    <html lang={locale} className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-sand text-ink">{children}</body>
    </html>
  );
}
