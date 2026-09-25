import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A0F]/95 backdrop-blur-2xl">
      <div className="container-page flex min-h-[76px] items-center justify-between gap-4">
        <BrandLogo />

        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/65 lg:flex">
          <Link href="/" className="nav-link nav-active">Início</Link>
          <Link href="/games" className="nav-link">Jogos</Link>
          <a href="#promocoes" className="nav-link">Promoções</a>
          <a href="#vip" className="nav-link">VIP</a>
          <a href="#suporte" className="nav-link">Suporte</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="hidden rounded-xl border border-yellow-300/80 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-yellow-300/10 sm:inline-flex">Entrar</Link>
          <Link href="/register" className="rounded-xl bg-yellow-300 px-4 py-2.5 text-sm font-black text-black shadow-lg shadow-yellow-300/10 transition hover:bg-yellow-200 hover:shadow-yellow-300/20">Cadastrar</Link>
        </div>
      </div>
    </header>
  );
}
