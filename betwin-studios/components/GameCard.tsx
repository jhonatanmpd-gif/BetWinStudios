import Image from "next/image";
import Link from "next/link";
import type { BigBangGame } from "@/lib/bigbang";

const typeLabel: Record<BigBangGame["game_type"], string> = {
  slot: "Slot",
  live: "Ao vivo",
  crash: "Crash",
};

export default function GameCard({ game }: { game: BigBangGame }) {
  return (
    <Link
      href={`/play/${game.id}`}
      className="group overflow-hidden rounded-2xl border border-base-line/70 bg-base-surface/70 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold/5"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-base-raised">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center font-display text-sm text-ink-faint">{game.title}</div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        {game.is_premium && (
          <span className="absolute left-2.5 top-2.5 rounded-lg bg-gold px-2 py-1 text-[10px] font-black uppercase tracking-wide text-base">Premium</span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          {typeLabel[game.game_type]}
        </span>
        <span className="absolute bottom-3 right-3 rounded-lg bg-gold px-2.5 py-1 text-[10px] font-bold text-base opacity-0 transition group-hover:opacity-100">Abrir</span>
      </div>
      <div className="p-3.5">
        <p className="truncate text-sm font-bold text-ink">{game.title}</p>
        <p className="mt-1 truncate text-xs text-ink-muted">{game.provider}</p>
      </div>
    </Link>
  );
}
