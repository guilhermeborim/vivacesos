# CLAUDE.md

> Contexto persistente para o Claude Code. Leia este arquivo antes de qualquer tarefa.

---

## 🗺️ Visão Geral do Projeto

**Stack:** React + TypeScript (frontend) · Fastify + TypeORM (backend) · PostgreSQL · Docker

Descreva aqui em 2-3 frases o que o projeto faz e para quem ele serve.

> Plataforma de gestão de saúde para clínicas médicas, o sistema consiste em gerenciar pacientes, consultas, prontuários eletronicos, atendimentos, exames, controle de permissão, profissionais que trabalham na clínica, usuários que tem acesso ao sistema da clínica. Existe a possibilidade de um usuário participar de várias clínicas.

---

## 📁 Estrutura de Diretórios

```
.
├── web/               # Aplicação React + TypeScript
│   ├── src/
│   │   ├── features/       # Features do projeto
│   │   ├── Routes/         # Rotas
│   │   ├── core/           # Gestão API, Layout e components
│   │   ├── shared/         # Hooks, enums, types, queries, mutations compartilhados entre features
│
├── api/                # API Fastify + TypeORM
│   ├── src/
│   │   ├── infra/          # Entidades TypeORM, migrations, configuração do banco e rotas da API
│   │   ├── modules/        # Features da API separado por applications(services, controllers, mappers, dtos, types) e database(repositories, interface)
│   │   ├── shared/         # Arquivos compartilhados entre features da API
│
├── docker-compose.yml      # Orquestra todos os serviços
└── .github/
    └── workflows/          # Pipelines CI/CD
```

---

## ⚙️ Comandos Essenciais

### Ambiente de Desenvolvimento

```bash
# Subir apenas o banco de dados
cd api && docker compose up -d

# Backend em modo watch (fora do Docker)
cd api && npm run dev

# Frontend em modo watch (fora do Docker)
cd web && npm run dev
```

## 🏗️ Padrões de Arquitetura

### Backend (Fastify + TypeORM)

- **Fastify** é usado como framework HTTP. Rotas são registradas via `fastify.register()` com prefixos por domínio (ex: `/users`, `/products`).
- **TypeORM** gerencia entidades e migrations. Nunca use `synchronize: true` em produção — sempre use migrations.
- Siga o padrão **Controller → Service → Repository**:
  - `Controller`: recebe a request, valida input via zod, chama o service, retorna response.
  - `Service`: contém regras de negócio. Não acessa o banco diretamente.
  - `Repository`: acessa o banco via TypeORM. Queries customizadas ficam aqui.
- Use `zod` (ou o validator configurado) para validar schemas de entrada nas rotas.

### Frontend (React + TypeScript)

- Componentes em `PascalCase`, arquivos `.tsx`.
- Hooks customizados em `camelCase` com prefixo `use` (ex: `useAuth`, `useFetch`).
- Lógica de chamadas de API fica na feature dentro de `api/`, separado por querie ou mutation.
- Uma feature nunca pode compartilhar algo de outra feature, caso precisar, mudar para `src/shared`
- Tipagem explícita: evite `any`. Sempre terá tipagem igual da api.
- Validação do zod da api e web serão identicas.

---

## 🎨 Padrões de Código

### TypeScript

- Siga o padrão que já existe para o typeScript.
- Tipos de request/response devem ser compartilhados ou espelhados entre front e back (considere uma pasta `shared/types/`).
- Nunca use `as any` — se necessário, documente o motivo com um comentário.

### Fastify

- Sempre tipar as rotas com generics: `fastify.get<{ Params: ..., Body: ..., Reply: ... }>`.
- Erros devem ser lançados com `fastify.httpErrors` ou com classes de erro customizadas.
- Use `preHandler` hooks para autenticação/autorização.

## 📦 Commits (Conventional Commits)

Formato: `<tipo>(escopo): descrição curta`

| Tipo       | Quando usar                          |
| ---------- | ------------------------------------ |
| `feat`     | Nova funcionalidade                  |
| `fix`      | Correção de bug                      |
| `refactor` | Refatoração sem mudar comportamento  |
| `chore`    | Tarefas de manutenção, deps, configs |
| `docs`     | Documentação                         |
| `test`     | Adição ou correção de testes         |
| `ci`       | Mudanças nos pipelines CI/CD         |
| `perf`     | Melhoria de performance              |

**Exemplos:**

```
feat(auth): add JWT refresh token endpoint
fix(users): correct pagination offset calculation
refactor(orders): extract order status logic to service
```

---

## 🔄 Workflows

### Criar uma Nova Feature

Antes de escrever código, siga este fluxo:

1. **Entender o escopo** — Qual entidade do banco é afetada? Quais rotas serão criadas/alteradas?
2. **Planejar** — Esboçar os endpoints e os componentes de UI.
3. **Implementar na ordem:**
   - Repository → Service → Controller/Route → Frontend Service → Componente/Página
4. **Commitar** — Um commit por camada lógica, seguindo Conventional Commits.

### Code Review (CI)

O pipeline no GitHub Actions valida:

- Lint (ESLint + Prettier)
- Build de TypeScript sem erros

## 🚨 Alertas e Convenções Importantes

- **Nunca use `synchronize: true`** no TypeORM em ambientes não-locais.
- **Nunca commite `.env`** ou qualquer arquivo com secrets. Use `.env.example` como referência.
- Ao modificar uma entidade TypeORM, **sempre gere uma migration** — nunca edite o schema diretamente.
- Datas são sempre salvas em UTC no banco.

## 📝 Notas para o Claude

- Antes de criar ou alterar arquivos, confirme se a mudança afeta migration/entidade.
- Ao criar um endpoint novo, sempre tipar com generics do Fastify.
- Ao criar um componente React, verificar se já existe algo semelhante em `components/`.
- Se uma tarefa envolver múltiplas camadas (banco + API + UI), proponha um plano antes de implementar.
- Use subagentes para revisões de segurança após implementações sensíveis (auth, pagamentos, dados pessoais).
