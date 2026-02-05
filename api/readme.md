ROTAS E SUAS REGRAS DE NEGÓCIO

## USUÁRIO

- `POST /auth/register`: Registra um novo usuário. V
- `POST /auth/login`: Login do usuário. V
- `GET /auth/session`: Traz a sessão do usuário. V
- `POST /auth/refresh`: Realiza o refresh do token. V
- `POST /auth/logout`: Realiza o logout do usuário. V
- `POST /auth/session/select-clinic`: Registra a clínica selecionada para usar. V
  - Validar se o usuário está logado. V
- `POST /auth/session/next-step`: Avança de etapa no onboarding. V
  - Validar se o usuário está logado. V

## CLINICA

- `POST /clinics`: Registra uma nova clínica. V
  - Validar se o usuário está logado. V
- `GET /clinics`: Traz clínicas vinculadas ao usuário. V
  - Validar se o usuário está logado. V
- `GET /clinics/:clinicId`: Traz uma clínica expecífica. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado a ela. V
- `PUT /clinics/:clinicId`: Editar uma clínica expecífica. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado a ela. V
  - Validar se o usuário tem ROLE de ADMIN.

Por enquanto não será possível DELETAR uma clínica. Para isso será feito uma inativação da mesma apenas sendo ROLE de ADMIN.

## VINCULO CLÍNICA - USUÁRIO

- `POST /clinics/users`: Vincular um usuário a uma clínica. V
  - Validar se o usuário está logado. V
- `GET /clinics/users`: Traz os usuários de uma clínica. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado a ela. V

## PROFISSIONAL

- `POST /clinics/professionals`: Registrar um profissional em uma clínica. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado em uma clínica. V
  - Validar se o usuário tem ROLE de ADMIN.
- `POST /professionals/onboarding`: Registrar um profissional no onboarding. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado em uma clínica. V
- `GET /clinics/professionals`: Traz todos os profissionais da clínica. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado em uma clínica. V
  - Validar se o usuário tem ROLE de ADMIN.
- `PUT /professionals/:professionalId`: Editar um profissional. V
  - Validar se o usuário está logado. V
  - Validar se o usuário está vinculado em uma clínica. V
  - Validar se o usuário tem ROLE de ADMIN.
