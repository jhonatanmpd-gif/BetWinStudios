"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { open?: boolean };

export default function WelcomeInfoModal({ open = false }: Props) {
  const router = useRouter();
  const [visible, setVisible] = useState(open);
  const [section, setSection] = useState("Informações regulatórias");

  useEffect(() => setVisible(open), [open]);

  function close() {
    setVisible(false);
    router.replace("/", { scroll: false });
  }

  if (!visible) return null;

  const content = section === "Informações regulatórias"
    ? {
        title: "Informações regulatórias",
        body: "Consulte aqui as informações oficiais sobre a operação, regras da plataforma e eventuais autorizações aplicáveis.",
        note: "A BetWinStudios deve exibir nesta área somente dados regulatórios, número de autorização e identificações oficiais que possam ser comprovados.",
      }
    : section === "Política da plataforma"
      ? {
          title: "Política da plataforma",
          body: "Consulte os termos de uso, política de privacidade, regras de promoções e demais condições aplicáveis antes de utilizar os serviços.",
          note: "",
        }
      : {
          title: "Bônus e promoções",
          body: "As promoções disponíveis serão exibidas nesta área. Cada oferta deve apresentar claramente seus requisitos, período de validade e regras.",
          note: "",
        };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="welcome-modal-title">
      <div className="relative flex max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-yellow-300/30 bg-white text-slate-900 shadow-2xl shadow-black/60">
        <aside className="hidden w-48 shrink-0 bg-gradient-to-b from-yellow-300 to-amber-400 sm:block">
          <div className="flex h-full flex-col">
            {[
              ["🔊", "Informações regulatórias"],
              ["📣", "Política da plataforma"],
              ["🎁", "Bônus e promoções"],
            ].map(([icon, label]) => (
              <button key={label} onClick={() => setSection(label)} className={`flex items-center gap-3 px-5 py-6 text-left text-sm font-bold transition ${section === label ? "bg-black/10" : "hover:bg-black/5"}`}>
                <span>{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="relative min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          <button onClick={close} aria-label="Fechar" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-xl text-white transition hover:scale-105">×</button>

          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50 px-5 py-2 text-xs font-black uppercase tracking-[.18em] text-blue-800">SIGAP · BETWINSTUDIOS</div>
            <h2 id="welcome-modal-title" className="font-display text-3xl font-bold sm:text-4xl">{content.title}</h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">{content.body}</p>
            {content.note && <p className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">{content.note}</p>}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4"><b>Conta</b><p className="mt-1 text-xs text-slate-500">Cadastro concluído</p></div>
              <div className="rounded-2xl border border-slate-200 p-4"><b>Jogos</b><p className="mt-1 text-xs text-slate-500">Catálogo integrado</p></div>
              <div className="rounded-2xl border border-slate-200 p-4"><b>Informações</b><p className="mt-1 text-xs text-slate-500">Dados da plataforma</p></div>
            </div>

            <button onClick={close} className="mt-8 rounded-xl bg-slate-950 px-8 py-3 font-bold text-yellow-300 transition hover:bg-slate-800">Continuar</button>
          </div>
        </section>
      </div>
    </div>
  );
}
