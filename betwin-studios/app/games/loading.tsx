export default function LoadingGames() {
  return (
    <div className="container-page py-12">
      <div className="h-9 w-48 animate-pulse rounded bg-base-surface" />
      <div className="mt-3 h-5 w-72 animate-pulse rounded bg-base-surface" />

      <div className="mt-8 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-base-surface" />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-card bg-base-surface" />
        ))}
      </div>
    </div>
  );
}
