# Deploy na Railway

## Configuração
1. Crie um projeto na Railway e conecte este repositório ou envie esta pasta.
2. Configure o diretório raiz como `betwin-studios` se o repositório contiver a pasta externa.
3. Adicione um serviço PostgreSQL e configure `DATABASE_URL` com a URL fornecida pela Railway.
4. Configure as variáveis `AUTH_SECRET`, `ADMIN_SETUP_KEY`, `BIGBANG_API_KEY` e `BIGBANG_DEMO_MODE=true`.
5. Faça o deploy. O build executa `prisma generate && next build`; o start executa `next start`.
6. Após o banco estar disponível, execute `npm run db:push` uma vez no ambiente de produção para criar/atualizar o schema, depois valide cadastro, login, catálogo e painel.

## Variáveis necessárias
- `DATABASE_URL`: conexão PostgreSQL.
- `AUTH_SECRET`: segredo aleatório longo para sessões.
- `ADMIN_SETUP_KEY`: segredo forte para inicializar o primeiro administrador.
- `BIGBANG_API_KEY`: chave fornecida pelo provedor, somente no backend.
- `BIGBANG_DEMO_MODE`: mantenha `true` durante a homologação.

Não use credenciais de exemplo em produção. Não configure chaves secretas com prefixo `NEXT_PUBLIC_`.

## Observação
Este pacote mantém os arquivos e a estrutura do projeto original. O build e a conexão com serviços externos precisam ser validados no ambiente com dependências e credenciais reais.
