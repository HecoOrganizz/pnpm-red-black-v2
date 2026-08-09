"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Download, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProductSectionProps } from "./shared";
import { StatRow } from "./shared";

type ProductHeroProps = ProductSectionProps & {
  tagline: string;
  description: string;
  badge: string | null;
};

export function ProductHero({
  product,
  slugShort,
  name,
  tagline,
  description,
  badge,
}: ProductHeroProps) {
  const t = useTranslations("ProductDetail");
  const Icon = product.icon;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br py-16 text-white sm:py-20",
        product.gradient
      )}
    >
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm text-white/80"
        >
          <Link href="/" className="transition-colors hover:text-white">
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link
            href="/#products"
            className="transition-colors hover:text-white"
          >
            {t("breadcrumb.products")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-white">{name}</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Icon className="h-9 w-9 text-white" aria-hidden="true" />
              </div>
              {badge && (
                <Badge className="rounded-full bg-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                  {badge}
                </Badge>
              )}
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-3 text-xl font-medium text-white/95">{tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                asChild
                className="shine h-12 bg-white px-7 text-base font-bold text-foreground shadow-lg hover:bg-white/95"
              >
                <a href="#download" aria-label={t("downloadWindows")}>
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
                <a href="#features">{t("featuresBadge")}</a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/70">
              {t("stats.version")} {product.version} ·{" "}
              {t("stats.updated")} {product.lastUpdate} · {product.size} ·{" "}
              {t("licenseFree")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="glass shadow-soft-lg rounded-2xl border border-white/40 p-6 text-foreground"
          >
            <h2 className="font-display text-base font-bold">{t("overview")}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <StatRow label={t("stats.rating")} value={
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="h-4 w-4 fill-[#EA0232] text-[#EA0232]" />
                  {product.rating}
                </span>
              } />
              <StatRow label={t("stats.downloads")} value={<span className="font-semibold">{product.downloads}</span>} />
              <StatRow label={t("stats.size")} value={<span className="font-semibold">{product.size}</span>} />
              <StatRow label={t("stats.license")} value={<span className="font-semibold text-primary">{t("licenseFree")}</span>} />
              <StatRow label={t("stats.version")} value={<span className="font-semibold">{product.version}</span>} />
              <StatRow label={t("stats.updated")} value={<span className="font-semibold">{product.lastUpdate}</span>} />
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
