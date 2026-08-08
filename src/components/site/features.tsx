"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Gauge,
  ShieldCheck,
  Lock,
  Zap,
  Bell,
  Cloud,
  Globe,
  HeartHandshake,
} from "lucide-react";

const FEATURES = [
  { icon: Gauge, key: "speed", color: "text-[#EA0232]", bg: "bg-[#EA0232]/10" },
  { icon: ShieldCheck, key: "privacy", color: "text-[#803C38]", bg: "bg-[#803C38]/10" },
  { icon: Lock, key: "security", color: "text-[#2C2B2C]", bg: "bg-[#2C2B2C]/10" },
  { icon: Zap, key: "lightweight", color: "text-[#CE5564]", bg: "bg-[#CE5564]/10" },
  { icon: Bell, key: "autoupdate", color: "text-[#EA0232]", bg: "bg-[#EA0232]/10" },
  { icon: Cloud, key: "cloud", color: "text-[#525153]", bg: "bg-[#525153]/10" },
  { icon: Globe, key: "i18n", color: "text-[#767475]", bg: "bg-[#767475]/10" },
  { icon: HeartHandshake, key: "support", color: "text-[#803C38]", bg: "bg-[#803C38]/10" },
] as const;

export function Features() {
  const t = useTranslations("Features");

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-20 border-y border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("badge")}
          </span>
          <h2
            id="features-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
            {t("titleEnd")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-primary/30"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                {t(`items.${feature.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
