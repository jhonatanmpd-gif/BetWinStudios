import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-2xl text-ink">Página não encontrada</p>
      <p className="max-w-sm text-sm text-ink-muted">
        O link que você seguiu não existe ou foi movido.
      </p>
      <Link href="/" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-base">
        Voltar ao início
      </Link>
    </div>
  );
}
