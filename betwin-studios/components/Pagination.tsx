import Link from "next/link";

function hrefFor(page: number, query: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (value) params.set(key, value);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  const qs = params.toString();
  return `/games${qs ? `?${qs}` : ""}`;
}

export default function Pagination({
  page,
  totalPages,
  query,
}: {
  page: number;
  totalPages: number;
  query: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const visible = [...pages].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginação">
      {page > 1 && <Link href={hrefFor(page - 1, query)} className="rounded-xl border border-base-line bg-base-surface px-4 py-2 text-sm font-semibold text-ink-muted hover:border-gold/50 hover:text-ink">Anterior</Link>}
      {visible.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - visible[i - 1] > 1 && <span className="px-1 text-ink-faint">…</span>}
          <Link href={hrefFor(n, query)} className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold ${n === page ? "border-gold bg-gold text-base" : "border-base-line bg-base-surface text-ink-muted hover:border-gold/50 hover:text-ink"}`}>{n}</Link>
        </span>
      ))}
      {page < totalPages && <Link href={hrefFor(page + 1, query)} className="rounded-xl border border-base-line bg-base-surface px-4 py-2 text-sm font-semibold text-ink-muted hover:border-gold/50 hover:text-ink">Próxima</Link>}
    </nav>
  );
}
