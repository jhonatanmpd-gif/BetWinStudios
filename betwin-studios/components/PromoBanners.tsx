import Link from "next/link";

const banners = [
  {
    id: "promocoes",
    title: "PROMOÇÕES BETWIN",
    text: "Confira as campanhas e novidades da plataforma.",
    icon: "✦",
    className: "promo-sport",
  },
  {
    id: "live",
    title: "CASSINO AO VIVO",
    text: "Entre nas mesas ao vivo disponíveis no catálogo.",
    icon: "♠",
    className: "promo-live",
  },
  {
    id: "vip",
    title: "PROGRAMA VIP",
    text: "Uma área especial para experiências e benefícios.",
    icon: "♛",
    className: "promo-vip",
  },
];

export default function PromoBanners() {
  return (
    <section className="mt-8 grid gap-4 lg:grid-cols-3">
      {banners.map((banner) => (
        <div id={banner.id} key={banner.id} className={`promo-card ${banner.className}`}>
          <div className="promo-glow" />
          <div className="relative z-10 flex min-h-[155px] flex-col justify-between p-5 sm:min-h-[175px] sm:p-6">
            <div>
              <span className="text-3xl text-yellow-300">{banner.icon}</span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">{banner.title}</h3>
              <p className="mt-1 max-w-[280px] text-xs leading-5 text-white/65">{banner.text}</p>
            </div>
            <Link href={banner.id === "live" ? "/games?type=live" : "/games"} className="mt-4 inline-flex w-fit rounded-lg bg-yellow-300 px-4 py-2 text-xs font-black text-black transition hover:bg-yellow-200">Ver agora</Link>
          </div>
        </div>
      ))}
    </section>
  );
}
