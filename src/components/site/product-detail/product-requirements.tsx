"use client";

import { useTranslations } from "next-intl";
import type { ProductSectionProps } from "./shared";
import { ReqRow } from "./shared";

export function ProductRequirements({ product, slugShort, name }: ProductSectionProps) {
  const t = useTranslations("ProductDetail");

  return (
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
  );
}
