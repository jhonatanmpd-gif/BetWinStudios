"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationGateModal() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("betwin_registration_gate_closed") !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function close() {
    setVisible(false);
    try { localStorage.setItem("betwin_registration_gate_closed", "1"); } catch {}
    // Ao fechar o cadastro, abre imediatamente a janela de informações.
    router.replace("/?info=1", { scroll: false });
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="registration-gate-title">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-yellow-300/30 bg-[#0C1118] p-7 text-center shadow-2xl shadow-black/60">
        <button onClick={close} aria-label="Fechar" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-2xl text-white hover:bg-white/10">×</button>
        <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-300 text-2xl font-black text-black">BW</div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-yellow-300">BETWIN STUDIOS</p>
        <h2 id="registration-gate-title" className="mt-2 font-display text-3xl font-bold text-white">Crie sua conta</h2>
        <p className="mt-3 text-sm leading-6 text-white/55">Cadastre-se para acessar todos os recursos da plataforma. Você também pode fechar esta janela e conhecer o site antes de criar sua conta.</p>
        <Link href="/register" onClick={close} className="mt-7 block w-full rounded-xl bg-yellow-300 px-5 py-3 font-black text-black hover:bg-yellow-200">Cadastrar agora</Link>
        <button onClick={close} className="mt-3 w-full rounded-xl border border-white/10 px-5 py-3 font-semibold text-white/70 hover:bg-white/5">Conhecer a plataforma primeiro</button>
      </div>
    </div>
  );
}
