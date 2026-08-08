"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  { key: "free", icon: Zap, highlight: false, accent: "border-border" },
  { key: "pro", icon: Crown, highlight: true, accent: "border-primary shadow-soft-lg" },
  { key: "business", icon: Building2, highlight: false, accent: "border-border" },
] as const;

export function Pricing() {
  const t = useTranslations("Pricing");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 border-t border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("badge")}
          </span>
          <h2
            id="pricing-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, idx) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className={cn(
                  "relative flex flex-col rounded-2xl border-2 bg-card p-7 transition-all duration-300",
                  plan.accent,
                  plan.highlight && "lg:-mt-4 lg:mb-4"
                )}
              >
                {plan.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-md">
                    {t("popular")}
                  </Badge>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      plan.highlight
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-foreground"
                    )}
                  >
                    <plan.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t(`plans.${plan.key}.name`)}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-foreground">
                    {t(`prices.${plan.key}`)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t(`periods.${plan.key}`)}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`plans.${plan.key}.description`)}
                </p>

                <ul className="mt-6 flex-grow space-y-3">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className={cn(
                        "flex items-start gap-2 text-sm",
                        f.endsWith(":")
                          ? "font-semibold text-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "mt-7 w-full",
                    plan.highlight
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  )}
                >
                  <Link
                    href="/#download"
                    aria-label={`${t(`plans.${plan.key}.cta`)} - ${t(`plans.${plan.key}.name`)}`}
                  >
                    {t(`plans.${plan.key}.cta`)}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
