# Vivace SOS — Web

Front-end do **Vivace SOS**, um sistema de gestão para clínicas (multi-tenant): agenda, pacientes, prontuário eletrônico, financeiro com repasse a profissionais e integrações. Este repositório é o cliente web; a API está em [`vivacesos-api`](../vivacesos-api).

> Projeto autoral, construído de ponta a ponta (front, API, banco e modelagem de domínio) a partir de um problema real: o dia a dia de uma clínica.

## Destaques

- **Aplicação completa**, não um CRUD isolado: 16 módulos de domínio (agenda, prontuário, triagem, financeiro, dashboard, notificações, integrações…).
- **Permissões por papel** (ADMIN, PROFISSIONAL, RECEPCIONISTA): rotas, menus e ações se adaptam ao que a API devolve em `/auth/session`.
- **Prontuário com valor legal**: fichas imutáveis, cancelamento com justificativa, prescrições, exames, atestados e encaminhamentos, impressão de documentos.
- **Agenda em tempo de uso real**: grade do dia por profissional, horários livres, status da consulta (agendada → confirmada → chegou → concluída), triagem e atendimento por abas.
- **Financeiro**: receitas, despesas (inclusive recorrentes), repasse ao profissional e dashboard com indicadores e gráficos.
- **Página pública** para o paciente confirmar ou cancelar a consulta por link assinado, sem login.
- **Integração com Google Agenda** (OAuth) e aviso ao paciente por WhatsApp.
- **Segurança no cliente**: sessão por cookie `httpOnly`, renovação automática de token, rotas protegidas por papel.

## Stack

| Área | Tecnologias |
|---|---|
| Base | React 19, TypeScript, Vite 7 |
| Estado | Redux Toolkit, TanStack Query |
| Formulários e validação | React Hook Form, Zod |
| Tabelas e gráficos | TanStack Table, Recharts |
| UI | Bootstrap 5, Reactstrap, PrimeReact, Sass |
| HTTP e rotas | Axios, React Router 6 |
| Deploy | Vercel (SPA com rewrite para `index.html`) |

## Arquitetura

Organização por **feature**, cada pasta com seus componentes, hooks, schemas e chamadas à API:

```
src/
├── features/     appointment, auth, clinic, dashboard, finance, integrations,
│                 invite, medical-record, notifications, patient, professional,
│                 public, settings, triage, users, errors
├── core/         cliente HTTP, layouts e componentes de UI base
├── shared/       hooks, schemas zod, enums, tipos e utilitários
├── slices/       estado global (Redux)
└── Routes/       rotas públicas, protegidas e filtradas por papel
```

Decisões relevantes:

- **Schemas Zod** validam formulários e espelham o contrato da API.
- **Guards de rota** (`AuthProtected`, `PublicProtected`, `ForbidRoles`) centralizam acesso por sessão e papel.
- **Tratamento único de sessão expirada** no cliente HTTP, com renovação via refresh token.
- Tela inicial preferida configurável por usuário.

## Como rodar

Requisitos: Node 20+ e [yarn](https://yarnpkg.com/). A [API](../vivacesos-api) precisa estar rodando.

```bash
yarn install
cp .env .env.local   # ou crie o arquivo
```

Variável de ambiente:

```
VITE_API_URL=http://localhost:3334
```

```bash
yarn dev      # servidor de desenvolvimento
yarn build    # checagem de tipos + build de produção
```

## Projeto relacionado

- **API:** [`vivacesos-api`](../vivacesos-api) — NestJS, TypeORM, PostgreSQL.

## Autor

**Guilherme Machado Borim** — [borimdev@gmail.com](mailto:borimdev@gmail.com)
