# BETWIN STUDIOS

Base Next.js 15 + React 19 + TypeScript para a plataforma BETWIN STUDIOS, com catálogo BigBang, autenticação, banco PostgreSQL/Prisma e painel administrativo.

## O que já está pronto

- Interface responsiva e catálogo automático conectado ao backend.
- Busca, filtros, provedores e paginação.
- Login, cadastro e sessão segura por cookie HTTP-only.
- Banco PostgreSQL via Prisma.
- Usuários com status ativo/bloqueado e carteira individual.
- Histórico de transações e sessões de jogos.
- Painel `/admin` com métricas, usuários, controle de saldo e transações.
- Auditoria de ações administrativas.
- Modelo `PaymentIntent` preparado para encaixar uma gateway posteriormente.
- Endpoint `/api/payments/deposit` para criar pedidos pendentes sem acoplar o projeto a um provedor específico.
- Integração de jogos configurável por `BIGBANG_DEMO_MODE`.

## Instalação

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run db:push
npm run dev
```

Preencha no `.env.local`:

- `BIGBANG_API_KEY`
- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_SETUP_KEY`
- `BIGBANG_DEMO_MODE=true` enquanto estiver validando o fluxo com o ambiente de demonstração do provedor.

## Primeiro administrador

O projeto mantém a criação do primeiro administrador protegida por `ADMIN_SETUP_KEY`. Depois de configurar o banco, a tela administrativa pode ser inicializada pelo fluxo de bootstrap já presente no projeto.

## Gateway

A camada de pagamentos foi deixada desacoplada: `PaymentIntent` representa a intenção de pagamento e aceita provedor, ID externo, status, expiração, checkout/Pix e metadata. A próxima integração pode implementar a criação do pagamento no provedor e um webhook idempotente que conclui o `PaymentIntent` e gera a `Transaction`/atualização da carteira.

Antes de ativar qualquer operação com dinheiro real, configure os requisitos legais, regulatórios, antifraude, limites, idade, termos e controles de jogo responsável aplicáveis à operação.


## Painel administrativo V4
A rota `/admin` centraliza jogadores, depósitos/Pix, transações e liquidações da plataforma. A liquidação é registrada internamente como `PlatformSettlement`; a transferência financeira real exige uma conta empresarial e a API de um provedor de pagamentos/PSP, com webhook e credenciais configurados no servidor.

Não são armazenadas chaves secretas no frontend. Não use valores fictícios como confirmação de pagamento em produção.

## Fluxo de entrada
- Na primeira visita, a plataforma mostra uma janela de cadastro com opção de fechar e conhecer o site.
- Ao concluir o cadastro em `/register`, o usuário volta para `/?registered=1` e a janela de informações da plataforma é aberta automaticamente.
- A janela pode ser fechada pelo X ou pelo botão Continuar.

## Fluxo inicial BetWinStudios
- Ao abrir a home, a janela de cadastro é apresentada ao visitante.
- Se o visitante fechar o cadastro pelo X ou escolher conhecer a plataforma primeiro, a janela de informações regulatórias é aberta imediatamente.
- Após concluir o cadastro, a mesma janela de informações é aberta automaticamente.
- O fluxo usa componentes React reutilizáveis e responsivos, para que a mesma lógica visual possa ser reaproveitada posteriormente em um app baseado nesta interface.
- As informações de licença/autorização devem ser preenchidas somente com dados oficiais verificáveis.
