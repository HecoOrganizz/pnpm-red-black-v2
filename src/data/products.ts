import {
  Trash2,
  Cpu,
  ShieldCheck,
  KeyRound,
  DatabaseBackup,
  PackageX,
  Zap,
  Clock,
  Layers,
  Eye,
  History,
  Save,
  Calendar,
  Wrench,
  Lock,
  Globe,
  ShieldAlert,
  RefreshCw,
  Cloud,
  AlertTriangle,
  Database,
  type LucideIcon,
} from "lucide-react";

export type DetailedFeature = {
  icon: LucideIcon;
  /** i18n key: `Products.items.<slug>.detailedFeatures.<idx>.title` / `.description` */
  key: string;
};

export type FAQ = { qKey: string; aKey: string };

export type Product = {
  slug: string;
  /** i18n key prefix: `Products.items.<slug>` */
  i18nKey: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  rating: number;
  downloads: string;
  size: string;
  version: string;
  lastUpdate: string;
  /** i18n keys for system requirements */
  requirements: {
    osKey: string;
    cpuKey: string;
    ramKey: string;
    diskKey: string;
    internetKey: string;
  };
  /** detailed feature icons + i18n keys */
  detailedFeatures: DetailedFeature[];
  /** FAQ i18n keys (q + a) — uses ProductDetail Faq namespace */
  faqs: { qKey: string; aKey: string }[];
  /** How it works — 3 steps, each with i18n key */
  howItWorks: { step: string; titleKey: string; descKey: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "zimidi-cleaner",
    i18nKey: "Products.items.cleaner",
    icon: Trash2,
    gradient: "from-[#EA0232] to-[#CE5564]",
    accent: "text-[#EA0232]",
    rating: 4.8,
    downloads: "12.4M",
    size: "18 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.cleaner.os",
      cpuKey: "ProductDetail.reqs.cleaner.cpu",
      ramKey: "ProductDetail.reqs.cleaner.ram",
      diskKey: "ProductDetail.reqs.cleaner.disk",
      internetKey: "ProductDetail.reqs.cleaner.internet",
    },
    detailedFeatures: [
      { icon: Zap, key: "cleaner.df1" },
      { icon: ShieldCheck, key: "cleaner.df2" },
      { icon: Clock, key: "cleaner.df3" },
      { icon: Layers, key: "cleaner.df4" },
      { icon: Eye, key: "cleaner.df5" },
      { icon: History, key: "cleaner.df6" },
    ],
    faqs: [
      { qKey: "cleaner.q1", aKey: "cleaner.a1" },
      { qKey: "cleaner.q2", aKey: "cleaner.a2" },
      { qKey: "cleaner.q3", aKey: "cleaner.a3" },
      { qKey: "cleaner.q4", aKey: "cleaner.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "cleaner.h1t", descKey: "cleaner.h1d" },
      { step: "02", titleKey: "cleaner.h2t", descKey: "cleaner.h2d" },
      { step: "03", titleKey: "cleaner.h3t", descKey: "cleaner.h3d" },
    ],
  },
  {
    slug: "zimidi-driver",
    i18nKey: "Products.items.driver",
    icon: Cpu,
    gradient: "from-[#EA0232] to-[#803C38]",
    accent: "text-[#EA0232]",
    rating: 4.7,
    downloads: "8.9M",
    size: "22 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.driver.os",
      cpuKey: "ProductDetail.reqs.driver.cpu",
      ramKey: "ProductDetail.reqs.driver.ram",
      diskKey: "ProductDetail.reqs.driver.disk",
      internetKey: "ProductDetail.reqs.driver.internet",
    },
    detailedFeatures: [
      { icon: Database, key: "driver.df1" },
      { icon: RefreshCw, key: "driver.df2" },
      { icon: Save, key: "driver.df3" },
      { icon: Calendar, key: "driver.df4" },
      { icon: Cpu, key: "driver.df5" },
      { icon: Wrench, key: "driver.df6" },
    ],
    faqs: [
      { qKey: "driver.q1", aKey: "driver.a1" },
      { qKey: "driver.q2", aKey: "driver.a2" },
      { qKey: "driver.q3", aKey: "driver.a3" },
      { qKey: "driver.q4", aKey: "driver.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "driver.h1t", descKey: "driver.h1d" },
      { step: "02", titleKey: "driver.h2t", descKey: "driver.h2d" },
      { step: "03", titleKey: "driver.h3t", descKey: "driver.h3d" },
    ],
  },
  {
    slug: "zimidi-privacy",
    i18nKey: "Products.items.privacy",
    icon: ShieldCheck,
    gradient: "from-[#CE5564] to-[#EA0232]",
    accent: "text-[#CE5564]",
    rating: 4.9,
    downloads: "6.7M",
    size: "16 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.privacy.os",
      cpuKey: "ProductDetail.reqs.privacy.cpu",
      ramKey: "ProductDetail.reqs.privacy.ram",
      diskKey: "ProductDetail.reqs.privacy.disk",
      internetKey: "ProductDetail.reqs.privacy.internet",
    },
    detailedFeatures: [
      { icon: Eye, key: "privacy.df1" },
      { icon: Lock, key: "privacy.df2" },
      { icon: Trash2, key: "privacy.df3" },
      { icon: Globe, key: "privacy.df4" },
      { icon: ShieldAlert, key: "privacy.df5" },
      { icon: KeyRound, key: "privacy.df6" },
    ],
    faqs: [
      { qKey: "privacy.q1", aKey: "privacy.a1" },
      { qKey: "privacy.q2", aKey: "privacy.a2" },
      { qKey: "privacy.q3", aKey: "privacy.a3" },
      { qKey: "privacy.q4", aKey: "privacy.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "privacy.h1t", descKey: "privacy.h1d" },
      { step: "02", titleKey: "privacy.h2t", descKey: "privacy.h2d" },
      { step: "03", titleKey: "privacy.h3t", descKey: "privacy.h3d" },
    ],
  },
  {
    slug: "zimidi-password",
    i18nKey: "Products.items.password",
    icon: KeyRound,
    gradient: "from-[#803C38] to-[#EA0232]",
    accent: "text-[#803C38]",
    rating: 4.8,
    downloads: "4.2M",
    size: "14 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.password.os",
      cpuKey: "ProductDetail.reqs.password.cpu",
      ramKey: "ProductDetail.reqs.password.ram",
      diskKey: "ProductDetail.reqs.password.disk",
      internetKey: "ProductDetail.reqs.password.internet",
    },
    detailedFeatures: [
      { icon: KeyRound, key: "password.df1" },
      { icon: RefreshCw, key: "password.df2" },
      { icon: Zap, key: "password.df3" },
      { icon: Cloud, key: "password.df4" },
      { icon: ShieldCheck, key: "password.df5" },
      { icon: AlertTriangle, key: "password.df6" },
    ],
    faqs: [
      { qKey: "password.q1", aKey: "password.a1" },
      { qKey: "password.q2", aKey: "password.a2" },
      { qKey: "password.q3", aKey: "password.a3" },
      { qKey: "password.q4", aKey: "password.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "password.h1t", descKey: "password.h1d" },
      { step: "02", titleKey: "password.h2t", descKey: "password.h2d" },
      { step: "03", titleKey: "password.h3t", descKey: "password.h3d" },
    ],
  },
  {
    slug: "zimidi-backup",
    i18nKey: "Products.items.backup",
    icon: DatabaseBackup,
    gradient: "from-[#CE5564] to-[#803C38]",
    accent: "text-[#CE5564]",
    rating: 4.7,
    downloads: "3.8M",
    size: "26 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.backup.os",
      cpuKey: "ProductDetail.reqs.backup.cpu",
      ramKey: "ProductDetail.reqs.backup.ram",
      diskKey: "ProductDetail.reqs.backup.disk",
      internetKey: "ProductDetail.reqs.backup.internet",
    },
    detailedFeatures: [
      { icon: Clock, key: "backup.df1" },
      { icon: Cloud, key: "backup.df2" },
      { icon: History, key: "backup.df3" },
      { icon: Zap, key: "backup.df4" },
      { icon: Database, key: "backup.df5" },
      { icon: Lock, key: "backup.df6" },
    ],
    faqs: [
      { qKey: "backup.q1", aKey: "backup.a1" },
      { qKey: "backup.q2", aKey: "backup.a2" },
      { qKey: "backup.q3", aKey: "backup.a3" },
      { qKey: "backup.q4", aKey: "backup.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "backup.h1t", descKey: "backup.h1d" },
      { step: "02", titleKey: "backup.h2t", descKey: "backup.h2d" },
      { step: "03", titleKey: "backup.h3t", descKey: "backup.h3d" },
    ],
  },
  {
    slug: "zimidi-uninstaller",
    i18nKey: "Products.items.uninstaller",
    icon: PackageX,
    gradient: "from-[#EA0232] to-[#2C2B2C]",
    accent: "text-[#EA0232]",
    rating: 4.6,
    downloads: "5.5M",
    size: "12 MB",
    version: "2026.8.1",
    lastUpdate: "07/08/2026",
    requirements: {
      osKey: "ProductDetail.reqs.uninstaller.os",
      cpuKey: "ProductDetail.reqs.uninstaller.cpu",
      ramKey: "ProductDetail.reqs.uninstaller.ram",
      diskKey: "ProductDetail.reqs.uninstaller.disk",
      internetKey: "ProductDetail.reqs.uninstaller.internet",
    },
    detailedFeatures: [
      { icon: Trash2, key: "uninstaller.df1" },
      { icon: Layers, key: "uninstaller.df2" },
      { icon: Wrench, key: "uninstaller.df3" },
      { icon: Eye, key: "uninstaller.df4" },
      { icon: RefreshCw, key: "uninstaller.df5" },
      { icon: ShieldCheck, key: "uninstaller.df6" },
    ],
    faqs: [
      { qKey: "uninstaller.q1", aKey: "uninstaller.a1" },
      { qKey: "uninstaller.q2", aKey: "uninstaller.a2" },
      { qKey: "uninstaller.q3", aKey: "uninstaller.a3" },
      { qKey: "uninstaller.q4", aKey: "uninstaller.a4" },
    ],
    howItWorks: [
      { step: "01", titleKey: "uninstaller.h1t", descKey: "uninstaller.h1d" },
      { step: "02", titleKey: "uninstaller.h2t", descKey: "uninstaller.h2d" },
      { step: "03", titleKey: "uninstaller.h3t", descKey: "uninstaller.h3d" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, limit);
}

export const ALL_PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);
