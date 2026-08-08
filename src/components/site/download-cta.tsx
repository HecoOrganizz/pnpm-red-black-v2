"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Download, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadCTA() {
  const t = useTranslations("DownloadCTA");

  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#121012] py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#CE5564]/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#EA0232]/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            {t("badge")}
          </div>

          <h2
            id="download-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="shine h-12 bg-white px-7 text-base font-bold text-primary shadow-lg hover:bg-white/95"
            >
              <a href="#" aria-label={t("cta.windows")} download>
                <Download className="mr-2 h-5 w-5" />
                {t("cta.windows")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/#products" aria-label={t("cta.viewProducts")}>
                {t("cta.viewProducts")}
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {t("trust.free")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t("trust.noSpyware")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" aria-hidden="true" />
              {t("trust.fast")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {t("trust.compat")}
            </span>
          </div>

          <p className="mt-6 text-xs text-white/70">{t("meta")}</p>
        </motion.div>
      </div>
    </section>
  );
}
