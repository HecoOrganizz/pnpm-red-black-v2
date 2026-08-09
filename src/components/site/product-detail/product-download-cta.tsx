"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductSectionProps } from "./shared";

export function ProductDownloadCta({ product, name }: ProductSectionProps) {
  const t = useTranslations("ProductDetail");

  return (
    <section
      id="download"
      className={cn(
        "relative scroll-mt-20 overflow-hidden bg-gradient-to-br py-16 text-white sm:py-20",
        product.gradient
      )}
    >
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("downloadTitle", { name })}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {t("downloadSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="shine h-12 bg-white px-7 text-base font-bold text-foreground shadow-lg hover:bg-white/95"
            >
              <a href="#" download aria-label={t("downloadWindows")}>
                <Download className="mr-2 h-5 w-5" />
                {t("downloadWindows")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/#products">
                {t("viewOther")}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/70">
            {product.size} · {t("licenseFree")} · Windows 11/10/8/7 ·{" "}
            {t("stats.version")} {product.version}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
