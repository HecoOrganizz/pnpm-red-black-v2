"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter, type Locale } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ChevronDown, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const NAV_KEYS = ["products", "features", "reviews", "pricing", "faq"] as const;

export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label="Zimidi home"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            {/* <LogoMark className="h-9 w-9 md:h-10 md:w-10" />
            <span className="font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              Zimidi
            </span> */}
            <img src="/zimidi-logo.png" alt="Zimidi" className="h-16 w-auto object-contain" />
          </Link>

          <nav
            aria-label={t("mobileNav")}
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={`/#${key}`}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link href="/#products">{t("cta.explore")}</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="shine bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/#download">
                <Download className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {t("cta.download")}
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <nav
              aria-label={t("mobileNav")}
              className="container mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {NAV_KEYS.map((key) => (
                <Link
                  key={key}
                  href={`/#${key}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {t(`nav.${key}`)}
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 px-2">
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href="/#products"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("cta.explore")}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground"
                >
                  <Link href="/#download" onClick={() => setMobileOpen(false)}>
                    <Download className="mr-1.5 h-4 w-4" />
                    {t("cta.download")}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Lang");

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale as Locale });
  };

  // Flag emojis cho từng ngôn ngữ
  const flags: Record<string, string> = {
    en: "🇬🇧",
    vi: "🇻🇳",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    ru: "🇷🇺",
    zh: "🇨🇳",
    lo: "🇱🇦",
    ja: "🇯🇵",
    ko: "🇰🇷",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors",
            "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
          aria-label={t("switch")}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{flags[locale]}</span>
          <span className="hidden md:inline uppercase text-xs">{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[400px] min-w-[180px] overflow-y-auto"
      >
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className="flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">
                {flags[l]}
              </span>
              <span>{t(l)}</span>
            </span>
            {l === locale && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
