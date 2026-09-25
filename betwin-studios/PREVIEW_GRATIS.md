# Preview gratuito — BETWIN STUDIOS

## O que esta versão já entrega
- Homepage com identidade visual BETWIN STUDIOS.
- Banner principal e banners promocionais locais em `public/assets`.
- Catálogo de jogos via API BigBang no servidor.
- Cadastro e login.
- Área `/admin` com usuários, saldos, transações, depósitos e liquidações registradas.
- Estrutura preparada para conectar a sua própria gateway depois.

## Importante para a prévia online
O layout pode ser publicado em uma hospedagem de Next.js, mas o dashboard e o login precisam de um PostgreSQL e das variáveis de ambiente do projeto.

### Variáveis obrigatórias
- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_SETUP_KEY`
- `BIGBANG_API_KEY`

`BIGBANG_DEMO_MODE=true` mantém os lançamentos de jogos no modo de demonstração enquanto o ambiente de testes estiver sendo usado.

A gateway de pagamentos permanece desacoplada nesta versão. O endpoint registra o pedido internamente como pendente até que a documentação da sua gateway seja fornecida.

## Netlify
O projeto já possui `netlify.toml`. O Netlify detecta Next.js e executa `npm run build`.

Depois de conectar o repositório, cadastre as variáveis em Site configuration → Environment variables e faça um novo deploy.

## Banco gratuito para teste
Para uma prévia, você pode usar um PostgreSQL gratuito, como Neon ou Supabase, e colocar a string de conexão em `DATABASE_URL`.

Depois de configurar o banco, execute:

```bash
npm install
npx prisma generate
npx prisma db push
```

O primeiro administrador é criado pelo próprio painel usando `ADMIN_SETUP_KEY`.
