import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer id="suporte" className="mt-14 border-t border-white/10 bg-[#070A0F]">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo compact />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">BETWIN STUDIOS — uma experiência moderna para descobrir jogos, provedores e mesas em um só lugar.</p>
        </div>
        <div className="text-sm text-white/50">
          <p className="font-bold text-white">Navegação</p>
          <div className="mt-4 grid gap-2.5">
            <a href="/games" className="hover:text-yellow-300">Todos os jogos</a>
            <a href="/games?type=slot" className="hover:text-yellow-300">Slots</a>
            <a href="/games?type=live" className="hover:text-yellow-300">Ao vivo</a>
            <a href="/games?type=crash" className="hover:text-yellow-300">Crash</a>
          </div>
        </div>
        <div className="text-sm text-white/50">
          <p className="font-bold text-white">Atendimento</p>
          <div className="mt-4 grid gap-2.5">
            <span>Suporte online</span>
            <span>Central de ajuda</span>
            <span>Termos e condições</span>
            <span>Política de privacidade</span>
          </div>
        </div>
        <div className="text-sm text-white/50">
          <p className="font-bold text-white">Segurança</p>
          <p className="mt-4 leading-6">Mantenha seus dados de acesso protegidos e utilize a plataforma somente de acordo com os termos aplicáveis.</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-white/30">© {new Date().getFullYear()} BETWIN STUDIOS. Todos os direitos reservados.</div>
    </footer>
  );
}
