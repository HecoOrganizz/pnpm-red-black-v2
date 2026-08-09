"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  Star,
  Zap,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "15K+", key: "downloads" },
  { value: "4.8/5", key: "rating" },
  // { value: "180+", key: "countries" },
  { value: "99.9%", key: "uptime" },
] as const;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background pt-12 sm:pt-16 lg:pt-20"
    >
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>

              <span>{t("badge")}</span>
            </div> */}

            <h1
              id="hero-heading"
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>{" "}
              {t("titleEnd")}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}{" "}
              <span className="font-semibold text-foreground">
                {t("subtitleHighlight")}
              </span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("trust.free")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("trust.noAds")}
              </span>
              {/* <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("trust.users")}
              </span> */}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                asChild
                className="shine h-12 px-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
              >
                <Link href="/#download">
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t("cta.download")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-6 text-base font-semibold"
              >
                <Link href="/#products">{t("cta.viewProducts")}</Link>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">{t("compat")}</p>

            <dl className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.key} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs text-muted-foreground sm:text-sm">
                    {t(`stats.${stat.key}`)}
                  </dt>
                  <dd className="order-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  const t = useTranslations("Hero.dashboard");

  const rows = [
    { label: t("categories.systemJunk"), value: "847 MB", pct: 70, color: "oklch(0.65 0.16 162)" },
    { label: t("categories.browserCache"), value: "234 MB", pct: 55, color: "oklch(0.7 0.13 200)" },
    { label: t("categories.registryErrors"), value: "128", pct: 40, color: "oklch(0.72 0.15 145)" },
    { label: t("categories.outdatedApps"), value: "8", pct: 30, color: "oklch(0.75 0.18 90)" },
  ];

  return (
    <div className="relative">
      <div
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-sky-400/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="glass shadow-soft-lg overflow-hidden rounded-2xl border border-white/60">
        <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex-1 text-center text-xs font-medium text-muted-foreground">
            {t("title")}
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.92 0.01 165)" strokeWidth="10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.65 0.16 162)" strokeWidth="10" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="52" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-bold text-foreground">92</span>
                <span className="text-[10px] text-muted-foreground">{t("score")}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{t("healthTitle")}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("healthDesc")}
                <br />
                {t("healthIssues")}
              </p>
            </div>
          </div>

          {rows.map((row) => (
            <div key={row.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="text-muted-foreground">{row.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: row.color }}
                />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 rounded-xl bg-primary/5 p-3 text-xs">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-foreground">{t("boost")}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -bottom-6 -left-8 hidden xl:block"
      >
        <div className="glass shadow-soft-lg flex items-center gap-3 rounded-2xl border border-white/60 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">
              {t("floatingTitle")}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {t("floatingDesc")}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
