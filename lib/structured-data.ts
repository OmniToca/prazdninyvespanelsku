import { photos } from "@/content/media";
import { social } from "@/content/social";
import type { Locale } from "@/i18n/routing";
import { t } from "./copy";
import { absoluteUrl, siteUrl } from "./seo";

const images = [
  photos.hero,
  photos.living,
  photos.kitchen,
  photos.terraceSofa,
  photos.bedroomTropical,
].map((src) => `${siteUrl()}${src}`);

export function vacationRentalJsonLd(locale: Locale, content: Record<string, string>) {
  const url = absoluteUrl(locale, "/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VacationRental",
        "@id": `${url}#rental`,
        name: t(content, "meta.siteName"),
        alternateName: "Residence Santa Pola",
        url,
        image: images,
        description: t(content, "home.heroLead"),
        identifier: social.licence,
        email: social.email,
        priceRange: "€70-€185",
        checkinTime: "16:00",
        checkoutTime: "11:00",
        address: {
          "@type": "PostalAddress",
          streetAddress: "C. Venezuela 11",
          addressLocality: "Santa Pola",
          postalCode: "03130",
          addressRegion: "Alicante",
          addressCountry: "ES",
        },
        containsPlace: {
          "@type": "Accommodation",
          additionalType: "https://schema.org/Apartment",
          numberOfBedrooms: 3,
          numberOfBathroomsTotal: 2,
          occupancy: { "@type": "QuantitativeValue", maxValue: 8 },
          floorSize: { "@type": "QuantitativeValue", value: 110, unitCode: "MTK" },
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "AirConditioning", value: true },
          { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Washer", value: true },
          { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
          { "@type": "LocationFeatureSpecification", name: "Beach", value: true },
        ],
        sameAs: [social.facebook, social.instagram, social.youtube],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl()}/#website`,
        url: siteUrl(),
        name: t(content, "meta.siteName"),
        inLanguage: locale,
        publisher: { "@id": `${url}#rental` },
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
