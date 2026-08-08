import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = [
  "en", // English (default)
  "vi", // Tiếng Việt
  "fr", // Français
  "de", // Deutsch
  "it", // Italiano
  "ru", // Русский
  "zh", // 中文
  "lo", // ລາວ
  "ja", // 日本語
  "ko", // 한국어
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
