/**
 * Dynamic SITE_URL configuration for SEO canonicals, hreflang alternates, OpenGraph, and structured data.
 * Prioritizes:
 * 1. process.env.NEXT_PUBLIC_SITE_URL
 * 2. process.env.VERCEL_PROJECT_PRODUCTION_URL (Vercel production domain)
 * 3. process.env.VERCEL_URL (Vercel preview deployment URL)
 * 4. Fallback: "https://zidimi-software.vercel.app"
 */
function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://zidimi-software.vercel.app";

  return envUrl.replace(/\/$/, "");
}

export const SITE_URL = getSiteUrl();
