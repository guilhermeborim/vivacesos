# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar neste repositório.

## Contexto

Front-end do Vivacesos (gestão de clínicas, multi-tenant): React 19 + Vite + TypeScript. Base comprada do template Velzon (Bootstrap 5 + SCSS), já enxugada. A API é a do projeto `vivacesos-api` (NestJS), em `../../vivacesos-api`. Leia o `CLAUDE.md` dela antes de mexer em qualquer integração.

## Comandos

- Gerenciador: **yarn** (não usar npm).
- `yarn dev`: Vite em dev.
- `yarn build`: `tsc && vite build`.
- Checagem de tipos: `npx tsc --noEmit --ignoreDeprecations 5.0`. O `tsconfig.json` tem `ignoreDeprecations: "6.0"`, que o TypeScript 5.9 não aceita, por isso o `yarn build` falha em `tsc`. Para validar, use o comando acima e `npx vite build`.
- **Não criar testes.** Valide com tipos, build e uso real contra a API.
- `.env`: `VITE_API_URL` (API em `http://localhost:3334`).
- Deploy: `vercel.json` reescreve tudo para `index.html` (SPA).

## Stack

React 19, Vite 7, `react-router-dom` 6, `@tanstack/react-query` 5, `@tanstack/react-table` 8, `react-hook-form` + `zod` 4 (`@hookform/resolvers/zod`), `axios`, `reactstrap` (Bootstrap), `react-select`, `primereact` (só `InputMask`), `react-toastify`, `@reduxjs/toolkit` (só o slice de layout), `simplebar-react`.

Não use: i18n, moment, swiper, prismjs, jwt-decode (já removidos). Para datas use `Date`/`Intl`.

## Estrutura

```
src/
  core/        infraestrutura e UI compartilhada
    api/shared/  api_helper (axios), url_helper (todas as rotas), routes (refresh token), queries (sessão)
    layouts/     layout autenticado, Sidebar, menu (LayoutMenuData), NonAuthLayout
    ui/          componentes de UI (barrel `@/core/ui`)
  features/    um diretório por domínio (ver abaixo)
  shared/      constants, enums, forms (FieldConfig), hooks, schemas, types, utils
  slices/      Redux só para layout (tema, sidebar)
  Routes/      allRoutes.tsx, AuthProtected, PublicProtected
  assets/      scss, fonts (só woff/woff2 dos ícones), images
```

Alias `@/*` aponta para `src/*`. Prefira imports com `@/`.

### Estrutura de uma feature

```
features/<dominio>/
  schemas.ts            zod + tipos inferidos
  utils.ts              (opcional) funções do domínio
  api/
    routes.ts           chamadas axios (usa url_helper)
    queries.ts          hooks useQuery
    mutations.ts        hooks useMutation (toast + invalidate)
  hooks/                use-edit-<x>.ts etc. (só lógica, sem JSX)
  components/
    form/form.tsx       campos do formulário (useFormContext)
    list/{columns,list}.tsx
  pages/<X>ListPage.tsx
```

Features atuais: `auth`, `clinic`, `dashboard`, `errors`, `invite`, `patient`, `professional`, `users`, `appointment`, `finance`.

Regras:

- **Imports diretos para o arquivo** (`../api/queries`), sem `index.ts` barrel dentro das features. Barrels existem apenas em `core/ui` e em `auth`, `invite`, `dashboard`. Não importe do próprio `api/index` (gera ciclo).
- Rotas da API ficam em `core/api/shared/url_helper.ts`; use `.replace(":id", id)` nas rotas com parâmetro.
- Resposta da API tem formato próprio por entidade (ex.: `patients.name`, `professional.name`, `appointment.patient.name`). Os tipos ficam em `shared/types`.
- Mutations: `onError` mostra `toast.error(error.response?.data.message || "fallback")`; `onSuccess` invalida a query e mostra `toast.success`. Os hooks de tela capturam o erro com `try/catch` vazio (já tratado na mutation).

## Padrões reutilizáveis (use antes de criar algo novo)

- **`useFormModal<T>(schema, mutateAsync, onError?)`** (`shared/hooks`): modal de cadastro. Retorna `{ form, modalOpen, toggleModal, handleSubmit }`.
- **`useEditModal<T>(schema)`** (`shared/hooks`): modal de edição e de inativação. Retorna `form`, `editId`, `modalOpen`, `modalInactive`, `toggleModal`, `toggleModalInactive`, `openEdit`, `openInactive`, `submitUpdate(mutate)`, `submitInactive(mutate)`. O hook da feature (`use-edit-x`) combina com a query por id e a mutation de update.
- **`FormModal`** (`core/ui`): modal com `FormProvider`. Props: `mode` ("create" desabilita o botão se o form for inválido, "edit" usa botão `info`), `title`, `size`, `submitLabel`, `form`, `onSubmit`, `isPending`.
- **`ConfirmStatusModal`** (`core/ui`): confirmação de ativar/inativar (`entity`, `name`, `active`, `onConfirm`).
- **Controllers** (`core/ui`, todos ligados ao react-hook-form): `InputController` (aceita `mask`), `InputMaskController`, `SelectController`, `PriceController` (R$ formatado, valor em número), `CheckController` (`variant="switch" | "checkbox"`).
- **Tabela**: `TableList.Root`, `TableList.Column`, `TableList.Columns` (com `renderActions`), `DropdownComponent.Item` para as ações. Layout de página: `BaseLayout.Root/Header/Body` (o `Body` aceita **um** filho; use fragmento).
- **Schemas de update**: derive do create (`create.partial()`, `omit({...}).partial()`), sem duplicar regras.
- **Formatação**: `formatCurrency`, `formatDate`, `formatDateTime` em `shared/utils`.
- Datas de formulário: `datetime-local` não tem fuso. Converta para ISO ao enviar e de volta ao carregar (`features/appointment/utils.ts`: `toIso`, `toLocalInput`).

