import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";
import { localizedAlternates } from "@/lib/seo-helpers";

const LAST_MEANINGFUL_UPDATE = new Date("2026-08-08T00:00:00+07:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: LAST_MEANINGFUL_UPDATE,
    alternates: {
      languages: localizedAlternates(),
    },
  }));

  const productPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    PRODUCTS.map((product) => {
      const path = `/products/${product.slug}`;

      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: LAST_MEANINGFUL_UPDATE,
        alternates: {
          languages: localizedAlternates(path),
        },
      };
    })
  );

  return [...homePages, ...productPages];
}
