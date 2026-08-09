"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import { ProductHero } from "./product-detail/product-hero";
import { ProductDescription } from "./product-detail/product-description";
import { ProductHowItWorks } from "./product-detail/product-how-it-works";
import { ProductFeatures } from "./product-detail/product-features";
import { ProductRequirements } from "./product-detail/product-requirements";
import { ProductFaq } from "./product-detail/product-faq";
import { ProductDownloadCta } from "./product-detail/product-download-cta";

export { RelatedProducts } from "./product-detail/related-products";

export function ProductDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("ProductDetail");
  const tProducts = useTranslations("Products.items");
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">{t("notFound")}</h1>
        <Button asChild className="mt-6">
          <Link href="/">{t("back")}</Link>
        </Button>
      </div>
    );
  }

  const slugShort = product.i18nKey.split(".").pop()!;
  const name = tProducts(`${slugShort}.name`);
  const tagline = tProducts(`${slugShort}.tagline`);
  const description = tProducts(`${slugShort}.description`);
  const longDescription = t(`longDesc.${slugShort}`);
  const features = tProducts.raw(`${slugShort}.features`) as string[];
  const badge = tProducts.has(`${slugShort}.badge`)
    ? tProducts(`${slugShort}.badge`)
    : null;

  const shared = { product, slugShort, name };

  return (
    <>
      <ProductHero {...shared} tagline={tagline} description={description} badge={badge} />
      <ProductDescription {...shared} longDescription={longDescription} features={features} />
      <ProductHowItWorks {...shared} />
      <ProductFeatures {...shared} />
      <ProductRequirements {...shared} />
      <ProductFaq {...shared} />
      <ProductDownloadCta {...shared} />

      <div className="bg-background py-10">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToList")}
          </Link>
        </div>
      </div>
    </>
  );
}
