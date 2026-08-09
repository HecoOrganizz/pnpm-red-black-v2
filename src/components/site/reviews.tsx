"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { key: "r1", avatar: "MT", color: "bg-[#EA0232]", rating: 5 },
  { key: "r2", avatar: "LP", color: "bg-[#803C38]", rating: 5 },
  { key: "r3", avatar: "HN", color: "bg-[#2C2B2C]", rating: 5 },
  { key: "r4", avatar: "ML", color: "bg-[#CE5564]", rating: 5 },
  { key: "r5", avatar: "ĐV", color: "bg-[#525153]", rating: 5 },
  { key: "r6", avatar: "HN", color: "bg-[#803C38]", rating: 5 },
];

const AWARDS = ["softpedia", "cnet", "chipvn", "tinhte", "msstore"] as const;

export function Reviews() {
  const t = useTranslations("Reviews");

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {t("badge")}
          </span>
          <h2
            id="reviews-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-3 lg:grid-cols-5">
          {AWARDS.map((award) => (
            <div
              key={award}
              className="flex flex-col items-center justify-center gap-1 text-center"
            >
              <div className="font-display text-base font-bold text-foreground capitalize">
                {award === "softpedia"
                  ? "Softpedia"
                  : award === "cnet"
                    ? "CNET"
                    : award === "chipvn"
                      ? "Chip.vn"
                      : award === "tinhte"
                        ? "Tinh tế"
                        : "Microsoft Store"}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(`awards.${award}`)}
              </div>
            </div>
          ))}
        </div> */}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, idx) => (
            <motion.figure
              key={review.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg"
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-primary/15"
                aria-hidden="true"
              />

              <div
                className="flex items-center gap-0.5"
                aria-label={`${review.rating} / 5`}
              >
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#EA0232] text-[#EA0232]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote
                className="mt-4 flex-grow text-sm leading-relaxed text-foreground/90"
              >
                &ldquo;{t(`items.${review.key}.text`)}&rdquo;
              </blockquote>

              <figcaption
                className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${review.color} font-semibold text-white`}
                  aria-hidden="true"
                >
                  {review.avatar}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-foreground"
                  >
                    {t(`items.${review.key}.name`)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t(`items.${review.key}.role`)}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
