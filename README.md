# API Cinema (Node + Express + TypeScript)

## Objetivo do Projeto
- Implementar uma API simples para o fluxo de um cinema:
  - Cadastro de filmes e salas
  - Criação de sessões e geração automática de assentos
  - Reserva temporária de assentos (bloqueio por tempo)
  - Emissão de ingressos validando conflitos e CPF
- Foco didático: código organizado, claro e fácil de entender para iniciantes.

## Tecnologias
- Node.js, Express 5, TypeScript
- REST Client (VS Code) para testar os endpoints

## Como Iniciar
- Instalar dependências: já configurado no projeto
- Desenvolvimento:
  - `npm run dev` (servidor em `http://localhost:3000`)
  - Verificar status: `GET /health`
- Produção:
  - `npm run build`
  - `npm start`
- Alterar porta:
  - PowerShell: `setx PORT 4000` (persistente) ou `set PORT=4000` (sessão atual)
  - Em uma execução: `$env:PORT=4000; npm run dev`

## Uso com REST Client
- Arquivo `requests.http` contém todo o fluxo em sequência lógica.
- Execute cada bloco em ordem:
  1. Health
  2. Listar/Cria Filme
  3. Listar/Cria Sala
  4. Criar Sessão (usa IDs de filme e sala)
  5. Listar Assentos da Sessão
  6. Criar Reserva Temporária
  7. Emitir Ingresso usando a reserva
  8. Listar Ingressos
  9. Ver Assentos após emissão
  10. Testar conflito (assento já reservado)
  11. Criar nova reserva temporária
  12. Testar emissão sem informar reserva (deve retornar 409)
  13. Emitir informando a reserva
  14. Cancelar reserva temporária
- O arquivo usa nomes de requisição com referências diretas à resposta:
  - Exemplo: `{{criarFilme.response.body.$.id}}` obtém o `id` retornado pela requisição nomeada `criarFilme`.
- Não é necessário scripts `> {% ... %}`: as variáveis são resolvidas automaticamente pelo REST Client.

## Endpoints Principais
- `GET /health` — status do servidor
- Filmes
  - `GET /filmes` — lista
  - `POST /filmes` — cria `{ titulo, duracaoMin, classificacao }`
- Salas
  - `GET /salas` — lista
  - `POST /salas` — cria `{ nome, capacidade }`
- Sessões
  - `GET /sessoes` — lista
  - `POST /sessoes` — cria `{ filmeId, salaId, data, horario }` e gera assentos
  - `GET /sessoes/:id/assentos` — assentos e reservas temporárias ativas
- Reservas Temporárias
  - `POST /reservas-temporarias` — cria `{ sessaoId, assentos: string[] }`
  - `DELETE /reservas-temporarias/:id` — cancela
- Ingressos
  - `GET /ingressos` — lista
  - `POST /ingressos` — emite `{ clienteNome, cpf, email, sessaoId, assentos, reservaTemporariaId? }`

## Regras de Negócio
- Criação de sessão gera assentos automaticamente conforme a capacidade da sala.
- Reserva temporária expira em 10 minutos; há um job de limpeza periódica.
- Emissão de ingresso:
  - Assento já reservado → `409 assento_indisponivel`
  - Assento com reserva temporária ativa sem informar `reservaTemporariaId` → `409 assento_temporariamente_reservado`
  - Ao emitir, os assentos são marcados como reservados definitivamente.
  - Se informar `reservaTemporariaId`, a reserva é cancelada automaticamente.
- CPF é validado antes da emissão.

## Padrão de Projeto: Builder
- Motivação:
  - Facilita criação de objetos complexos com encadeamento de métodos.
  - Evita construtores com muitos parâmetros e melhora a legibilidade.
  - Centraliza defaults e validações de construção.
- Aplicado às entidades: `Filme`, `Sala`, `Sessao`, `AssentoSessao`, `ReservaTemporaria`, `Ingresso`.
- Benefícios no projeto:
  - Criação declarativa (ex.: montar `Sessao` e seus assentos com clareza).
  - Consistência: todos os objetos recebem `id` via `randomUUID` padronizado.
  - Expansão futura simples: adicionar novos campos/métodos sem quebrar chamadas existentes.
- Exemplo (didático):
  ```ts
  const sessao = new SessaoBuilder()
    .filmeId(filme.id)
    .salaId(sala.id)
    .data("2025-12-10")
    .horario("20:00")
    .build();
  ```

## Arquitetura e Organização
- `src/domain` — tipos e builders das entidades
- `src/services` — regras de negócio (sessões, reservas temporárias, ingressos, filmes, salas)
- `src/routes` — rotas Express 5 para cada recurso
- `src/repositories/db.ts` — armazenamento em memória (didático)
- `src/utils` — utilitários (ex.: validação de CPF)

## Dicas para Iniciantes
- Leia os serviços para entender o fluxo real (reservas e emissão).
- Use o `requests.http` para testar o ciclo completo e observar respostas.
- Erros `409` indicam conflitos esperados do fluxo (assentos ocupados ou temporariamente bloqueados).
- Este projeto usa armazenamento em memória para simplificar; trocar para um banco é um passo natural depois.

## Próximos Passos (Sugestões)
- Persistência (SQLite/Postgres) e migrações.
- Autenticação e perfis de usuário.
- Políticas de cancelamento e reembolso.
- Regras de classificação indicativa por idade.
