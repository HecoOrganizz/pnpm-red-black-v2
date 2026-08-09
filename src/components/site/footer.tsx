"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Twitter, Youtube, Github } from "lucide-react";

const FOOTER_LINKS = {
  products: [
    { label: "cleaner", href: "/products/zimidi-cleaner" },
    { label: "driver", href: "/products/zimidi-driver" },
    { label: "privacy", href: "/products/zimidi-privacy" },
    { label: "password", href: "/products/zimidi-password" },
    { label: "backup", href: "/products/zimidi-backup" },
    { label: "uninstaller", href: "/products/zimidi-uninstaller" },
  ],
  company: [
    { label: "about", href: "#" },
    { label: "careers", href: "#" },
    { label: "press", href: "#" },
    { label: "partners", href: "#" },
    { label: "contact", href: "mailto:hello@zimidi.app" },
  ],
  resources: [
    { label: "support", href: "/#faq" },
    { label: "guides", href: "#" },
    { label: "blog", href: "#" },
    { label: "driverCheck", href: "#" },
    { label: "forum", href: "#" },
  ],
  legal: [
    { label: "terms", href: "#" },
    { label: "privacy", href: "#" },
    { label: "cookie", href: "#" },
    { label: "license", href: "#" },
    { label: "security", href: "#" },
  ],
} as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/zimidiapp", icon: Facebook },
  { label: "Twitter / X", href: "https://twitter.com/zimidiapp", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com/@zimidiapp", icon: Youtube },
  { label: "GitHub", href: "https://github.com/zimidiapp", icon: Github },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tProducts = useTranslations("Products.items");

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-secondary/40"
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">

            {/* <Link
              href="/"
              aria-label="Zimidi"
              className="inline-flex items-center gap-2"
            >
              <svg
                className="h-9 w-9"
                viewBox="0 0 64 64"
                fill="none"
                role="img"
                aria-label="Zimidi logo"
              >
                <defs>
                  <linearGradient
                    id="zimidi-footer-grad"
                    x1="0"
                    y1="0"
                    x2="64"
                    y2="64"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EA0232" />
                    <stop offset="1" stopColor="#803C38" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="16" fill="url(#zimidi-footer-grad)" />
                <path
                  d="M22 18 L22 46 M22 32 L42 32 M42 18 L42 46"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="22" cy="18" r="3.5" fill="white" />
                <circle cx="42" cy="46" r="3.5" fill="white" />
                <circle cx="48" cy="18" r="3" fill="#CE5564" opacity="0.95" />
              </svg>
              <span className="font-display text-xl font-extrabold text-foreground">
                Zimidi
              </span>
            </Link> */}

            <img src="/zimidi-logo.png" alt="Zimidi" className="h-10 md:h-12 w-auto object-contain" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("brandDesc")}
            </p>

            <address className="mt-5 space-y-1 text-sm not-italic text-muted-foreground">
              <div>{t("company")}</div>
              <div>{t("address")}</div>
              <div>
                <a
                  href="mailto:support@zimidi.app"
                  className="text-primary hover:underline"
                >
                  support@zimidi.app
                </a>

              </div>
            </address>

            <div className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zimidi ${social.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Products column - uses Products.items.<slug>.name */}
          <nav aria-label={t("columns.products")} className="flex flex-col">
            <h3 className="font-display text-sm font-bold text-foreground">
              {t("columns.products")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.products.map((link) => {
                const slug = link.label;
                return (
                  <li key={slug}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {tProducts(`${slug}.name`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <FooterLinkColumn
            title={t("columns.company")}
            links={FOOTER_LINKS.company}
            t={t}
          />
          <FooterLinkColumn
            title={t("columns.resources")}
            links={FOOTER_LINKS.resources}
            t={t}
          />
          <FooterLinkColumn
            title={t("columns.legal")}
            links={FOOTER_LINKS.legal}
            t={t}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M6 1L10 3V7C10 9 8 11 6 11.5C4 11 2 9 2 7V3L6 1Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            {t("trustBadges.authenticode")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5">
            ✓ {t("trustBadges.gdpr")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5">
            ✓ {t("trustBadges.audit")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5">
            ✓ {t("trustBadges.iso")}
          </span>
        </div>
      </div>

      <div className="border-t border-border bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>{t("copyright")}</p>
            <p className="flex items-center gap-2">
              <span>{t("madeWith")}</span>
              <span className="text-[#EA0232]" aria-hidden="true">
                ♥
              </span>
              <span>Vietnam</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  links,
  t,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <nav aria-label={title} className="flex flex-col">
      <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.href === "#" ? (
              <span className="text-sm text-muted-foreground/70">
                {t(`links.${link.label}`)}
              </span>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {t(`links.${link.label}`)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
