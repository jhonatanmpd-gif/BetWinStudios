import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryRail from "@/components/CategoryRail";
import PromoBanners from "@/components/PromoBanners";
import GameCard from "@/components/GameCard";
import { listGames, BigBangApiError } from "@/lib/bigbang";
import WelcomeInfoModal from "@/components/WelcomeInfoModal";
import RegistrationGateModal from "@/components/RegistrationGateModal";

export const revalidate = 300;

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ registered?: string; info?: string }> }) {
  const params = searchParams ? await searchParams : {};
  let featured: Awaited<ReturnType<typeof listGames>> | null = null;
  let error: string | null = null;
  try {
    featured = await listGames({ limit: 12 });
  } catch (err) {
    error = err instanceof BigBangApiError ? err.message : "Não foi possível carregar o catálogo agora.";
  }

  return (
    <>
      <RegistrationGateModal />
      <WelcomeInfoModal open={params.registered === "1" || params.info === "1"} />
      <Hero totalGames={featured?.pagination.total ?? null} />
      <main className="container-page pb-10">
        <CategoryRail />

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl text-yellow-300">✦</span>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Jogos em destaque</h2>
              </div>
              <p className="mt-2 text-sm text-white/45">Seleção atualizada diretamente do catálogo conectado.</p>
            </div>
            <Link href="/games" className="hidden text-sm font-bold text-yellow-300 transition hover:text-yellow-200 sm:block">Ver todos →</Link>
          </div>

          {error && <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200">{error}</div>}
          {featured && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {featured.data.map((game) => <GameCard key={game.id} game={game} />)}
            </div>
          )}
          <Link href="/games" className="mt-7 block text-center text-sm font-bold text-yellow-300 sm:hidden">Ver catálogo completo →</Link>
        </section>

        <PromoBanners />

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["⌁", "Pagamento seguro", "Seus dados protegidos durante a navegação."],
            ["◉", "Suporte", "Central preparada para ajudar quando precisar."],
            ["♛", "Experiência premium", "Interface otimizada para desktop e celular."],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-white/7 bg-[#0C1118] p-5">
              <span className="text-2xl text-yellow-300">{icon}</span>
              <h3 className="mt-3 font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/45">{text}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
