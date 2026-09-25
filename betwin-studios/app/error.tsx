"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-2xl text-ink">Algo saiu do esperado</p>
      <p className="max-w-sm text-sm text-ink-muted">
        Tivemos um problema para carregar esta página. Você pode tentar de novo.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-base"
      >
        Tentar novamente
      </button>
    </div>
  );
}
