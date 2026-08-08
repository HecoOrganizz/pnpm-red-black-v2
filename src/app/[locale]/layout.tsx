import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hecoorganizz.github.io";

const OG_LOCALES: Record<Locale, string> = {
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

type Params = {
  params: Promise<{ locale: string }>;
};

function localizedAlternates(path = ""): Record<string, string> {
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

function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("defaultTitle");
  const description = t("defaultDescription");
  const canonicalUrl = `${SITE_URL}/${typedLocale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Heco",
    },
    description,
    applicationName: "Heco",
    authors: [{ name: "Heco Team", url: SITE_URL }],
    creator: "Heco Team",
    publisher: "Heco",
    category: "Technology",
    alternates: {
      canonical: canonicalUrl,
      languages: localizedAlternates(),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[typedLocale],
      alternateLocale: routing.locales
        .filter((item) => item !== typedLocale)
        .map((item) => OG_LOCALES[item]),
      url: canonicalUrl,
      siteName: "Heco",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Heco software utilities",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: `${SITE_URL}/manifest.webmanifest`,
    icons: {
      icon: [
        { url: `${SITE_URL}/favicon.ico`, sizes: "any" },
        { url: `${SITE_URL}/icon.svg`, type: "image/svg+xml" },
        { url: `${SITE_URL}/icon-192.png`, type: "image/png", sizes: "192x192" },
        { url: `${SITE_URL}/icon-512.png`, type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: `${SITE_URL}/apple-icon.png`, sizes: "180x180" }],
    },
    appleWebApp: {
      capable: true,
      title: "Heco",
      statusBarStyle: "default",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EA0232" },
    { media: "(prefers-color-scheme: dark)", color: "#803C38" },
  ],
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Heco",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Heco",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: [...routing.locales],
  };

  return (
    <html lang={typedLocale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
