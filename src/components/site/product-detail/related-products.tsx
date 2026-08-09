"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProductBySlug, type Product } from "@/data/products";

export function RelatedProducts({ slugs }: { slugs: string[] }) {
  const t = useTranslations("ProductDetail");
  const tProducts = useTranslations("Products.items");
  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("relatedBadge")}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("relatedTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("relatedSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, idx) => {
            const RIcon = p.icon;
            const slugShort = p.i18nKey.split(".").pop()!;
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-primary/30"
                >
                  <div
                    className={cn(
                      "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                      p.gradient
                    )}
                  >
                    <RIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {tProducts(`${slugShort}.name`)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {tProducts(`${slugShort}.tagline`)}
                  </p>
                  <p className="mt-2 flex-grow text-xs leading-relaxed text-muted-foreground">
                    {tProducts(`${slugShort}.description`)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {t("viewDetail")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
