"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { ProductSectionProps } from "./shared";

type ProductDescriptionProps = ProductSectionProps & {
  longDescription: string;
  features: string[];
};

export function ProductDescription({
  name,
  longDescription,
  features,
}: ProductDescriptionProps) {
  const t = useTranslations("ProductDetail");

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("intro")}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("whyTitle", { name })}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {longDescription}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium text-foreground"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </span>
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
