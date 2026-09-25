# Checklist de implantação

1. Criar PostgreSQL e preencher `DATABASE_URL`.
2. Definir `BIGBANG_API_KEY` no servidor.
3. Definir `AUTH_SECRET` com valor aleatório longo.
4. Definir `ADMIN_SETUP_KEY` com valor aleatório longo.
5. Manter `BIGBANG_DEMO_MODE=true` durante a homologação do fluxo do provedor.
6. Executar `npm install`, `npm run db:generate` e `npm run db:push`.
7. Abrir `/admin`, criar o primeiro administrador com `ADMIN_SETUP_KEY` e testar bloqueio/ativação, carteira e histórico.
8. Validar cadastro, login, catálogo e abertura de jogos.
9. Para a próxima fase, conectar o `PaymentIntent` a uma gateway e implementar webhook idempotente.
10. Antes de operação com dinheiro real, concluir os requisitos legais, regulatórios, antifraude, idade, limites, termos e jogo responsável aplicáveis.
