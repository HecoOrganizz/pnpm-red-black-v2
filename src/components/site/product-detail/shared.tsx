import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/** Shared props passed to most product detail section components. */
export type ProductSectionProps = {
  product: Product;
  /** Short slug key (e.g. "cleaner") used for i18n lookups. */
  slugShort: string;
  name: string;
};

export function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function ReqRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 pb-3 sm:flex-row sm:items-center sm:justify-between",
        !last && "border-b border-border/60"
      )}
    >
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-foreground sm:text-right">
        {value}
      </dd>
    </div>
  );
}
