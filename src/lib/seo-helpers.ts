import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./site-config";

/**
 * OpenGraph locale codes for each supported locale.
 * Used by both the root layout and product detail page metadata.
 */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  vi: "vi_VN",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  ru: "ru_RU",
  zh: "zh_CN",
  lo: "lo_LA",
  ja: "ja_JP",
  ko: "ko_KR",
};

/**
 * Build hreflang alternate URLs for every supported locale + x-default.
 * Used by generateMetadata (layout, product pages) and sitemap.ts.
 */
export function localizedAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${SITE_URL}/${locale}${path}`,
      ])
    ),
    "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
  };
}

/**
 * Safely serialize a value to a JSON-LD `<script>` string,
 * escaping `<` to prevent XSS via embedded `</script>`.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
