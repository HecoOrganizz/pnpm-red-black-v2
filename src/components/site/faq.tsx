"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Mail } from "lucide-react";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FAQ() {
  const t = useTranslations("FAQ");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <HelpCircle className="h-3 w-3" />
            {t("badge")}
          </span>
          <h2
            id="faq-heading"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            defaultValue="faq-0"
          >
            {FAQ_KEYS.map((key, idx) => (
              <AccordionItem
                key={key}
                value={`faq-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                  {t(`items.${key}.q`)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-secondary/40 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex-grow">
            <h3 className="font-display text-base font-bold text-foreground">
              {t("contactTitle")}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("contactDesc")}
            </p>
          </div>
          <a
            href="mailto:support@heco.app"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-[#CF002B]"
          >
            {t("contactButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
