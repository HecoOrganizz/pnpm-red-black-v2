import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <Button asChild className="mt-6">
        <Link href="/">{t("back")}</Link>
      </Button>
    </div>
  );
}
