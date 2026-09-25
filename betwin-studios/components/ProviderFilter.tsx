import Link from "next/link";
import type { BigBangCategory } from "@/lib/bigbang";

export default function ProviderFilter({
  categories,
  activeSlug,
  baseQuery,
}: {
  categories: BigBangCategory[];
  activeSlug?: string;
  baseQuery: Record<string, string | undefined>;
}) {
  function hrefFor(slug?: string) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(baseQuery)) if (v && k !== "provider") params.set(k, v);
    if (slug) params.set("provider", slug);
    params.delete("page");
    const qs = params.toString();
    return `/games${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <Link href={hrefFor()} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${!activeSlug ? "border-gold bg-gold/10 text-gold" : "border-base-line bg-base-surface/50 text-ink-muted hover:border-gold/40 hover:text-ink"}`}>Todos</Link>
      {categories.map((c) => (
        <Link key={c.id} href={hrefFor(c.slug)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${activeSlug === c.slug ? "border-gold bg-gold/10 text-gold" : "border-base-line bg-base-surface/50 text-ink-muted hover:border-gold/40 hover:text-ink"}`}>
          {c.name}
        </Link>
      ))}
    </div>
  );
}
