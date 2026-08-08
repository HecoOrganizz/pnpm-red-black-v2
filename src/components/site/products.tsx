"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Sparkles, Zap, Lock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";

export function Products() {
  const t = useTranslations("Products");

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2
            id="products-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <p className="text-sm text-muted-foreground">{t("cta")}</p>
          <Button
            asChild
            variant="outline"
            className="shine border-primary/30 text-primary hover:bg-primary/5"
          >
            <Link href="/#download" aria-label={t("ctaButton")}>
              <Zap className="mr-1.5 h-4 w-4" />
              {t("ctaButton")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const t = useTranslations("Products");
  const Icon = product.icon;
  // i18nKey is "Products.items.<slug>"
  const slug = product.i18nKey.split(".").pop()!;

  // Get features array via t.raw
  const features = t.raw(`items.${slug}.features`) as string[];
  const name = t(`items.${slug}.name`);
  const tagline = t(`items.${slug}.tagline`);
  const description = t(`items.${slug}.description`);
  const badge = t.has(`items.${slug}.badge`)
    ? t(`items.${slug}.badge`)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="group relative h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`${t("card.viewDetail")} ${name}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-primary/30"
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20",
            product.gradient
          )}
          aria-hidden="true"
        />

        <div className="mb-5 flex items-start justify-between">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md",
              product.gradient
            )}
          >
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>
          {badge && (
            <Badge
              variant="secondary"
              className="rounded-full border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary"
            >
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-foreground">{name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{tagline}</p>
        <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <ul className="mt-4 space-y-2">
          {features.map((f: string) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-foreground/80"
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={product.accent}
                  />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-3 w-3" aria-hidden="true" />
            <span>{product.size}</span>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            {t("card.viewDetail")}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </div>

      </Link>
    </motion.article>
  );
}