## Autenticação e permissões

- Tokens ficam em cookies httpOnly (`withCredentials`). O interceptor do axios renova pelo `POST /auth/refresh` ao receber `TOKEN_EXPIRED`/`TOKEN_INVALID`.
- `useAuth()` (`shared/hooks`) expõe `session` (`role`, `permissions`, `activeClinic`), `hasPermission(p)`, `login`, `register`, `signOut`.
- Papéis: `ADMIN`, `PROFISSIONAL`, `RECEPCIONISTA` (`shared/enums`). Permissões vêm da API: `FINANCE_VIEW`, `FINANCE_MANAGE` etc. Use `hasPermission(...)`, não compare papéis, exceto onde o comportamento for por papel (ex.: PROFISSIONAL não escolhe profissional no financeiro).
- Item de menu restrito: campo `permission` em `core/layouts/LayoutMenuData.tsx`. Página restrita: redirecione para `/error-403` (depois dos hooks).
- Tudo é escopado pela clínica ativa (vem do token). Nunca envie `clinicId` nas chamadas.

## Rotas

Definidas em `Routes/allRoutes.tsx`: `/dashboard`, `/clinics`, `/professionals`, `/users`, `/patients`, `/appointments`, `/receitas`, `/despesas`, `/relatorio`; públicas: `/login`, `/register`, `/invite/accept`, `/error-40x/500`. O menu fica em `core/layouts/LayoutMenuData.tsx`.

## Regras de negócio refletidas na UI

- **Consultas** (`appointment`): status AGENDADA, CONFIRMADA, CONCLUIDA, CANCELADA, FALTOU. Só AGENDADA/CONFIRMADA podem ser reagendadas; CONCLUIDA só permite alterar o valor; CANCELADA/FALTOU não têm ações. Início e fim: ao escolher o início no cadastro, o fim é preenchido com +1 hora (editável). `price` é obrigatório ao agendar. **O valor da consulta não significa que foi pago**: o pagamento é uma ação própria (`PATCH /clinic/appointments/:id/payment`, `FINANCE_MANAGE`), com switch "Pago" e forma de pagamento (PIX, CARTÃO, DINHEIRO). Não existe `paid` no agendamento/edição.
- **Financeiro** (`finance`): receitas (`/receitas`), despesas (`/despesas`) e relatório (`/relatorio`). Filtros por período (mês atual por padrão), data de referência (consulta/vencimento ou pagamento) e pagamento. Receitas e relatório filtram por profissional (oculto para PROFISSIONAL, que a API já restringe a si mesmo). Com um profissional filtrado, o bloco **Repasse** calcula o percentual sobre "Recebido" (padrão) ou "Total" e permite criar a despesa já preenchida. Despesas só para quem tem `FINANCE_VIEW` (ADMIN e RECEPCIONISTA). Cadastrar uma despesa **não** a marca como paga. Os filtros `de/até` enviam o dia com o offset local (`2026-01-31T23:59:59-03:00`), porque a API usa os 10 primeiros caracteres como data nas despesas.
- Modais de pagamento abrem com o estado real (`paid` desmarcado se ainda não foi pago).
- Convite (`invite`): `/invite/accept?token=...` é público.
- Onboarding (`dashboard`): passos CREATE_CLINIC, LINK_PROFESSIONAL, DONE/FINISHED via `/auth/session/next-step`.

## Estilo e SCSS

- Visual fixo: layout `horizontal`, tema `classic`, cor `purple`, modo claro (alternável pelo `LightDark`). O slice Redux (`slices/layouts`) guarda esse estado e aplica atributos `data-*` no `<html>`.
- `assets/scss/app.scss` importa só o necessário: tema `classic`, `structure/*`, `components/*`, plugins `custom-scrollbar` e `toastify`, páginas `authentication`, `dashboard` e `errors`. Ao usar uma classe de página/plugin removida, importe o partial correspondente de volta (os arquivos de tema/plugin/página não usados foram apagados; veja o histórico do git).
- Ícones: `ri-*` (remixicon), `mdi-*` e `bx-*`. Line Awesome foi removido.
- Seguir o estilo existente: sem ponto e vírgula, aspas duplas, 2 espaços, componentes funcionais, `interface` para props.

## Cuidados

- Ao mudar contrato com a API (campos novos, permissões), confira o `CLAUDE.md` e o código da `vivacesos-api` antes. Se a mudança exigir alteração na API, **avise o usuário antes**, listando o que precisa ser feito.
- Não apague arquivos sem o usuário autorizar; o ambiente bloqueia `rm` automático.
- Responda sempre em português, de forma direta (preferência do usuário).
