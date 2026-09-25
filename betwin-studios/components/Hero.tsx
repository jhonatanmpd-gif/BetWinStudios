import Image from "next/image";
import Link from "next/link";

export default function Hero({ totalGames }: { totalGames: number | null }) {
  return (
    <section className="container-page pt-3 sm:pt-5">
      <div className="hero-shell relative overflow-hidden rounded-[22px] border border-white/10 bg-[#080B10] shadow-2xl shadow-black/40">
        <Image
          src="/assets/betwin-home-banner.png"
          alt="BETWIN STUDIOS"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1280px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="relative min-h-[300px] sm:min-h-[390px] lg:min-h-[455px]">
          <div className="absolute bottom-6 left-5 flex flex-wrap gap-2 sm:bottom-8 sm:left-8">
            <Link href="/games" className="rounded-xl bg-yellow-300 px-5 py-3 text-sm font-black text-black shadow-xl shadow-yellow-300/20 transition hover:bg-yellow-200">Jogar agora</Link>
            <Link href="/register" className="rounded-xl border border-white/20 bg-black/35 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:border-yellow-300/60">Criar conta</Link>
          </div>
          <div className="absolute bottom-6 right-5 hidden rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-right backdrop-blur-md sm:block sm:bottom-8 sm:right-8">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55">Catálogo conectado</p>
            <p className="mt-1 font-display text-xl font-bold text-yellow-300">{totalGames ? totalGames.toLocaleString("pt-BR") : "—"} jogos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
