"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function UserMenu({
  displayName,
  email,
  balance,
  currency,
  isAdmin,
}: {
  displayName: string | null;
  email: string;
  balance: string;
  currency: string;
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const name = displayName?.trim() || email.split("@")[0];
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl border border-base-line bg-base-surface px-3 py-2 text-sm font-semibold text-white transition hover:border-gold/40"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-xs font-black text-base">{initial}</span>
        <span className="hidden sm:flex sm:flex-col sm:items-start sm:leading-tight">
          <span className="max-w-[120px] truncate">{name}</span>
          <span className="text-[11px] font-medium text-ink-muted">
            {Number(balance).toLocaleString("pt-BR", { style: "currency", currency: currency || "BRL" })}
          </span>
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`text-ink-muted transition ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-base-line bg-base-surface shadow-2xl">
          <div className="border-b border-base-line px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-ink-muted">{email}</p>
          </div>
          <div className="p-1.5">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-base-raised hover:text-white"
              >
                Painel admin
              </Link>
            )}
            <button
              onClick={logout}
              disabled={loggingOut}
              className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-lose transition hover:bg-base-raised disabled:opacity-60"
            >
              {loggingOut ? "Saindo…" : "Sair"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
