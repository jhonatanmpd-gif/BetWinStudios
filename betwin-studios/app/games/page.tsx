import GameCard from "@/components/GameCard";
import ProviderFilter from "@/components/ProviderFilter";
import Pagination from "@/components/Pagination";
import { listCategories, listGames, BigBangApiError, type GameType } from "@/lib/bigbang";

export const revalidate = 300;
const PAGE_SIZE = 30;

type SearchParams = { provider?:string; category?:string; search?:string; type?:string; page?:string };
const typeOptions: { value:GameType|"", label:string }[] = [
  {value:"",label:"Todos"},{value:"slot",label:"Slots"},{value:"live",label:"Ao vivo"},{value:"crash",label:"Crash"},
];

export default async function GamesPage({ searchParams }:{searchParams:Promise<SearchParams>}) {
  const sp = await searchParams;
  const gameType = (["slot","live","crash"].includes(sp.type ?? "") ? sp.type : undefined) as GameType|undefined;
  const requestedPage = Math.max(1, Number(sp.page ?? "1") || 1);
  const offset = (requestedPage - 1) * PAGE_SIZE;

  const [gamesResult, categoriesResult] = await Promise.allSettled([
    listGames({ provider:sp.provider, category:sp.category, search:sp.search, limit:PAGE_SIZE, offset }),
    listCategories(),
  ]);

  const games = gamesResult.status === "fulfilled"
    ? (gameType ? gamesResult.value.data.filter(g => g.game_type === gameType) : gamesResult.value.data)
    : [];
  const apiPagination = gamesResult.status === "fulfilled" ? gamesResult.value.pagination : {total:0,limit:PAGE_SIZE,offset};
  const totalPages = Math.max(1, Math.ceil(apiPagination.total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const categories = categoriesResult.status === "fulfilled" ? categoriesResult.value.data : [];
  const gamesError = gamesResult.status === "rejected"
    ? gamesResult.reason instanceof BigBangApiError ? gamesResult.reason.message : "Não foi possível carregar o catálogo agora."
    : null;

  const query = { provider:sp.provider, category:sp.category, search:sp.search, type:sp.type };

  return <div className="container-page py-10 sm:py-14">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Catálogo</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">Encontre seu jogo</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">Pesquise por nome, filtre por categoria ou provedor e navegue pelo catálogo atualizado.</p>
      </div>
      {!gamesError && <p className="text-sm text-ink-muted">{apiPagination.total.toLocaleString("pt-BR")} jogos encontrados</p>}
    </div>

    <form action="/games" method="get" className="mt-8 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <input type="text" name="search" defaultValue={sp.search} placeholder="Buscar jogo ou provedor…" className="w-full rounded-xl border border-base-line bg-base-surface/80 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 lg:max-w-sm" />
        {sp.provider && <input type="hidden" name="provider" value={sp.provider} />}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {typeOptions.map(opt => {
            const params = new URLSearchParams();
            if (sp.provider) params.set("provider",sp.provider);
            if (sp.search) params.set("search",sp.search);
            if (opt.value) params.set("type",opt.value);
            const qs=params.toString();
            return <a key={opt.value} href={`/games${qs?`?${qs}`:""}`} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${ (sp.type||"")===opt.value ? "border-gold bg-gold/10 text-gold":"border-base-line bg-base-surface/60 text-ink-muted hover:border-gold/40 hover:text-ink"}`}>{opt.label}</a>
          })}
        </div>
      </div>
      {categories.length > 0 && <ProviderFilter categories={categories} activeSlug={sp.provider} baseQuery={{search:sp.search,type:sp.type}} />}
    </form>

    {gamesError && <div className="mt-8 rounded-2xl border border-lose/30 bg-lose/10 p-5 text-sm text-lose">{gamesError}</div>}
    {!gamesError && games.length===0 && <div className="mt-16 rounded-2xl border border-base-line bg-base-surface/50 p-12 text-center text-ink-muted">Nenhum jogo encontrado. Tente outra busca ou filtro.</div>}
    {games.length > 0 && <>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {games.map(game => <GameCard key={game.id} game={game} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} query={query} />
    </>}
  </div>;
}
