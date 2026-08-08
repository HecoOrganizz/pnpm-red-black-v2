"use client";

import { useTranslations } from "next-intl";

const TRUSTED_BY = [
  "VnReview",
  "Tinh Tế",
  "HowKteam",
  "QuanTriMang",
  "TechZ",
  "GenZ News",
  "Hanoicomputer",
  "Anphat PC",
];

export function TrustStrip() {
  const t = useTranslations("TrustStrip");
  return (
    <section
      aria-label={t("label")}
      className="border-y border-border bg-background py-10"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("label")}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((name, idx) => (
              <span
                key={`${name}-${idx}`}
                className="font-display text-xl font-bold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
