"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProductSectionProps } from "./shared";

export function ProductHowItWorks({ product, name }: ProductSectionProps) {
  const t = useTranslations("ProductDetail");

  return (
    <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("howBadge")}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("howTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("howSubtitle", { name })}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {product.howItWorks.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span
                className={cn(
                  "font-display text-5xl font-extrabold opacity-20",
                  product.accent
                )}
              >
                {step.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                {t(`howItWorks.${step.titleKey}`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`howItWorks.${step.descKey}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
