import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  ProductDetailClient,
  RelatedProducts,
} from "@/components/site/product-detail-client";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);

  if (!product || !routing.locales.includes(locale as Locale)) {
    return {
      title: "Not found",
      description: "Product not found.",
      robots: { index: false, follow: false },
    };
  }

  const typedLocale = locale as Locale;
  const slugShort = product.i18nKey.split(".").pop()!;
  const t = await getTranslations({ locale: typedLocale, namespace: "Metadata.products" });
  const title = t(`${slugShort}.title`);
  const description = t(`${slugShort}.description`);
  const path = `/products/${product.slug}`;
  const url = `${SITE_URL}/${typedLocale}${path}`;

  const ogLocales: Record<Locale, string> = {
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

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((item) => [
            item,
            `${SITE_URL}/${item}${path}`,
          ])
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[typedLocale],
      alternateLocale: routing.locales
        .filter((item) => item !== typedLocale)
        .map((item) => ogLocales[item]),
      url,
      siteName: "Heco",
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedSlugs = getRelatedProducts(slug, 3).map((p) => p.slug);

  // Keep structured data page-specific and factual. Ratings are intentionally
  // omitted until they are backed by a real, countable review dataset.
  const typedLocale = locale as Locale;
  const slugShort = product.i18nKey.split(".").pop()!;
  const tMeta = await getTranslations({ locale: typedLocale, namespace: "Metadata.products" });
  const tProducts = await getTranslations({
    locale: typedLocale,
    namespace: "Products.items",
  });

  const productName = tProducts(`${slugShort}.name`);
  const productDesc = tMeta(`${slugShort}.description`);
  const productUrl = `${SITE_URL}/${typedLocale}/products/${product.slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${productUrl}#software-application`,
    url: productUrl,
    name: productName,
    description: productDesc,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows 11/10/8.1/8/7",
    softwareVersion: product.version,
    fileSize: product.size,
    inLanguage: typedLocale,
    image: `${SITE_URL}/og-image.png`,
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${typedLocale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: productName,
        item: productUrl,
      },
    ],
  };

  const safeJsonLd = (value: unknown) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />

      <Header />
      <main id="main" className="flex-grow">
        <ProductDetailClient slug={slug} />
        <RelatedProducts slugs={relatedSlugs} />
      </main>
      <Footer />
    </div>
  );
}
