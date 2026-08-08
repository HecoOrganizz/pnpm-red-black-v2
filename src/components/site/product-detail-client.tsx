"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  Download,
  Check,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getProductBySlug, type Product } from "@/data/products";

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

  const Icon = product.icon;
  const slugShort = product.i18nKey.split(".").pop()!;
  const name = tProducts(`${slugShort}.name`);
  const tagline = tProducts(`${slugShort}.tagline`);
  const description = tProducts(`${slugShort}.description`);
  const longDescription = t(`longDesc.${slugShort}`);
  const features = tProducts.raw(`${slugShort}.features`) as string[];
  const badge = tProducts.has(`${slugShort}.badge`)
    ? tProducts(`${slugShort}.badge`)
    : null;

  return (
    <>
      {/* Hero */}
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

      {/* Long description */}
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

      {/* How it works */}
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

      {/* Detailed features */}
      <section id="features" className="scroll-mt-20 bg-background py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {t("featuresBadge")}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("featuresTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("featuresSubtitle", { name })}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.detailedFeatures.map((feature, idx) => {
              const FIcon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-primary/30"
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110",
                      product.accent
                    )}
                  >
                    <FIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {t(`detailedFeatures.${feature.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`detailedFeatures.${feature.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System requirements */}
      <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                {t("reqBadge")}
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                {t("reqTitle")}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t("reqSubtitle", { name })}
              </p>
            </div>

            <dl className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <ReqRow label={t("req.os")} value={t(`reqs.${slugShort}.os`)} />
              <ReqRow label={t("req.cpu")} value={t(`reqs.${slugShort}.cpu`)} />
              <ReqRow label={t("req.ram")} value={t(`reqs.${slugShort}.ram`)} />
              <ReqRow label={t("req.disk")} value={t(`reqs.${slugShort}.disk`)} />
              <ReqRow label={t("req.internet")} value={t(`reqs.${slugShort}.internet`)} last />
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-background py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {t("faqBadge")}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("faqTitle", { name })}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("faqSubtitle", { name })}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              defaultValue="faq-0"
            >
              {product.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                    {t(`faqs.${faq.qKey}`)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {t(`faqs.${faq.aKey}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Download CTA */}
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

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ReqRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 pb-3 sm:flex-row sm:items-center sm:justify-between",
        !last && "border-b border-border/60"
      )}
    >
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-foreground sm:text-right">
        {value}
      </dd>
    </div>
  );
}

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
