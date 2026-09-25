import Link from "next/link";

export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="BETWIN STUDIOS">
      <span className={`brand-crown ${compact ? "h-9 w-9" : "h-10 w-10"}`}>
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
          <path d="M7 11l8 7 9-12 9 12 8-7-4 24H11L7 11Z" fill="currentColor" />
          <path d="M13 30h22l-2 6H15l-2-6Z" fill="#0A0D12" opacity=".95" />
          <circle cx="24" cy="23" r="3.2" fill="#0A0D12" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[21px] font-black tracking-[-.04em] text-white sm:text-[23px]">BET<span className="text-yellow-300">WIN</span></span>
        <span className="mt-0.5 block text-[8px] font-bold tracking-[.42em] text-white/70">STUDIOS</span>
      </span>
    </Link>
  );
}
