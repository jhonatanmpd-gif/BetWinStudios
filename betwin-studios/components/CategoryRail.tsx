import Link from "next/link";

const items = [
  ["⌘", "Todos", "/games"],
  ["▦", "Slots", "/games?type=slot"],
  ["♤", "Cassino ao Vivo", "/games?type=live"],
  ["◈", "Cassino", "/games"],
  ["✦", "Crash", "/games?type=crash"],
  ["☆", "Favoritos", "/login"],
];

export default function CategoryRail() {
  return (
    <div className="category-rail mt-5 overflow-x-auto rounded-2xl border border-white/5 bg-[#0C1118] p-2 shadow-xl shadow-black/20">
      <div className="flex min-w-max items-stretch gap-1">
        {items.map(([icon, label, href], index) => (
          <Link key={label} href={href} className={`category-item ${index === 0 ? "category-item-active" : ""}`}>
            <span className="category-icon">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
